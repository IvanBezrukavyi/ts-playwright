
import { expect, test } from "@playwright/test";
import POManager from "../srs/main/clientApp/POManager";
import * as fs from 'fs';
const filePath = "./utils/placeOrderTestData.json"; // Adjust the path as per your project structure
const rawdata = fs.readFileSync(filePath, 'utf-8');
const dataset = JSON.parse(rawdata);

//import * as dataset from "placeOrderTestData.json";

test("TC: Verify success login to client app", async ({ page }) => {
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  loginPage.goTo();
  loginPage.validLogin(dataset.userName, dataset.userPass);
  const list = page.locator(".card-body b");
  // if you need to wait loading all request
  // 'networkidle' this method is unstable and it's not recommended
  //await page.waitForLoadState('networkidle');

  // The alternative approachx
  await page.locator(".card-body b").first().waitFor();
  //await page.locator('.card-body b').first().textContent();
  console.log(await list.allTextContents());
  await expect(list).toHaveCount(3);
});

test("TC: E2E for ordering IPHONE 13 PRO cell phone", async ({ page }) => {
  //Login page
  const pomManager = new POManager(page);
  const loginPage = pomManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(dataset.userName, dataset.userPass);
  //Dashboard page
  const dashboardPage = pomManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(dataset.productName);
  await dashboardPage.navigateToCart();
  // Cart page
  const cartPage = pomManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataset.productName);
  await cartPage.Checkout();
  //Complete Order page
  const completeOrderPage = pomManager.getCompleteOrderPage();
  await completeOrderPage.enterPaymentInformation(
    dataset.cvv,
    dataset.cardName,
    dataset.shortCountry, 
    dataset.fullCountryName
    );
  const orderId = await completeOrderPage.SubmitAndGetOrderId();
  console.log(orderId);
  //Review Order page
  await dashboardPage.navigateToOrders();
  const orderHistoryPage = pomManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy(); 
});
