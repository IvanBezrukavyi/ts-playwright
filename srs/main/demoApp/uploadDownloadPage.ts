import { Locator, Page } from 'playwright'
import { BasePage } from './basePage'
import * as path from 'path'
import * as fs from 'fs'
import { logger } from '../../logger/winston.config'

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
        const filePath = path.join(__dirname, '..', 'resources', 'files', 'upload', 'Legal Hold Data Sample1.pdf')
        logger.debug('Constructed file path:', filePath)

        await this.uploadButton.focus()
        await this.uploadButton.waitFor({ state: 'visible' })

        if (!fs.existsSync(filePath)) {
            logger.error(`File not found: ${filePath}`)
            throw new Error('File not found')
        }

        await this.uploadButton.setInputFiles(path.join(__dirname, filePath))
    }

    async getUploadedFilePath(): Promise<string> {
        const expFilePath = (await this.uploadedFilePath.textContent()) || ''
        return expFilePath
    }
}
