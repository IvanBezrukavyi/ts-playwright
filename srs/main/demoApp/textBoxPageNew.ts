import { Locator } from 'playwright'
import { BasePage } from './basePage'

export class TextBoxMouseActions extends BasePage {
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
