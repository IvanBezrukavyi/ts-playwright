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
        pageLocators = await setupPageLocators(page)
        pageActions = new PageActions({ page, locators: pageLocators })
        keyboardShortcuts = new KeyboardShortcuts({ page, locators: pageLocators })
        userTestData = UserDataGeneration.generateUserData()

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

            // await expect(pageLocators.inputs.fullName).toHaveText(userData.fullName)

            const inputData = await pageActions.getEnteredData()
            console.log('***Entered Data***', inputData)
            expect(inputData).toEqual(userData)
            //expect(inputData.enteredFullName, 'Expected the entered full name').toMatch(userData.fullName)
            // expect(inputData.enteredEmail, 'Expected the entered email').toMatch(userData.email)
            // expect(inputData.enteredCurrentAddress, 'Expected the entered current address').toMatch(
            //     userData.currentAddress
            // )
            // expect(inputData.enteredPermanentAddress, 'Expected the entered permanent address').toMatch(
            //     userData.permanentAddress
            // )
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
            await pageActions.removeInputContent([
                pageLocators.inputs.fullName,
                pageLocators.inputs.email,
                pageLocators.inputs.currentAddress,
                pageLocators.inputs.permanentAddress
            ])
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
            // const inputData = await pageActions.getEnteredData()

            // await expect(inputData.enteredFullName, 'Expected the entered full name').toBe(userData.fullName)
            // await expect(inputData.enteredEmail, 'Expected the entered email').toBe(userData.email)
            // await expect(inputData.enteredCurrentAddress, 'Expected the entered current address').toBe(
            //     userData.currentAddress
            // )
            // await expect(inputData.enteredPermanentAddress, 'Expected the entered permanent address').toBe(
            //     userData.permanentAddress
            // )
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

        await test.step('Step 3. Select all data in input and remove it', async () => {
            const inputLocators = [
                pageLocators.inputs.fullName,
                pageLocators.inputs.email,
                pageLocators.inputs.currentAddress,
                pageLocators.inputs.permanentAddress
            ]
            await keyboardShortcuts.clearInputs(inputLocators)
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
