import {test, expect} from "@playwright/test";

test("@Web TC:Catch unshowing message and Verify text message", async ({ browser }) => {
  //ignore browser's plugin/cookies and run browser in incognito mode
  const context = await browser.newContext();
  //Open new browser page
  const page = await context.newPage();
  /*If you need to block some request and increase the speed of page downloading
  Let's block css on login page*/
  page.route('**/*.css', route => route.abort())
  //Navigate to needed page
 await page.goto(
    "https://rahulshettyacademy.com/loginpagePractise/"
  );
  const userName = page.locator("#username");
  const signInBtn = page.locator("[name='signin']");

  await userName.type("rahulshettyacademy1");
  await page.locator("[type='password']").type("learning");
  await signInBtn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
});

test("@Web TC:Verify presence of iphone X in product list", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signInBtn = page.locator("[name='signin']");
  const cardTitle = page.locator(".card-body a");
  //Catch all requests and show then in logs
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));

  await userName.type("rahulshettyacademy");
  await page.locator("[type='password']").type("learning");
  await signInBtn.click();
  //Retrieve the first idex of array in different way
  //First option
  console.log(await cardTitle.first().textContent());
  await expect(cardTitle.first()).toContainText("iphone X");
  //Second one
  console.log(await cardTitle.nth(0).textContent());
  await expect(cardTitle.first()).toContainText("iphone X");
});

test("@Web TC: Retrive all card titles from home page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  const userName = page.locator("#username");
  const signInBtn = page.locator("[name='signin']");
  const cardTitle = page.locator(".card-body a");
  const cardTitles = page.locator(".card-body a");

  await userName.type("rahulshettyacademy");
  await page.locator("[type='password']").type("learning");
  await signInBtn.click();
  /* We need to check the presence at least 1 element before retrieving the whole list
There is no mechanism to get all data immediately*/
  console.log(await cardTitle.first().textContent());
  console.log(await cardTitles.allTextContents());
  await expect(cardTitles).toContainText([
    "iphone X",
    "Samsung Note 8",
    "Nokia Edge",
    "Blackberry",
  ]);
});

test("@Web TC: Verify UI controls", async ({ page }) => {
  await page.goto(
    "https://rahulshettyacademy.com/loginpagePractise/"
  );
  const userName = page.locator("#username");
  const signInBtn = page.locator("[name='signin']");
  const loginDropDown = page.locator("select.form-control");
  const radioBtnStudent = page.locator(".radiotextsty").last();
  const docLink = page.locator("[href*='documents-request']");

  await userName.type("rahulshettyacademy");
  await page.locator("[type='password']").type("learning");
  await radioBtnStudent.click();
  await expect(radioBtnStudent).toBeChecked();
  console.log(await radioBtnStudent.isChecked());
  await page.locator("#okayBtn").click();
  await loginDropDown.selectOption("Consultant");
  console.log(await loginDropDown.selectOption("Consultant"));
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  await await expect(page.locator("#terms")).not.toBeChecked();
  //Verify blincking attribute in login page
  await expect(docLink).toHaveAttribute("class", "blinkingText");
  await expect(docLink).toContainText(
    "Free Access to InterviewQues/ResumeAssistance/Material"
  );

  // TO DO
  // Investigate not working pause method
  //await page.pause();
  await signInBtn.click();
});

test("@Web TC: Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://rahulshettyacademy.com/loginpagePractise/"
  );
  const pageURL = page.url();
  console.log("Page URL is:", pageURL);
  await expect(page).toHaveURL(/.*loginpagePractise/);

  const docLink = page.locator("[href*='documents-request']");
  // Declare new object for opening new browser page in a new tab
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    docLink.click(),
  ]);

  //Verify page title
  const pageTitle = await newPage.title();
  console.log("Page title is:", await pageTitle);
  await expect(newPage).toHaveTitle(/RS Academy/);
  //Extract email from string and enter it in the login page
  const textWarning = await newPage.locator(".red").textContent();
  console.log("Warning text is:", textWarning);
  console.log("The type of variable is", typeof textWarning);
  const arrayText = textWarning.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);
  console.log(await page.locator("#username").textContent());
});
