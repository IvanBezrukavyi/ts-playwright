
import { expect, test } from "@playwright/test";
import POManager from "../srs/main/clientApp/POManager";
import * as fs from 'fs';
const filePath = "Utils/placeOrderTestData.json";
const rawdata = fs.readFileSync(filePath, 'utf-8');
const dataset = JSON.parse(rawdata);

for (const data of dataset)
{
test.skip(`TC: Verify success login to client app with ${data.userName} and ${data.userPass}`, async ({ page }) => {
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  loginPage.goTo();
  loginPage.validLogin(data.userName, data.userPass);
  const list = page.locator(".card-body b");
  await page.locator(".card-body b").first().waitFor();
  console.log(await list.allTextContents());
  expect(await list.count()).toBeGreaterThan(0);
  
});
}

for (const data of dataset)
{
test.skip(`TC: E2E for ordering ${data.productName}`, async ({ page }) => {
  //Login page
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.userName, data.userPass);
  //Dashboard page
  const dashboardPage = pomManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();
  // Cart page
  const cartPage = pomManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();
  //Complete Order page
  const completeOrderPage = pomManager.getCompleteOrderPage();
  await completeOrderPage.enterPaymentInformation(
    data.cvv,
    data.cardName,
    data.shortCountry, 
    data.fullCountryName
    );
  const orderId = await completeOrderPage.SubmitAndGetOrderId();
  console.log(orderId);
  //Review Order page
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = pomManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy(); 
});
}
