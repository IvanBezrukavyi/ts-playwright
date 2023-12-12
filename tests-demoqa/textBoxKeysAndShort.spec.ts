import { test, expect } from 'playwright/test'
import { UserDataGeneration } from '../Utils/userDataGeneration'
import { PageActions, KeyboardShortcuts, PageLocators, setupPageLocators } from '../srs/main/demoApp/textBoxPage copy'

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
    let pageActions: PageActions
    let keyboardShortcuts: KeyboardShortcuts
    let userTestData: UserData
    let pageLocators: PageLocators

    test.beforeEach(async ({ page }) => {
        pageActions = new PageActions({ page, locators: pageLocators })
        keyboardShortcuts = new KeyboardShortcuts({ page, locators: pageLocators })
        userTestData = UserDataGeneration.generateUserData()
        pageLocators = await setupPageLocators(page)

        await pageActions.goTo()
        await pageActions.selectElementsMenu()
        await pageActions.selectTextBoxMenu()
    })

    test('TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle', async () => {
        const userData = getUserData(userTestData)

        console.log('***Generated User Data***', userData)

        await test.step('Step 1. Fill inputs by valid data for TC 2', async () => {
            await pageActions.fillInputsByValues(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )

            console.log('Inputs filled successfully!')

            const inputData = await pageActions.getEnteredData()
            console.log('***Entered Data***', inputData)

            expect(inputData.fullName, 'Expected the entered full name').toMatch(userData.fullName)
            expect(inputData.email, 'Expected the entered email').toMatch(userData.email)
            expect(inputData.currentAddress, 'Expected the entered current address').toMatch(userData.currentAddress)
            expect(inputData.permanentAddress, 'Expected the entered permanent address').toMatch(
                userData.permanentAddress
            )
        })

        await test.step('Step 2. Click Submit button and Verify submitted data', async () => {
            await pageActions.submitTextBoxForm()

            const submittedData = await pageActions.getSubmittedData()

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
            const inputLocators = [
                pageActions.inputs.fullName,
                pageActions.inputs.email,
                pageActions.inputs.currentAddress,
                pageActions.inputs.permanentAddress
            ]
            await pageActions.removeInputContent(inputLocators)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await pageActions.submitTextBoxForm()
            const removedInputContent = await pageActions.getRemovedInputContent()

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
            await keyboardShortcuts.fillInputsByShortcuts(
                userTestData.fullName,
                userTestData.email,
                userTestData.currentAddress,
                userTestData.permanentAddress
            )
            const inputData = await pageActions.getEnteredData()

            expect(inputData.fullName, 'Expected the entered full name').toBe(userData.fullName)
            expect(inputData.email, 'Expected the entered email').toBe(userData.email)
            expect(inputData.currentAddress, 'Expected the entered current address').toBe(userData.currentAddress)
            expect(inputData.permanentAddress, 'Expected the entered permanent address').toBe(userData.permanentAddress)
        })

        await test.step('Step 2. Click Submit button', async () => {
            await keyboardShortcuts.submitTextBoxFormByEnter()

            const submittedData = await keyboardShortcuts.getSubmittedData()

            expect(submittedData.expFullName, 'Expected the submitted full name').toContain(userData.fullName)
            expect(submittedData.expEmail, 'Expected the submitted email').toContain(userData.email)
            expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(
                userData.currentAddress
            )
            expect(submittedData.expPermanentAddress, 'Expected the submitted permanent address').toContain(
                userData.permanentAddress
            )
        })

        await test.step('Step 3. Select all data in row and remove it', async () => {
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.fullName)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.email)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.currentAddress)
            await keyboardShortcuts.removeContentViaShortcuts(keyboardShortcuts.permanentAddress)
        })

        await test.step('Step 4. Click Submit button and Verify absence data after removing it', async () => {
            await keyboardShortcuts.submitTextBoxFormByEnter()
            const removedInputContent = await keyboardShortcuts.getRemovedInputContent()
            expect(removedInputContent.removedFullName, 'Expected empty Full Name input field').toBe('')
            expect(removedInputContent.removedEmail, 'Expected empty Email input field').toBe('')
            expect(removedInputContent.removedCurrentAddress, 'Expected empty Current Address input field').toBe('')
            expect(removedInputContent.removedPermanentAddress, 'Expected empty Permanent Address input field').toBe('')
        })
    })
})
