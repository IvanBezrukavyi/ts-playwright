const { test } = require('@playwright/test');


test('My first test. This is a TC name', async ({browser}) => {
    const page = await browser.newPage();
});