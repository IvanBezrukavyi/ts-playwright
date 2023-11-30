import { expect, test } from "@playwright/test";
import POManager from "../srs/main/clientApp/POManager";

test("TC: Verify success login to client app", async ({ page }) => {
  const userName = 'nspprotest@gmail.com';
  const userPass = 'Pl@ywright_test_m1';
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  loginPage.goTo();
  loginPage.validLogin(userName, userPass);
  const list = page.locator(".card-body b");
  // if you need to wait loading all request
  // 'networkidle' this method is unstable and it's not recommended
  //await page.waitForLoadState('networkidle');

  // The alternative approach
  await page.locator(".card-body b").first().waitFor();
  //await page.locator('.card-body b').first().textContent();
  console.log(await list.allTextContents());
  await expect(list).toHaveCount(3);
});

test("TC: E2E for ordering IPHONE 13 PRO cell phone", async ({ page }) => {
  //General data
  const userName = 'nspprotest@gmail.com';
  const userPass = 'Pl@ywright_test_m1';
  //Login page
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(userName, userPass);
  //Dashboard page
  const productName = "iphone 13 pro";
  const dashboardPage = pomManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
  // Cart page
  const cartPage = pomManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
  //Complete Order page
  const cvv = "186";
  const cardName = "My test Visa Card";
  const shortCountry = "Ukr";
  const fullCountryName = "Ukraine";
  const completeOrderPage = pomManager.getCompleteOrderPage();
  await completeOrderPage.enterPaymentInformation(cvv, cardName, shortCountry, fullCountryName);
  const orderId = await completeOrderPage.SubmitAndGetOrderId();
  console.log(orderId);
  //Review Order page
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = pomManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy(); 
});
