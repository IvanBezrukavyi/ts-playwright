import { test, expect } from 'playwright/test'
import TextBoxPage from '../srs/main/demoApp/textBoxPage'
import { UserDataGeneration } from '../Utils/userDataGeneration'

test.describe('@Demoqa Text Box Tests', () => {
    test('TC 1: Fill out input text fields by data from faker lib', async ({ page }) => {
        const textBox = new TextBoxPage(page)
        const userTestData = UserDataGeneration.generateUserData()
        const { fullName, email, currentAddress, permanentAddress } = userTestData

        await test.step('Step 1. Navigate to application', async () => {
            await textBox.goTo()
        })
        await test.step('Step 2. Click on Elements menu', async () => {
            await textBox.selectElementsMenu()
        })
        await test.step('Step 3. Click on Text Box menu', async () => {
            await textBox.selectTextBoxMenu()
        })
        await test.step('Step 4. Fill inputs by valid data', async () => {
            await textBox.fillInputsByValues(fullName, email, currentAddress, permanentAddress)

            await expect(textBox.fullName, 'Expected the entered full name').toHaveValue(fullName)
            await expect(textBox.email, 'Expected the entered email').toHaveValue(email)
            await expect(textBox.currentAddress, 'Expected the entered current address').toHaveValue(currentAddress)
            await expect(textBox.permanentAddress, 'Expected the entered permanent address').toHaveValue(
                permanentAddress
            )
        })
        await test.step('Step 5. Click Submit button', async () => {
            await textBox.submitTextBoxForm()

            const submittedData = await textBox.getSubmittedData()

            expect(submittedData.expFullName, 'Expected the submitted full name').toContain(fullName)
            expect(submittedData.expEmail, 'Expected the submitted email').toContain(email)
            expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(currentAddress)
            expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                permanentAddress
            )
        })
    })
})
