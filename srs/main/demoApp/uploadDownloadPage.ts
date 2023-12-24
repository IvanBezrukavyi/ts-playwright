import { Locator, Page } from 'playwright'
import { BasePage } from './basePage'
import * as path from 'path'
import * as fs from 'fs'
import { logger } from '../../logger/winston.config'

const SINGLE_FILE_PATH = process.env.SINGLE_FILE_PATH || 'srs/resources/files/upload/Customer_Flight_Activity.csv'

const MULTI_FILE_PATHS = process.env.MULTI_FILE_PATHS || [
    '/Users/ibez/Desktop/repos/ts-playwright/srs/resources/files/upload/Customer_Flight_Activity.csv',
    '/Users/ibez/Desktop/repos/ts-playwright/srs/resources/files/upload/Customer_Loyalty_History.csv'
]

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
        logger.info('Constructed file path:', SINGLE_FILE_PATH)

        if (!fs.existsSync(SINGLE_FILE_PATH)) {
            logger.error(`File not found: ${SINGLE_FILE_PATH}`)
            throw new Error('File not found')
        }

        await this.uploadButton.setInputFiles(SINGLE_FILE_PATH)
    }

    async selectAndUploadMultiFile() {
        MULTI_FILE_PATHS.forEach((filePath) => {
            logger.info('Constructed file path:', filePath)
        })

        if (!MULTI_FILE_PATHS.every((filePath) => fs.existsSync(filePath))) {
            const nonExistentFiles = MULTI_FILE_PATHS.filter((filePath) => !fs.existsSync(filePath))
            logger.error(`File not found: ${nonExistentFiles}`)
            throw new Error('File not found')
        }

        await this.uploadButton.setInputFiles(MULTI_FILE_PATHS)
    }

    async getUploadedFilePath(): Promise<string> {
        const expFilePath = (await this.uploadedFilePath.textContent()) || ''
        return expFilePath
    }
}
