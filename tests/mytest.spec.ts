import {test} from '@playwright/test';

// eslint-disable-next-line playwright/expect-expect
test('TC: Verify success login', async ({page}) => {
    await page.goto("/");
    //await page.goto("/client/dashboard/dash");
    // Expect the JWToken cookie to be present.
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});