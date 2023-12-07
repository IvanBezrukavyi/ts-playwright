import { test, expect } from '@playwright/test'

test('TC: Add product to cart via LOCATORS', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    //FIXME: investigate how to deal with input fields via getBy...
    //it doesn't work now
    //    await page.getByLabel("Name").fill("John Doe");
    //    await page.getByLabel("Email").fill("rahulshettyacademy@gmail.com");
    await page.getByPlaceholder('Password').fill('learning123')
    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.getByLabel('Employed').check()
    await page.getByLabel('Gender').selectOption('Female')
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeTruthy()
    await page.getByRole('link', { name: 'Shop' }).click()
    /* filtering the elements that have the text "Nokia Edge", and then locating a button element with the role
  "button" and the name "Add ". Finally, it clicks on that button. it can be used instead of FOR loop*/
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button', { name: 'Add ' }).click()
})
