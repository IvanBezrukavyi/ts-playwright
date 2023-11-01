import { expect, test } from "@playwright/test";

// eslint-disable-next-line playwright/expect-expect
test("TC: Verify order by unauthorized user. Security check", async ({ page }) => {
  //Add order
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("nspprotest@gmail.com");
  await page.locator("#userPassword").fill("Pl@ywright_test_m1");

  const login = page.locator("#login");
  await expect(login).toBeEnabled();
  console.log("ASSERT: login btn is enabled");
  await login.click();
  const list = page.locator(".card-body b");
  await page.locator(".card-body b").first().waitFor();
 
  await page.locator("button[routerlink*='myorders']").click();
  //Intercept request with fake order id
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});