import { Locator, Page } from 'playwright'
import { logger } from '../../logger/winston.config'

export class BasePage {
    protected readonly page: Page
    protected readonly elementsMenu: Locator
    protected readonly textBoxMenu: Locator
    protected readonly uploadAndDownloadMenu: Locator
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
        this.page = page
        this.elementsMenu = page.locator("h5:has-text('Elements')")
        this.textBoxMenu = page.locator("span:has-text('Text Box')")
        this.uploadAndDownloadMenu = page.locator("span:has-text('Upload and Download')")
        this.fullName = page.locator('#userName')
        this.email = page.locator('#userEmail')
        this.currentAddress = page.locator('#currentAddress')
        this.permanentAddress = page.locator('#permanentAddress')
        this.expFullName = page.locator('#name')
        this.expEmail = page.locator('#email')
        this.expCurrentAddress = page.locator("p[id*='currentAddress']")
        this.expPermanentAddress = page.locator("p[id*='permanentAddress']")
        this.submitButton = page.locator('#submit')
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
}
