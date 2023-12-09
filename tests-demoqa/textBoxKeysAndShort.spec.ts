import { test, expect } from 'playwright/test'
import TextBoxPage from '../srs/main/demoApp/textBoxPage'
import { UserDataGeneration } from '../Utils/userDataGeneration'

interface UserData {
    fullName: string
    email: string
    currentAddress: string
    permanentAddress: string
}

function getUserData(userData: UserData): Pick<UserData, 'fullName' | 'email' | 'currentAddress' | 'permanentAddress'> {
    return {
        fullName: userData.fullName,
        email: userData.email,
        currentAddress: userData.currentAddress,
        permanentAddress: userData.permanentAddress
    }
}

test.describe('@Demoqa Text Box Tests', () => {
    let textBox: TextBoxPage
    let userTestData: UserData

    test.beforeEach(async ({ page }) => {
        textBox = new TextBoxPage(page)
        userTestData = UserDataGeneration.generateUserData()

        await textBox.goTo()
        await textBox.selectElementsMenu()
        await textBox.selectTextBoxMenu()
    })

    test('TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data', async () => {
            await textBox.fillInputsByShortcuts(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )

            await expect(textBox.fullName, 'Expected the entered full name').toHaveValue(userData.fullName)
            await expect(textBox.email, 'Expected the entered email').toHaveValue(userData.email)
            await expect(textBox.currentAddress, 'Expected the entered current address').toHaveValue(
                userData.currentAddress
            )
            await expect(textBox.permanentAddress, 'Expected the entered permanent address').toHaveValue(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button and Verify submitted data', async () => {
            await textBox.submitTextBoxFormByEnter()

            const submittedData = await textBox.getSubmittedData()

            await expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            await expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            await expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            await expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Remove data from Full Name input', async () => {
            await textBox.removeInputContent(textBox.fullName)
            await textBox.removeInputContent(textBox.email)
            await textBox.removeInputContent(textBox.currentAddress)
            await textBox.removeInputContent(textBox.permanentAddress)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await textBox.submitTextBoxFormByEnter()
            const removedInputContent = await textBox.getRemovedInputContent()
            expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.email, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })

    test('TC 3: E2E. Enter and remove data from input text fields and via keys and shortcuts', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data', async () => {
            await textBox.fillInputsByShortcuts(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )

            await expect(textBox.fullName, 'Expected the entered full name').toHaveValue(userData.fullName)
            await expect(textBox.email, 'Expected the entered email').toHaveValue(userData.email)
            await expect(textBox.currentAddress, 'Expected the entered current address').toHaveValue(
                userData.currentAddress
            )
            await expect(textBox.permanentAddress, 'Expected the entered permanent address').toHaveValue(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button', async () => {
            await textBox.submitTextBoxFormByEnter()

            const submittedData = await textBox.getSubmittedData()

            await expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            await expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            await expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            await expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Select all data in row and remove it', async () => {
            await textBox.removeContentViaShortcuts(textBox.fullName)
            await textBox.removeContentViaShortcuts(textBox.email)
            await textBox.removeContentViaShortcuts(textBox.currentAddress)
            await textBox.removeContentViaShortcuts(textBox.permanentAddress)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await textBox.submitTextBoxFormByEnter()
            const removedInputContent = await textBox.getRemovedInputContent()
            expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.email, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })
})
