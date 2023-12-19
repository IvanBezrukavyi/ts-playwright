import { test as base } from '../fixtures/fixtureBase'
import { expect } from 'playwright/test'
import { BasePage } from '../main/demoApp/basePage'

export const test = base.extend<{ textBoxPage: BasePage }>({
    textBoxPage: async ({ page }, use) => {
        const textBoxPage = new BasePage(page)
        await textBoxPage.goTo()
        await textBoxPage.selectElementsMenu()
        await textBoxPage.selectTextBoxMenu()
        await use(textBoxPage)
    }

    //Add other pages here
})

export { expect }
