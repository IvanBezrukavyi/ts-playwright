import { Locator, Page } from 'playwright'
import { BasePage } from './basePage'

export class TextBoxMouseActions extends BasePage {
    readonly fullName: Locator
    readonly email: Locator
    readonly currentAddress: Locator
    readonly permanentAddress: Locator
    protected submitButton: Locator

    constructor(page: Page) {
        super(page)

        this.fullName = this.page.locator('#userName')
        this.email = this.page.locator('#userEmail')
        this.currentAddress = this.page.locator('#currentAddress')
        this.permanentAddress = this.page.locator('#permanentAddress')
        this.submitButton = page.locator('#submit')
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

export class TextBoxKeyboardShortcuts extends BasePage {
    readonly fullName: Locator
    readonly email: Locator
    readonly currentAddress: Locator
    readonly permanentAddress: Locator
    protected readonly submitButton: Locator

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(page: Page) {
        super(page)

        this.fullName = this.page.locator('#userName')
        this.email = this.page.locator('#userEmail')
        this.currentAddress = this.page.locator('#currentAddress')
        this.permanentAddress = this.page.locator('#permanentAddress')
        this.submitButton = page.locator('#submit')
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

    async submitTextBoxFormByEnter(): Promise<void> {
        await this.submitButton.focus()
        await this.page.keyboard.press('Tab')
        await this.submitButton.press('Enter')
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
