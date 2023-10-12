//Difine and import module for dealing with tests
const { test } = require('@playwright/test');

//we have to use async function because this is JS and add browser parameter
test('My first test. This is a TC name', async ({browser}) => {
    const page = await browser.newPage();
});