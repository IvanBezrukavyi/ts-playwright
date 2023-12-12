import { Locator, Page } from 'playwright'
import { firefox } from 'playwright'

interface PageLocators {
    page: Page
    elementsMenu: Locator
    textBoxMenu: Locator
    inputs: {
        fullName: Locator
        email: Locator
        currentAddress: Locator
        permanentAddress: Locator
    }
    submitButton: Locator
    submittedData: {
        expFullName: Locator
        expEmail: Locator
        expCurrentAddress: Locator
        expPermanentAddress: Locator
    }
}

class BasePage {
    readonly page: Page
    readonly locators: PageLocators

    constructor({ page, locators }: { page: Page; locators: PageLocators }) {
        this.page = page
        this.locators = setupPageLocators(page)
    }

    async fillInputsByValues(
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string
    ): Promise<void> {
        await this.locators.inputs.fullName.fill(fullName)
        await this.locators.inputs.email.fill(email)
        await this.locators.inputs.currentAddress.fill(currentAddress)
        await this.locators.inputs.permanentAddress.fill(permanentAddress)
    }

    async getEnteredData(): Promise<{
        fullName: string
        email: string
        currentAddress: string
        permanentAddress: string
    }> {
        const fullName = await this.locators.inputs.fullName.textContent()
        const email = await this.locators.inputs.email.textContent()
        const currentAddress = await this.locators.inputs.currentAddress.textContent()
        const permanentAddress = await this.locators.inputs.permanentAddress.textContent()
        return { fullName, email, currentAddress, permanentAddress }
    }

    async getRemovedInputContent(): Promise<{
        removedFullName: string
        removedEmail: string
        removedCurrentAddress: string
        removedPermanentAddress: string
    }> {
        const removedFullName = (await this.locators.inputs.fullName.nth(0).textContent()) || ''
        const removedEmail = (await this.locators.inputs.email.nth(0).textContent()) || ''
        const removedCurrentAddress = (await this.locators.inputs.currentAddress.nth(0).textContent()) || ''
        const removedPermanentAddress = (await this.locators.inputs.permanentAddress.nth(0).textContent()) || ''
        return { removedFullName, removedEmail, removedCurrentAddress, removedPermanentAddress }
    }

    async getSubmittedData(): Promise<{
        expFullName: string
        expEmail: string
        expCurrentAddress: string
        expPermanentAddress: string
    }> {
        const expFullName = await this.locators.submittedData.expFullName.textContent()
        const expEmail = await this.locators.submittedData.expEmail.textContent()
        const expCurrentAddress = await this.locators.submittedData.expCurrentAddress.textContent()
        const expPermanentAddress = await this.locators.submittedData.expPermanentAddress.textContent()
        return { expFullName, expEmail, expCurrentAddress, expPermanentAddress }
    }
}

class PageActions extends BasePage {
    constructor({ page, locators }: { page: Page; locators: PageLocators }) {
        super({ page, locators })
    }

    async goTo(): Promise<void> {
        await this.page.goto('')
    }

    async selectElementsMenu(): Promise<void> {
        if (!this.locators.elementsMenu) {
            throw new Error('elementsMenu locator is not initialized')
        }
        await this.locators.elementsMenu.click()
    }

    async selectTextBoxMenu(): Promise<void> {
        await this.locators.textBoxMenu.click()
    }

    get inputs(): {
        fullName: Locator
        email: Locator
        currentAddress: Locator
        permanentAddress: Locator
    } {
        return this.locators.inputs
    }

    async submitTextBoxForm(): Promise<void> {
        await this.locators.submitButton.click()
    }

    async removeInputContent(inputLocators: Locator[]): Promise<void> {
        for (const inputLocator of inputLocators) {
            await inputLocator.nth(0).focus()
            const currentValue = await inputLocator.nth(0).inputValue()
            for (let i = 0; i < currentValue.length; ++i) {
                await this.page.keyboard.press('Backspace')
            }
        }
    }
}

class KeyboardShortcuts extends BasePage {
    constructor({ page, locators }: { page: Page; locators: PageLocators }) {
        super({ page, locators })
    }

    async fillInputsByShortcuts(
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string
    ): Promise<void> {
        await this.fillInputsByValues(fullName, email, currentAddress, permanentAddress)
        const inputLocators = [
            this.locators.inputs.fullName,
            this.locators.inputs.email,
            this.locators.inputs.currentAddress,
            this.locators.inputs.permanentAddress
        ]

        for (const locator of inputLocators) {
            await locator.focus()
            await this.page.keyboard.press('Tab')
        }
    }

    async submitTextBoxFormByEnter(): Promise<void> {
        await this.locators.submitButton.focus()
        await this.page.keyboard.press('Tab')
        await this.locators.submitButton.press('Enter')
    }

    async removeInputFullName(numOfSymbols: number): Promise<void> {
        await this.locators.inputs.fullName.focus()
        for (let i = 0; i < numOfSymbols; ++i) {
            await this.page.keyboard.press('Backspace')
        }
    }

    async removeContentViaShortcuts(inputLocator: Locator): Promise<void> {
        await inputLocator.nth(0).focus()
        await this.page.keyboard.press('Meta+A')
        await this.page.keyboard.press('Backspace')
    }

    get fullName(): Locator {
        return this.locators.inputs.fullName
    }

    get email(): Locator {
        return this.locators.inputs.email
    }

    get currentAddress(): Locator {
        return this.locators.inputs.currentAddress
    }

    get permanentAddress(): Locator {
        return this.locators.inputs.permanentAddress
    }
}

async function mainPageObjects() {
    const browser = await firefox.launch()
    const page = await browser.newPage()

    const pageLocators = await setupPageLocators(page)

    const pageActions = new PageActions({ page, locators: pageLocators })
    const keyboardShortcuts = new KeyboardShortcuts({ page, locators: pageLocators })

    //await browser.close()
}

export function setupPageLocators(page: Page): PageLocators {
    const pageLocators: PageLocators = {
        page: page,
        elementsMenu: page.locator("h5:has-text('Elements')"),
        textBoxMenu: page.locator("span:has-text('Text Box')"),
        inputs: {
            fullName: page.locator('#userName'),
            email: page.locator('#userEmail'),
            currentAddress: page.locator('#currentAddress'),
            permanentAddress: page.locator('#permanentAddress')
        },
        submitButton: page.locator('#submit'),
        submittedData: {
            expFullName: page.locator('#name'),
            expEmail: page.locator('#email'),
            expCurrentAddress: page.locator("p[id*='currentAddress']"),
            expPermanentAddress: page.locator("p[id*='permanentAddress']")
        }
    }

    return pageLocators
}

export { PageActions, KeyboardShortcuts, PageLocators, mainPageObjects }
