import { test as base } from '../fixtures/fixtureBase'
import { expect } from 'playwright/test'
import { TextBoxMenuItems } from '../main/demoApp/textBoxMenuItems'
import { TextBoxPageWithMouseActions, TextBoxPageWithKeyboardShortcuts } from '../main/demoApp/textBoxPageNew'

type MyFixtures = {
    navigationTextBoxPage: TextBoxMenuItems
    textBoxPageWithMouseActions: TextBoxPageWithMouseActions
    textBoxPageWithKeyboardShortcuts: TextBoxPageWithKeyboardShortcuts
}
export const test = base.extend<MyFixtures>({
    navigationTextBoxPage: async ({ page }, use) => {
        const navigationTextBoxPage = new TextBoxMenuItems(page)
        await navigationTextBoxPage.goTo()
        await navigationTextBoxPage.selectElementsMenu()
        await navigationTextBoxPage.selectTextBoxMenu()
        await use(navigationTextBoxPage)
    },

    textBoxPageWithMouseActions: async ({ page }, use) => {
        await use(new TextBoxPageWithMouseActions(page))
    },

    textBoxPageWithKeyboardShortcuts: async ({ page }, use) => {
        await use(new TextBoxPageWithKeyboardShortcuts(page))
    }
})

export { expect }
