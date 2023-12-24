import { Locator, Page } from 'playwright'
import * as fs from 'fs/promises'
import { BasePage } from './basePage'
import * as path from 'path'
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
        logger.info('Starting file download process')

        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadButton.click()

        logger.debug('Download event triggered')

        const download = await downloadPromise

        const now = new Date()
        const filenamePrefix = 'upload-sample-'
        const dateString = now.toISOString().slice(0, 10) // YYYY-MM-DD
        const timeString = now.toISOString().slice(11, 16) // HH:mm
        const customFileName = `${filenamePrefix}${dateString}-${timeString}.jpeg`

        logger.info(`Saving file as: ${customFileName}`)

        await download.saveAs(path.join('srs/resources/files/download', customFileName))

        logger.info('File download completed successfully')

        return customFileName
    }

    async retrieveDownloadedFile(
        fileName: string,
        downloadPath: string = 'srs/resources/files/download'
    ): Promise<{ filePath: string; fileName: string }> {
        try {
            const filePath = path.join(downloadPath, fileName)

            logger.info(`Retrieving downloaded file path: ${filePath}`)

            await fs.access(filePath)

            logger.info('File retrieval completed successfully')

            return { filePath, fileName }
        } catch (error) {
            logger.error(`Error during file retrieval: ${error.message}`)
            throw error
        }
    }

    async selectAndUploadFile() {
        logger.info('Constructed file path:', { filePath: SINGLE_FILE_PATH })

        if (!fs.existsSync(SINGLE_FILE_PATH)) {
            logger.error(`File not found: ${SINGLE_FILE_PATH}`)
            throw new Error('File not found')
        }

        await this.uploadButton.setInputFiles(SINGLE_FILE_PATH)
    }

    async selectAndUploadMultiFile() {
        MULTI_FILE_PATHS.forEach((filePath) => {
            logger.info('Constructed file path:', { filePath })
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
