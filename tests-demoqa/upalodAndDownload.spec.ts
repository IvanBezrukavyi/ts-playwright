import * as path from 'path'
import { test, expect } from '../srs/fixtures/fixturePages'

const SINGLE_FILE_PATH = process.env.SINGLE_FILE_PATH || 'srs/resources/files/upload/Customer_Flight_Activity.csv'
const UPL_FILE_PATH = 'srs/resources/files/download'

test.describe('@Demoqa Download and Upload tests', () => {
    test.beforeEach(async ({ navigationUploadDownloadPage }) => {
        await navigationUploadDownloadPage.goTo()
        await navigationUploadDownloadPage.selectElementsMenu()
        await navigationUploadDownloadPage.selectUploadAndDownloadMenu()
    })

    test('TC_1: Verify downloading 1 file', async ({ navigationUploadDownloadPage }) => {
        const customFileName = await navigationUploadDownloadPage.downloadFile()
        const actualFilePath = await navigationUploadDownloadPage.retrieveDownloadedFile(customFileName)

        expect(actualFilePath.filePath, 'Expected download file path').toBe(path.join(UPL_FILE_PATH, customFileName))
    })

    test('TC_2: Verify uploading 1 file', async ({ navigationUploadDownloadPage }) => {
        await navigationUploadDownloadPage.selectAndUploadFile()
        const uploadedFilePath = await navigationUploadDownloadPage.getUploadedFilePath()
        expect(uploadedFilePath, 'Expected upload file path').toContain(path.basename(SINGLE_FILE_PATH))
    })
})
