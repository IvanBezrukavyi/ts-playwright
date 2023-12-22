import { UserDataGeneration } from '../Utils/userDataGeneration'
import { TextBoxKeyboardShortcuts, TextBoxMouseActions } from '../srs/main/demoApp/textBoxPageNew'
import { test, expect } from '../srs/fixtures/fixturePages'

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
    let textBoxMouseActions: TextBoxMouseActions
    let textBoxKeyboardShortcuts: TextBoxKeyboardShortcuts
    let userTestData: UserData

    test.beforeEach(async ({ page, navigationTextBoxPage }) => {
        await navigationTextBoxPage.goTo()
        await navigationTextBoxPage.selectElementsMenu()
        await navigationTextBoxPage.selectTextBoxMenu()
        textBoxMouseActions = new TextBoxMouseActions(page)
        textBoxKeyboardShortcuts = new TextBoxKeyboardShortcuts(page)
        userTestData = UserDataGeneration.generateUserData()
    })

    test('TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle', async () => {
        const userData = getUserData(userTestData)

        await test.step('Step 1. Fill inputs by valid data for TC 2', async () => {
            await textBoxMouseActions.fillInputsByValues(
                userData.fullName,
                userData.email,
                userData.currentAddress,
                userData.permanentAddress
            )
            const enteredData = await textBoxMouseActions.getEnteredData()
            expect(enteredData.fullName, 'Expected the entered full name').toMatch(userData.fullName)
            expect(enteredData.email, 'Expected the entered email').toMatch(userData.email)
            expect(enteredData.currentAddress, 'Expected the entered current address').toMatch(userData.currentAddress)
            expect(enteredData.permanentAddress, 'Expected the entered permanent address').toMatch(
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
            expect(removedInputContent.removedFullName, 'Expected empty Full Name input field').toMatch('')
            expect(removedInputContent.removedEmail, 'Expected empty Email input field').toMatch('')
            expect(removedInputContent.removedCurrentAddress, 'Expected empty Current Address input field').toMatch('')
            expect(removedInputContent.removedPermanentAddress, 'Expected empty Permanent Address input field').toMatch(
                ''
            )
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
            const enteredData = await textBoxKeyboardShortcuts.getEnteredData()

            expect(enteredData.fullName, 'Expected the entered full name').toMatch(userData.fullName)
            expect(enteredData.email, 'Expected the entered email').toMatch(userData.email)
            expect(enteredData.currentAddress, 'Expected the entered current address').toMatch(userData.currentAddress)
            expect(enteredData.permanentAddress, 'Expected the entered permanent address').toMatch(
                userData.permanentAddress
            )
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
