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