import { test, expect } from '@playwright/test';

test("@Web TC: Verify UI IFrame", async({page}) => {
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   await expect(page).toHaveTitle("Practice Page");
   const framesPage = page.frameLocator("#courses-iframe");
   //If you css selector could find a few matches and only one could be visible and you should use it, 
   // :visible parameter should be added to locator
   await framesPage.locator("li a[href*='lifetime-acces']:visible").click();
   const textCheck = await framesPage.locator(".text h2").textContent();
   await expect(textCheck.split(" ")[1]).toEqual("13,522");
})