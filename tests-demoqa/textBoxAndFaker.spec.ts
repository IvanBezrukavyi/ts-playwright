import {test, expect} from "playwright/test";

test('TC: Fill out input by fake data', async({page}) => {
    await page.goto('/');
    await page.click("//h5[normalize-space()='Elements']");
    
})