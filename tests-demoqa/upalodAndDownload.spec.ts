import * as path from 'path'
import { UploadAndDownload } from '../srs/main/demoApp/uploadDownloadPage'
import { test, expect } from 'playwright/test'

const SINGLE_FILE_PATH = process.env.SINGLE_FILE_PATH || 'srs/resources/files/upload/Customer_Flight_Activity.csv'
const UPL_FILE_PATH = 'srs/resources/files/download'

test.describe('@Demoqa Download and Upload tests', () => {
    let uploadDownloadPage: UploadAndDownload

    test.beforeEach(async ({ page }) => {
        uploadDownloadPage = new UploadAndDownload(page)

        await uploadDownloadPage.goTo()
        await uploadDownloadPage.selectElementsMenu()
        await uploadDownloadPage.selectTextBoxMenu()
        await uploadDownloadPage.selectUploadAndDownloadMenu()
    })

    test('TC_1: Verify downloading 1 file', async () => {
        const customFileName = await uploadDownloadPage.downloadFile()
        const actualFilePath = await uploadDownloadPage.retrieveDownloadedFile(customFileName)

        expect(actualFilePath.filePath).toBe(path.join(UPL_FILE_PATH, customFileName))
    })

    test('TC_2: Verify uploading 1 file', async () => {
        await uploadDownloadPage.selectAndUploadFile()
        const uploadedFilePath = await uploadDownloadPage.getUploadedFilePath()
        expect(uploadedFilePath, 'Expected uploaded file path').toContain(path.basename(SINGLE_FILE_PATH))
    })
})
