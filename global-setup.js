import { chromium } from "@playwright/test";


async function globalSetup() {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('nspprotest@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Pl@ywright_test_m1');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState();

    //Save the state of a web page - means we are looged in
    await page.context().storageState({ path: "./LoginAuth.json" });
    await browser.close();
}

export default globalSetup;

