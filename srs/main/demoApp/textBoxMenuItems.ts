import { Locator, Page } from 'playwright'

export class TextBoxMenuItems {
    protected readonly page: Page
    protected readonly elementsMenu: Locator
    protected readonly textBoxMenu: Locator
    protected readonly uploadAndDownloadMenu: Locator

    constructor(page: Page) {
        this.page = page
        this.elementsMenu = page.locator("h5:has-text('Elements')")
        this.textBoxMenu = page.locator("span:has-text('Text Box')")
        this.uploadAndDownloadMenu = page.locator("span:has-text('Upload and Download')")
    }

    async goTo(): Promise<void> {
        await this.page.goto('')
    }

    async selectElementsMenu(): Promise<void> {
        if (!this.elementsMenu) {
            throw new Error('elementsMenu locator is not initialized')
        }
        await this.elementsMenu.click()
    }

    async selectTextBoxMenu(): Promise<void> {
        if (!this.elementsMenu) {
            throw new Error('textBoxMenu locator is not initialized')
        }
        await this.textBoxMenu.click()
    }

    async selectUploadAndDownloadMenu(): Promise<void> {
        if (!this.uploadAndDownloadMenu) {
            throw new Error('UploadAndDownloadMenu locator is not initialized')
        }
        await this.uploadAndDownloadMenu.click()
    }
}
