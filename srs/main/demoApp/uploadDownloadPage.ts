import { Locator, Page } from 'playwright'
import { BasePage } from './basePage'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import * as fs from 'fs'
import { logger } from '../../logger/winston.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export class UploadAndDownload extends BasePage {
    protected downloadButton: Locator
    protected uploadButton: Locator
    protected uploadedFilePath: Locator

    constructor(page: Page) {
        super(page)

        this.downloadButton = this.page.locator('#downloadButton')
        this.uploadButton = this.page.locator('#uploadFile')
        this.uploadedFilePath = this.page.locator('#uploadedFilePath')
    }

    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadButton.click()
        const download = await downloadPromise

        await download.saveAs(path.join('srs/resources/files/download', download.suggestedFilename()))
    }

    async selectAndUploadFile() {
        const filePath =
            '/Users/ibez/Desktop/repos/ts-playwright/srs/resources/files/upload/Customer_Flight_Activity.csv'
        logger.info('Constructed file path:', filePath)

        if (!fs.existsSync(filePath)) {
            logger.error(`File not found: ${filePath}`)
            throw new Error('File not found')
        }

        await this.uploadButton.setInputFiles(filePath)
    }

    async getUploadedFilePath(): Promise<string> {
        const expFilePath = (await this.uploadedFilePath.textContent()) || ''
        return expFilePath
    }
}
