//Difine and import module for dealing with tests
const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');

//we have to use async function because this is JS and add browser parameter
test('Catch unshowing message and Verify text message', async ({ browser }) => {
    //ignore browser's plugin/cookies and run browser in incognito mode
    const context = await browser.newContext();
    //Open new browser page
    const page = await context.newPage();
    //Navigate to needed page
    const mainPage = await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");

    await userName.type('rahulshettyacademy1');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
});

test('Verify presence of iphone X in product list', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");
    const cardTitle = page.locator(".card-body a");

    await userName.type('rahulshettyacademy');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    //Retrieve the first idex of array in different way
    //First option
    console.log(await cardTitle.first().textContent());
    //Second one
    console.log(await cardTitle.nth(0).textContent());
});

test('TC: Retrive all card titles from home page', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");
    const cardTitle = page.locator(".card-body a");
    const cardTitles = page.locator(".card-body a");

    await userName.type('rahulshettyacademy');
    await page.locator("[type='password']").type('learning');
    await signInBtn.click();
    /* We need to check the presence at least 1 element before retriving a whole list
There is no mechanism to get all data immidiately*/
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitles.allTextContents());
    await expect(cardTitles).toContainText(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry'])
});


test.only('TC: Verify UI controls', async ({ page }) => {
    const mainPage = await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signInBtn = page.locator("[name='signin']");
    const loginDropDown = page.locator('select.form-control');
    const radioBtnStudent = page.locator('.radiotextsty').last();
    
    await userName.type('rahulshettyacademy');
    await page.locator("[type='password']").type('learning');
    await radioBtnStudent.click();
    await expect(radioBtnStudent).toBeChecked();
    console.log(await radioBtnStudent.isChecked());
    await page.locator('#okayBtn').click();
    await loginDropDown.selectOption('Consultant');
    console.log(await loginDropDown.selectOption('Consultant'));
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(await page.locator('#terms').isChecked()).toBeFalsy();
    // TO DO
    // Investigate not working pause method
    //await page.pause();
    await signInBtn.click();


});