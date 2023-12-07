import { test, expect } from '@playwright/test'

// eslint-disable-next-line playwright/expect-expect
test('@Web TC: Verify goBack and goForward methods', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://google.com')
    await page.goBack()
    await page.goForward()
})

test('@Web TC: Verify hidden elements', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
})

test('@Web TC: Verify popup validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page).toHaveTitle('Practice Page')
    //it will click button with positive scenario, e.g. OK
    page.on('dialog', (dialog) => dialog.accept())
    //it will click button with negative scenario, e.g. Cancel
    //page.on('dialog', dialog => dialog.dismiss());
    await page.locator('#confirmbtn').click()
})

test('@Web TC: Verify hover and select needed item', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page).toHaveTitle('Practice Page')
    await page.locator('#mousehover').hover()
    await page.locator("//a[normalize-space()='Reload']").click()
})

test('@Web TC: Verify work of screenshot and visual comparison', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
    await page.locator('#hide-textbox').click()
    /**
     * @see https://playwright.dev/docs/screenshots#element-screenshot
     */
    await page.screenshot({ path: './srs/resources/screenshots/screnshot.png' })
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
})

test('TC: Capture and compare screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    /*It will fail in first running because there is no actual screenshot.
    Therefore it should pass after the second run */
    expect.soft(await page.screenshot()).toMatchSnapshot('./srs/screenshots/landing.png')
})
