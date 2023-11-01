const { default: test } = require("@playwright/test");


// eslint-disable-next-line playwright/expect-expect
test('TC: Verify success login', async ({page}) => {
    await page.goto("/dashboard/dash");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});