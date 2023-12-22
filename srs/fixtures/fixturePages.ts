import { test as base } from '../fixtures/fixtureBase'
import { expect } from 'playwright/test'
import { BasePage } from '../main/demoApp/basePage'

export const test = base.extend<{ navigationTextBoxPage: BasePage }>({
    navigationTextBoxPage: async ({ page }, use) => {
        const navigationTextBoxPage = new BasePage(page)
        await navigationTextBoxPage.goTo()
        await navigationTextBoxPage.selectElementsMenu()
        await navigationTextBoxPage.selectTextBoxMenu()
        await use(navigationTextBoxPage)
    }

    //Add other pages here
})

export { expect }
