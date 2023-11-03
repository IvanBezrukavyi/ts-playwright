import { expect, test as setup } from '@playwright/test';

const authFile = './srs/auth/defaultStorageState.json';


setup('authenticate default for client app', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByPlaceholder('email@example.com').fill('nspprotest@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Pl@ywright_test_m1');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect (page.getByRole('textbox', { name: 'search' })).toBeVisible();
    
    // End of authentication steps.
    await page.context().storageState({ path: authFile });
    //Close the browser
    //await page.close();
  });