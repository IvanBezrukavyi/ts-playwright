
import { expect, test } from "@playwright/test";
import { LoginPage } from "../srs/main/clientApp/loginPage";
import { DashboardPage } from "../srs/main/clientApp/DashboardPage";

test("TC: Verify success login to client app", async ({ page }) => {
  const username = 'nspprotest@gmail.com';
  const userpass = 'Pl@ywright_test_m1';
  const loginPage = new LoginPage(page);
  loginPage.goTo();
  loginPage.validLogin(username, userpass);

  //await expect(loginPage.validLogin).toBeEnabled();
  console.log("ASSERT: login button is enabled");

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
  const username = 'nspprotest@gmail.com';
  const userpass = 'Pl@ywright_test_m1';
  //Login page
  const loginPage = new LoginPage(page);
  loginPage.goTo();
  loginPage.validLogin(username, userpass);
  //Client dashboard page data
  const cvv = "186";
  const cardName = "My test Visa Card";
  const productName = "iphone 13 pro";
  

  //Dashboard page
  const dashboardPage = new DashboardPage(page);
  dashboardPage.searchProductAddCart(productName);
  dashboardPage.validDashboardData(cvv, cardName);
  dashboardPage.navigateToCart();


  const products = page.locator(".card-body");
 
  const cardTitle = page.locator(".card-body b");
  const cardTitles = page.locator(".card-body b");
  const cartLink = page.locator("[routerlink*=cart]");
 
  

  //await page.locator(cartLink).first().waitFor();
  console.log("LOG: Checkout counter has been changed");
  await expect(cartLink).not.toBeNull();
  await cartLink.click();
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
  /* The code snippet is iterating over a list of options in a dropdown menu and checking if the text of
 each option matches the desired country name ("Ukraine"). If a match is found, it clicks on that
 option and then breaks out of the loop. This code is essentially selecting the country "Ukraine"
 from the dropdown menu. */
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
  await expect(page.locator("label[type='text']")).toHaveText(username);
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
