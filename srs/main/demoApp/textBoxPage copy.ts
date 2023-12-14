import { Locator, Page } from 'playwright'
import { firefox } from 'playwright'
import { logger } from '../../logger/winston.config'

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

export function setupPageLocators(page: Page): PageLocators {
    return {
        page,
        elementsMenu: page.locator("h5:has-text('Elements')"),
        textBoxMenu: page.locator("span:has-text('Text Box')"),
        inputs: {
            fullName: page.locator('#userName').first(),
            email: page.locator('#userEmail').first(),
            currentAddress: page.locator('#currentAddress').first(),
            permanentAddress: page.locator('#permanentAddress').first()
        },
        submitButton: page.locator('#submit'),
        submittedData: {
            expFullName: page.locator('#name'),
            expEmail: page.locator('#email'),
            expCurrentAddress: page.locator("p[id*='currentAddress']"),
            expPermanentAddress: page.locator("p[id*='permanentAddress']")
        }
    }
}

class BasePage {
    protected readonly page: Page
    protected readonly locators: PageLocators
    protected readonly inputLocators: {
        fullName: Locator
        email: Locator
        currentAddress: Locator
        permanentAddress: Locator
    }

    constructor({ page, locators }: { page: Page; locators: PageLocators }) {
        this.page = page
        this.locators = locators
        this.inputLocators = {
            fullName: this.locators.inputs.fullName,
            email: this.locators.inputs.email,
            currentAddress: this.locators.inputs.currentAddress,
            permanentAddress: this.locators.inputs.permanentAddress
        }
    }

    async fillInputsByValues(
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string
    ): Promise<unknown> {
        await this.locators.inputs.fullName.fill(fullName)
        await this.locators.inputs.email.fill(email)
        await this.locators.inputs.currentAddress.fill(currentAddress)
        await this.locators.inputs.permanentAddress.fill(permanentAddress)
    }

    async getEnteredData(): Promise<{
        enteredFullName: string
        enteredEmail: string
        enteredCurrentAddress: string
        enteredPermanentAddress: string
    }> {
        await this.locators.inputs.fullName.waitFor({ state: 'attached' })
        const enteredFullName = (await this.locators.inputs.fullName.textContent({ timeout: 2000 })) ?? ''

        logger.info(`Retrieved user's full name: ${enteredFullName}`)

        const enteredEmail = (await this.locators.inputs.email.textContent({ timeout: 2000 })) ?? ''
        logger.info(`Retrieved user's email: ${enteredEmail}`)

        const enteredCurrentAddress = (await this.locators.inputs.currentAddress.textContent({ timeout: 2000 })) ?? ''
        logger.info(`Retrieved user's current address: ${enteredCurrentAddress}`)

        const enteredPermanentAddress =
            (await this.locators.inputs.permanentAddress.textContent({ timeout: 2000 })) ?? ''
        logger.info(`Retrieved user's permanent address: ${enteredPermanentAddress}`)

        return { enteredFullName, enteredEmail, enteredCurrentAddress, enteredPermanentAddress }
    }

    async getSubmittedData(): Promise<{
        expFullName: string
        expEmail: string
        expCurrentAddress: string
        expPermanentAddress: string
    }> {
        const expFullName = (await this.locators.submittedData.expFullName.textContent()) ?? ''
        const expEmail = (await this.locators.submittedData.expEmail.textContent()) ?? ''
        const expCurrentAddress = (await this.locators.submittedData.expCurrentAddress.textContent()) ?? ''
        const expPermanentAddress = (await this.locators.submittedData.expPermanentAddress.textContent()) ?? ''
        return { expFullName, expEmail, expCurrentAddress, expPermanentAddress }
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
        if (!this.locators.elementsMenu) {
            throw new Error('textBoxMenu locator is not initialized')
        }
        await this.locators.textBoxMenu.click()
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

    async removeContentViaShortcuts(inputLocator: Locator): Promise<void> {
        await inputLocator.nth(0).focus()
        await this.page.keyboard.press('Meta+A')
        await this.page.keyboard.press('Backspace')
    }

    async clearInputs(inputLocators: Locator[]): Promise<void> {
        for (const inputLocator of inputLocators) {
            await this.removeContentViaShortcuts(inputLocator)
        }
    }
}

async function mainPageObjects() {
    const browser = await firefox.launch()
    const page = await browser.newPage()

    const pageLocators = await setupPageLocators(page)

    const pageActions = new PageActions({ page, locators: pageLocators })
    const keyboardShortcuts = new KeyboardShortcuts({ page, locators: pageLocators })
}

export { PageActions, KeyboardShortcuts, PageLocators, mainPageObjects }
