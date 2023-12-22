import { Locator, Page } from 'playwright'
import { BasePage } from './basePage'
import path = require('path')

export class UploadAndDownload extends BasePage {
    protected downloadButton: Locator
    protected uploadButton: Locator

    constructor(page: Page) {
        super(page)

        this.downloadButton = this.page.locator('#downloadButton')
        this.uploadButton = this.page.locator('#uploadFile')
    }

    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadButton.click()
        const download = await downloadPromise

        await download.saveAs('srs/resources/files/download' + download.suggestedFilename())
    }

    async uploadFile() {
        await this.uploadButton.setInputFiles(
            path.join('srs/resources/files/upload/Legal Hold Data Sample1.pdf', 'Legal Hold Data Sample1.pdf')
        )
    }
}
