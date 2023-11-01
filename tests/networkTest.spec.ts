const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("./utils/APiUtils");

const loginPayLoad = {
  userEmail: "nspprotest@gmail.com",
  userPassword: "Pl@ywright_test_m1",
};

const orderPayload = {
  orders: [
    { country: "Ukraine", productOrderedId: "6262e9d9e26b7e1a10e89c04" },
  ],
};
const fakePlayloadOrders = {
  data: [],
  message: "No Orders",
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayload);
  console.log("Verify success login");
});

// eslint-disable-next-line playwright/expect-expect
test("TC: Verify absence of order via intercepted request", async ({
  page,
}) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //Intercepting response - API response->->{playwright fake response}->browser->render data on front end
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePlayloadOrders);

      route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("button[routerlink*=myorders]").click();
  //await page.waitForRequest("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log("LOG: No Orders in the cart");
  await expect(page.locator(".mt-4")).toHaveText(
    "You have No Orders to show at this time.\
  Please Visit Back Us"
  );
});
