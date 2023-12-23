import { UploadAndDownload } from '../srs/main/demoApp/uploadDownloadPage'
import { test, expect } from 'playwright/test'

test.describe('@Demoqa Download and Upload tests', () => {
    let uploadDownloadPage: UploadAndDownload

    test.beforeEach(async ({ page }) => {
        uploadDownloadPage = new UploadAndDownload(page)

        await uploadDownloadPage.goTo()
        await uploadDownloadPage.selectElementsMenu()
        await uploadDownloadPage.selectTextBoxMenu()
        await uploadDownloadPage.selectUploadAndDownloadMenu()
    })

    test('TC: Verify uploading 1 file', async () => {
        await uploadDownloadPage.selectAndUploadFile()
        const uploadedFilePath = await uploadDownloadPage.getUploadedFilePath()
        expect(uploadedFilePath).toContain('Customer_Flight_Activity.csv')
    })
})
