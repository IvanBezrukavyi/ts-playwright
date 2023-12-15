import { test, expect } from 'playwright/test'
import { UserDataGeneration } from '../Utils/userDataGeneration'
import { TextBoxKeyboardShortcuts, TextBoxMouseActions } from '../srs/main/demoApp/textBoxPageNew'

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

test.describe('@PO Text Box Tests', () => {
    let textBoxMouseActions: TextBoxMouseActions
    let textBoxKeyboardShortcuts: TextBoxKeyboardShortcuts
    let userTestData: UserData

    test.beforeEach(async ({ page }) => {
        textBoxMouseActions = new TextBoxMouseActions(page)
        textBoxKeyboardShortcuts = new TextBoxKeyboardShortcuts(page)
        userTestData = UserDataGeneration.generateUserData()

        await textBoxMouseActions.goTo()
        await textBoxMouseActions.selectElementsMenu()
        await textBoxMouseActions.selectTextBoxMenu()
    })

    test('TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle', async () => {
        const userData = getUserData(userTestData)

        console.log('***Generated User Data***', userData)

        await test.step('Step 1. Fill inputs by valid data for TC 2', async () => {
            await textBoxMouseActions.fillInputsByValues(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )
            await expect(textBoxMouseActions.fullName, 'Expected the entered full name').toHaveText(userData.fullName)
            await expect(textBoxMouseActions.email, 'Expected the entered email').toHaveText(userData.email)
            await expect(textBoxMouseActions.currentAddress, 'Expected the entered current address').toHaveText(
                userData.currentAddress
            )
            await expect(textBoxMouseActions.permanentAddress, 'Expected the entered permanent address').toHaveText(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button and Verify submitted data', async () => {
            await textBoxMouseActions.submitTextBoxForm()

            const submittedData = await textBoxMouseActions.getSubmittedData()

            expect(submittedData.expFullName, 'Expected the submitted full name').toMatch(userData.fullName)
            expect(submittedData.expEmail, 'Expected the submitted email').toMatch(userData.email)
            expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toMatch(
                userData.currentAddress
            )
            expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toMatch(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Remove data from All inputs', async () => {
            await textBoxMouseActions.removeInputContent([
                textBoxMouseActions.fullName,
                textBoxMouseActions.email,
                textBoxMouseActions.currentAddress,
                textBoxMouseActions.permanentAddress
            ])
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await textBoxMouseActions.submitTextBoxForm()
            const removedInputContent = await textBoxMouseActions.getRemovedInputContent()

            console.log(`***Removed Content from INPUTS***`, removedInputContent)
            expect(removedInputContent.removedFullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.removedEmail, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.removedCurrentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.removedPermanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })

    test('TC 3: E2E. Enter and remove data from input text fields and via keys and shortcuts', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data', async () => {
            await textBoxKeyboardShortcuts.fillInputsByShortcuts(
                userTestData.fullName,
                userTestData.email,
                userTestData.currentAddress,
                userTestData.permanentAddress
            )
            const inputData = await textBoxKeyboardShortcuts.getEnteredData()

            expect(inputData.fullName, 'Expected the entered full name').toBe(userData.fullName)
            expect(inputData.email, 'Expected the entered email').toBe(userData.email)
            expect(inputData.currentAddress, 'Expected the entered current address').toBe(userData.currentAddress)
            expect(inputData.permanentAddress, 'Expected the entered permanent address').toBe(userData.permanentAddress)
        })

        await test.step('Step 2. Click Submit button', async () => {
            await textBoxKeyboardShortcuts.submitTextBoxFormByEnter()

            const submittedData = await textBoxKeyboardShortcuts.getSubmittedData()

            expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Select all data in input and remove it', async () => {
            const inputLocators = [
                textBoxKeyboardShortcuts.fullName,
                textBoxKeyboardShortcuts.email,
                textBoxKeyboardShortcuts.currentAddress,
                textBoxKeyboardShortcuts.permanentAddress
            ]
            await textBoxKeyboardShortcuts.clearInputs(inputLocators)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await textBoxKeyboardShortcuts.submitTextBoxFormByEnter()
            const removedInputContent = await textBoxKeyboardShortcuts.getRemovedInputContent()
            expect(removedInputContent.removedFullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.removedEmail, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.removedCurrentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.removedPermanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })
})
