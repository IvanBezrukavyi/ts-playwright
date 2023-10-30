import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';


setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('nspprotest@gmail.com');
    await page.getByPlaceholder('enter your password').fill('Pl@ywright_test_m1');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect (page.getByPlaceholder('search')).toBeVisible();
    // End of authentication steps.
    await page.context().storageState({ path: authFile });
  });


/* async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('nspprotest@gmail.com');
    await page.getByPlaceholder('enter your password').fill('Pl@ywright_test_m1');
    await page.getByRole('button', { name: 'Login' }).click();
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(3000);

    //Save the state of a web page - means we are looged in
    await page.context().storageState({ path: "./LoginAuth.json" });
    //await browser.close();
}

export default globalSetup;
 */