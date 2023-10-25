const { test, expect, request } = require("@playwright/test");

let token;

const loginPayload = {
  userEmail: "nspprotest@gmail.com",
  userPassword: "Pl@ywright_test_m1",
};

test.beforeAll( async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  expect(loginResponse.status()).toBe(200);
  const loginResponseToken = await loginResponse.json();
  token = loginResponseToken.token;

  console.log("LOG: Token: ", token);
  
});

test("E2E for ordering IPHONE 13 PRO cell phone", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  //Add extracted user token to web browser local storage
  page.addInitScript(value => 
    {
      window.localStorage.setItem('token', value);
    }, token);
  
  await page.goto("https://rahulshettyacademy.com/client");  
  //User Data
  const cvv = "186";
  const cardName = "My test Visa Card";
  const products = page.locator(".card-body");
  const productName = "iphone 13 pro";
  const email = "nspprotest@gmail.com";
  //Common locators
  const cardTitle = page.locator(".card-body b");
  const cardTitles = page.locator(".card-body b");
  const checkoutBtn = page.locator("[routerlink*=cart]");

  console.log(await cardTitle.first().textContent());
  console.log(
    "LOG: Product list titles is: ",
    await cardTitles.allTextContents()
  );
  console.log("LOG: Checkout counter equals to 0");
  await expect(checkoutBtn).toContainText("");
  await checkoutBtn.textContent();
  const count = await products.count();
  /* The code snippet is iterating over a list of products and checking if the product name matches the
    desired product name (in this case, "iphone 13 pro"). If a match is found, it clicks on the "Add
    To Cart" button for that product and then breaks out of the loop. This code is essentially adding
    the desired product to the shopping cart. */
  for (let i = 0; i < count; ++i) {
    // eslint-disable-next-line playwright/no-conditional-in-test
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // Add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  //await page.locator(checkoutBtn).first().waitFor();
  console.log("LOG: Checkout counter has been changed");
  await expect(checkoutBtn).not.toBeNull();
  await checkoutBtn.click();
  // Checkout page
  await page.locator("div li").first().waitFor();
  const presentedItem = await page
    .locator("div[class='cartSection'] h3")
    .isVisible();
  await expect(presentedItem).toBeTruthy();
  console.log("LOG: Item is presented in Checkout page: ", presentedItem);
  console.log("LOG: Click checkout button");
  await page.locator("button[type='button']").last().click();
  //Order page
  await page.locator("[placeholder*='Country']").type("ukr", { delay: 100 });
  //Declare the country drop-down list
  const countryDropDown = page.locator(".ta-results");
  /* The code snippet is selecting the country "Ukraine" from a dropdown list. */
  await countryDropDown.waitFor();
  const optionsCount = await countryDropDown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const text = await countryDropDown.locator("button").nth(i).textContent();
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (text.trim() == "Ukraine") {
      await countryDropDown.locator("button").nth(i).click();
      break;
    }
  }
  console.log("Enter personal information");
  await page.locator("(//input[@type='text'])[2]").fill(cvv);
  await page.locator("(//input[@type='text'])[3]").fill(cardName);
  console.log("Verify shipping information");
  const userEmail = page.locator("label[type='text']");
  await userEmail.waitFor("visible");
  await expect(userEmail).toHaveText(email);
  console.log("LOG: Click place order button");
  await page.locator(".action__submit").click();
  console.log("Review completed order");
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await expect(page.locator(".em-spacer-1 .ng-star-inserted")).not.toBeEmpty();
  await page.locator("button[routerlink*=myorders]").click();
  /*This ensures that the table is loaded
      and available for further actions or assertions. */
  await page.locator("table").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
