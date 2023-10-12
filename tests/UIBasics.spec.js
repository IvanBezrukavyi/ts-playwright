//Difine and import module for dealing with tests
const { test } = require('@playwright/test');
const { expect} = require('@playwright/test');

//we have to use async function because this is JS and add browser parameter
test('Browser context test', async ({ browser }) => {
    //ignore browser's plugin/cookies and run browser in incognito mode
    const context = await browser.newContext();
    //Open new browser page
    const page = await context.newPage();
    //Navigate to needed page
    const mainPage = await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
});

test('Simpler than previous test', async ({ page }) => {
   await page.goto('https://demoqa.com/');
   // Get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle(/.*DEMOQA/);
});