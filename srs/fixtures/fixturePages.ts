import { test as base } from '../fixtures/fixtureBase'
import { expect } from 'playwright/test'
import TextBoxPage from '../main/demoApp/textBoxPage'

export const textBoxFixture = base.extend<{ textBoxPage: TextBoxPage }>({
    textBoxPage: async ({ page }, use) => {
        const textBoxPage = new TextBoxPage(page)
        await textBoxPage.goTo()
        await textBoxPage.selectElementsMenu()
        await textBoxPage.selectTextBoxMenu()
        await use(textBoxPage)
    }

    //Add other pages here
})

export { expect }
