//Difine and import module for dealing with tests
const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test('TC: Verify success login to client app', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('nspprotest@gmail.com');
    await page.locator('#userPassword').fill('Pl@ywright_test_m1');

    const login = page.locator('#login');
    await expect(login).toBeEnabled();
    console.log('ASSERT: login btn is enabled');
    await login.click();

    const list = page.locator('.card-body b');
    // if you need to wait loading all request
    // 'networkidle' this method is unsatable and it's not recommended
    //await page.waitForLoadState('networkidle');

    // The alternative approach
    await page.locator('.card-body b').first().waitFor();
    //await page.locator('.card-body b').first().textContent();
    console.log(await list.allTextContents());
    await expect(list).toHaveCount(3);

});

test('Order IPHONE 13 PRO cell phone', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    //Login page
    const userEmail = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const login = page.locator('#login');
    //Client dashboard page
    const products = page.locator('.card-body');
    const productName = 'iphone 13 pro';
    const cardTitle = page.locator(".card-body b");
    const cardTitles = page.locator(".card-body b");
    const checkoutBtn = page.locator("[routerlink*=cart]");

    await userEmail.fill('nspprotest@gmail.com');
    await userPassword.fill('Pl@ywright_test_m1');

    await expect(login).toBeEnabled();
    console.log('ASSERT: login btn is enabled');
    await login.click();

    console.log(await cardTitle.first().textContent());
    console.log('LOG: Product list titles is: ', await cardTitles.allTextContents());
    console.log('LOG: Checkout counter equals to 0');
    await expect(checkoutBtn).toContainText("");
    await checkoutBtn.textContent();
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (await products.nth(i).locator("b").textContent() === productName) {
            // Add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //await page.locator(checkoutBtn).first().waitFor();
    console.log("LOG: Checkout counter has been changed");
    await expect(checkoutBtn).not.toBeNull();
    await checkoutBtn.click();
    // Checkout page
    await page.locator('div li').first().waitFor();
    const presentedItem = await page.locator("div[class='cartSection'] h3").isVisible();
    await expect(presentedItem).toBeTruthy();
    console.log('LOG: Item is presented in Checkout page: ', presentedItem);
    console.log('LOG: Click checkout button');
    await page.locator("button[type='button']").last().click();
    //Order page
    await page.locator("[placeholder*='Country']").type("ukr", {delay:100});
    //Declaire the country drop-down list
    const countryDropDown = page.locator(".ta-results");
    await countryDropDown.waitFor();
    const optionsCount = await countryDropDown.locator("button").count();
    for (let i = 0; i < optionsCount; i++)
    {
        const text = await countryDropDown.locator("button").nth(i).textContent();
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (text.trim() == "Ukraine")
        {
            await countryDropDown.locator("button").nth(i).click();
            break;
        }
        
    }

});