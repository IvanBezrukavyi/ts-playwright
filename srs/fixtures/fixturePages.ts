import { test as base } from './fixtureBase'
import TextBoxPage from '../main/demoApp/textBoxPage'

export const test = base.extend<{ textBoxPage: TextBoxPage }>({
    textBoxPage: async ({ page }, use) => {
        const textBoxPage = new TextBoxPage(page)
        await textBoxPage.goTo()
        await textBoxPage.selectElementsMenu()
        await textBoxPage.selectTextBoxMenu()
        use(textBoxPage)
    }

    //Add other pages here
})
