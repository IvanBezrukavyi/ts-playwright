const { test, expect } = require("@playwright/test");

// eslint-disable-next-line playwright/expect-expect
test("TC: Verify goBack and goForward methods", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");
  await page.goBack();
  await page.goForward();
});

test("TC: Verify hidden elements", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test("TC: Verify popup validation", async ({
    page,
  }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle('Practice Page');
    //it will click button with positive scenario, e.g. OK
    page.on('dialog', dialog => dialog.accept());
    //it will click button with negative scenario, e.g. Cancel
    //page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

  });

  test("TC: Verify hover and select needed item", async ({
    page,
  }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle('Practice Page');
    await page.locator("#mousehover").hover();
    await page.locator("//a[normalize-space()='Reload']").click();
  });


  test("TC: Verify work of screenshot and visual comparison", async ( {
    page,
  }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    /**
     * @see https://playwright.dev/docs/screenshots#element-screenshot
     */
    await page.screenshot({path: './srs/screenshots/screnshot.png' });
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  });
