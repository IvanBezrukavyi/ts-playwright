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

    test('TC: Verify uploading file', async () => {
        await uploadDownloadPage.selectAndUploadFile()
        expect(uploadDownloadPage.getUploadedFilePath).toContain('Legal Hold Data Sample1.pdf')
    })
})
