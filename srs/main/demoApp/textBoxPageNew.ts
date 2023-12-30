import { Locator, Page } from 'playwright'
import { TextBoxMenuItems } from './textBoxMenuItems'
import { logger } from '../../logger/winston.config'

export class TextBoxPageWithMouseActions extends TextBoxMenuItems {
    protected readonly fullName: Locator
    protected readonly email: Locator
    protected readonly currentAddress: Locator
    protected readonly permanentAddress: Locator
    protected readonly expFullName: Locator
    protected readonly expEmail: Locator
    protected readonly expCurrentAddress: Locator
    protected readonly expPermanentAddress: Locator
    protected readonly submitButton: Locator

    constructor(page: Page) {
        super(page)

        this.fullName = this.page.locator('#userName')
        this.email = this.page.locator('#userEmail')
        this.currentAddress = this.page.locator('#currentAddress')
        this.permanentAddress = this.page.locator('#permanentAddress')
        this.expFullName = this.page.locator('#name')
        this.expEmail = this.page.locator('#email')
        this.expCurrentAddress = this.page.locator("p[id*='currentAddress']")
        this.expPermanentAddress = this.page.locator("p[id*='permanentAddress']")
        this.submitButton = this.page.locator('#submit')
    }

    async fillInputsByValues(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        await this.fullName.fill(fullName)
        await this.email.fill(email)
        await this.currentAddress.fill(currentAddress)
        await this.permanentAddress.fill(permanentAddress)
    }

    async getEnteredData(): Promise<{
        fullName: string
        email: string
        currentAddress: string
        permanentAddress: string
    }> {
        const fullName = (await this.fullName.inputValue()) || ''

        logger.info(`Retrieved user's full name: ${fullName}`)

        const email = (await this.email.inputValue()) || ''
        logger.info(`Retrieved user's email: ${email}`)

        const currentAddress = (await this.currentAddress.inputValue()) || ''
        logger.info(`Retrieved user's current address: ${currentAddress}`)

        const permanentAddress = (await this.permanentAddress.inputValue()) || ''
        logger.info(`Retrieved user's permanent address: ${permanentAddress}`)

        return { fullName, email, currentAddress, permanentAddress }
    }

    async getSubmittedData(): Promise<{
        expFullName: string
        expEmail: string
        expCurrentAddress: string
        expPermanentAddress: string
    }> {
        const expFullName = (await this.expFullName.textContent()) || ''
        const expEmail = (await this.expEmail.textContent()) || ''
        const expCurrentAddress = (await this.expCurrentAddress.textContent()) || ''
        const expPermanentAddress = (await this.expPermanentAddress.textContent()) || ''

        return { expFullName, expEmail, expCurrentAddress, expPermanentAddress }
    }

    async getRemovedInputContent(): Promise<{
        removedFullName: string
        removedEmail: string
        removedCurrentAddress: string
        removedPermanentAddress: string
    }> {
        const removedFullName = (await this.fullName.nth(0).textContent()) || ''
        const removedEmail = (await this.email.nth(0).textContent()) || ''
        const removedCurrentAddress = (await this.currentAddress.nth(0).textContent()) || ''
        const removedPermanentAddress = (await this.permanentAddress.nth(0).textContent()) || ''
        return { removedFullName, removedEmail, removedCurrentAddress, removedPermanentAddress }
    }

    async submitTextBoxForm(): Promise<void> {
        await this.submitButton.click()
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

export class TextBoxPageWithKeyboardShortcuts extends TextBoxMenuItems {
    protected readonly fullName: Locator
    protected readonly email: Locator
    protected readonly currentAddress: Locator
    protected readonly permanentAddress: Locator
    protected readonly expFullName: Locator
    protected readonly expEmail: Locator
    protected readonly expCurrentAddress: Locator
    protected readonly expPermanentAddress: Locator
    protected readonly submitButton: Locator

    constructor(page: Page) {
        super(page)

        this.fullName = this.page.locator('#userName')
        this.email = this.page.locator('#userEmail')
        this.currentAddress = this.page.locator('#currentAddress')
        this.permanentAddress = this.page.locator('#permanentAddress')
        this.expFullName = this.page.locator('#name')
        this.expEmail = this.page.locator('#email')
        this.expCurrentAddress = this.page.locator("p[id*='currentAddress']")
        this.expPermanentAddress = this.page.locator("p[id*='permanentAddress']")
        this.submitButton = this.page.locator('#submit')
    }

    async fillInputsByValues(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        await this.fullName.fill(fullName)
        await this.email.fill(email)
        await this.currentAddress.fill(currentAddress)
        await this.permanentAddress.fill(permanentAddress)
    }

    async fillInputsByShortcuts(
        fullName: string,
        email: string,
        currentAddress: string,
        permanentAddress: string
    ): Promise<void> {
        await this.fillInputsByValues(fullName, email, currentAddress, permanentAddress)
        const inputLocators = [this.fullName, this.email, this.currentAddress, this.permanentAddress]

        for (const locator of inputLocators) {
            await locator.focus()
            await this.page.keyboard.press('Tab')
        }
    }

    async getEnteredData(): Promise<{
        fullName: string
        email: string
        currentAddress: string
        permanentAddress: string
    }> {
        const fullName = (await this.fullName.inputValue()) || ''

        logger.info(`Retrieved user's full name: ${fullName}`)

        const email = (await this.email.inputValue()) || ''
        logger.info(`Retrieved user's email: ${email}`)

        const currentAddress = (await this.currentAddress.inputValue()) || ''
        logger.info(`Retrieved user's current address: ${currentAddress}`)

        const permanentAddress = (await this.permanentAddress.inputValue()) || ''
        logger.info(`Retrieved user's permanent address: ${permanentAddress}`)

        return { fullName, email, currentAddress, permanentAddress }
    }

    async submitTextBoxFormByEnter(): Promise<void> {
        await this.submitButton.focus()
        await this.page.keyboard.press('Tab')
        await this.submitButton.press('Enter')
    }

    async getSubmittedData(): Promise<{
        expFullName: string
        expEmail: string
        expCurrentAddress: string
        expPermanentAddress: string
    }> {
        const expFullName = (await this.expFullName.textContent()) || ''
        const expEmail = (await this.expEmail.textContent()) || ''
        const expCurrentAddress = (await this.expCurrentAddress.textContent()) || ''
        const expPermanentAddress = (await this.expPermanentAddress.textContent()) || ''

        return { expFullName, expEmail, expCurrentAddress, expPermanentAddress }
    }

    async removeContentViaShortcuts(inputLocator: Locator): Promise<void> {
        await inputLocator.nth(0).focus()
        await this.page.keyboard.press('Meta+A')
        await this.page.keyboard.press('Backspace')
    }

    async getRemovedInputContent(): Promise<{
        removedFullName: string
        removedEmail: string
        removedCurrentAddress: string
        removedPermanentAddress: string
    }> {
        const removedFullName = (await this.fullName.nth(0).textContent()) || ''
        const removedEmail = (await this.email.nth(0).textContent()) || ''
        const removedCurrentAddress = (await this.currentAddress.nth(0).textContent()) || ''
        const removedPermanentAddress = (await this.permanentAddress.nth(0).textContent()) || ''
        return { removedFullName, removedEmail, removedCurrentAddress, removedPermanentAddress }
    }

    async clearInputs(inputLocators: Locator[]): Promise<void> {
        for (const inputLocator of inputLocators) {
            await this.removeContentViaShortcuts(inputLocator)
        }
    }
}
