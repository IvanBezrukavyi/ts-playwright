import path from 'path'
import { UploadAndDownload } from '../srs/main/demoApp/uploadDownloadPage'
import { test, expect } from 'playwright/test'

const SINGLE_FILE_PATH = 'srs/resources/files/upload/Customer_Flight_Activity.csv'

test.describe('@Demoqa Download and Upload tests', () => {
    let uploadDownloadPage: UploadAndDownload

    test.beforeEach(async ({ page }) => {
        uploadDownloadPage = new UploadAndDownload(page)

        await uploadDownloadPage.goTo()
        await uploadDownloadPage.selectElementsMenu()
        await uploadDownloadPage.selectTextBoxMenu()
        await uploadDownloadPage.selectUploadAndDownloadMenu()
    })

    test('TC_1: Verify uploading 1 file', async () => {
        await uploadDownloadPage.selectAndUploadFile()
        const uploadedFilePath = await uploadDownloadPage.getUploadedFilePath()
        expect(uploadedFilePath).toContain(path.basename(SINGLE_FILE_PATH))
    })
})
