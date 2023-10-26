const { test, expect} = require("@playwright/test");
const {APiUtils} = require("./utils/APiUtils");

const loginPayLoad = {
  userEmail: "nspprotest@gmail.com",
  userPassword: "Pl@ywright_test_m1",
}

const orderPayload = {
  orders: [
    {country: "Ukraine",
    productOrderedId: "6262e9d9e26b7e1a10e89c04"
}]
};

let response;

test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext, loginPayLoad);
   response =  await apiUtils.createOrder(orderPayload);

     
  console.log("Verify success login");
  //expect(token.ok()).toBeTruthy();
  //expect(token.status()).toBe(200);
  //console.log("Verify success ordering of stuff");
  //expect(createdOrderResponse.ok()).toBeTruthy();
  //expect(createdOrderResponse.status()).toBe(201);

})

test.fixme("E2E for ordering IPHONE 13 PRO cell phone with mix UI and API", async ({ page }) => {

  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, response.token);
  
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*=myorders]").click();  
  /*This ensures that the table is loaded
      and available for further actions or assertions. */
  await page.locator("table").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  console.log("Order id equals to bought stuff");
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
