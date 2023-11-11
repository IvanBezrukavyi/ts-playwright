
import POManager from "../srs/main/clientApp/POManager";
import { dataOrderSet, expect } from "../Fixtures/TestBase";

test("TC: Verify success login to client app", async ({ page, dataOrderSet }) => {
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  loginPage.goTo();
  loginPage.validLogin(dataOrderSet.userName, dataOrderSet.userPass);
  const list = page.locator(".card-body b");
  await page.locator(".card-body b").first().waitFor();
  console.log(await list.allTextContents());
  await expect(list).toHaveCount(3);
});

test("TC: E2E for ordering IPHONE 13 PRO cell phone", async ({ page, testDataForOrder }) => {
  //Login page
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.userPass);
  //Dashboard page
  const productName = "iphone 13 pro";
  const dashboardPage = pomManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  // Cart page
  const cartPage = pomManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
  //Complete Order page
  const completeOrderPage = pomManager.getCompleteOrderPage();
  await completeOrderPage.enterPaymentInformation(
    testDataForOrder.cvv,
    testDataForOrder.cardName,
    testDataForOrder.shortCountry,
    testDataForOrder.fullCountryName);
  const orderId = await completeOrderPage.SubmitAndGetOrderId();
  console.log(orderId);
  //Review Order page
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = pomManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy(); 
});
