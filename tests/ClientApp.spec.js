//Difine and import module for dealing with tests
const { test, expect } = require('@playwright/test');

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

test.only('Add IPHONE 13 PRO cell phone to Cart page', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    //Login page
    const userEmail = page.locator('#userEmail');
    const userPassword = page.locator('#userPassword');
    const login = page.locator('#login');
    //Client dashboard page
    const products = page.locator('.card-body');
    const productName = 'IPHONE 13 PRO';
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
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            // Add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    console.log("LOG: Checkout counter equals to 0");
    await checkoutBtn.textContent();
    await expect(checkoutBtn).toContainText("");
    console.log("LOG: Checkout counter has been changed");
    await expect(checkoutBtn).not.toBeNull();
    await checkoutBtn.click();
    // Checkout page
    await page.locator('div li').first().waitFor();
    const presentedItem = await page.locator("h3:has=text(productName)").isVisible();
    expect(presentedItem).toBeTruthy();

});