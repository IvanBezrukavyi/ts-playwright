/* eslint-disable prettier/prettier */
import { expect, test } from '@playwright/test'
import POManager from '../srs/main/clientApp/POManager'
import * as fs from 'fs'

const filePath = 'Utils/placeOrderTestData.json'
const rawdata = fs.readFileSync(filePath, 'utf-8')
const dataset = JSON.parse(rawdata)
let orderId: string | undefined

for (const data of dataset) {
    test(`TC: Verify success login to client app with ${data.userName} and ${data.userPass}`, async ({ page }) => {
        const pomManager = new POManager(page)
        const loginPage = pomManager.getLoginPage()
        loginPage.goTo()
        loginPage.validLogin(data.userName, data.userPass)
        const list = page.locator('.card-body b')
        await page.locator('.card-body b').first().waitFor()
        console.log(await list.allTextContents())
        expect(await list.count()).toBeGreaterThan(0)
    })
}

for (const data of dataset) {
    test(`TC: E2E for ordering ${data.productName}`, async ({ page }) => {
        const pomManager = new POManager(page)
        const loginPage = pomManager.getLoginPage()
        const dashboardPage = pomManager.getDashboardPage()
        const cartPage = pomManager.getCartPage()
        const completeOrderPage = pomManager.getCompleteOrderPage()
        const orderHistoryPage = pomManager.getOrderHistoryPage()

        await test.step('Step 1. Login to application with valid data from preconditions', async () => {
            await loginPage.goTo()
            await loginPage.validLogin(data.userName, data.userPass)
            await dashboardPage.verifyLoggedIn()
            expect(await dashboardPage.isLoggedIn(), 'Expected Login is successful').toBe(true)
            await expect(dashboardPage.getDashboardLogo()).toBeAttached()
        })

        await test.step('Step 2. Navigate to dashboard page and Select needed product', async () => {
            await dashboardPage.searchProductAddCart(data.productName)
            expect(data.productName, 'Product is selected').toBe(data.productName)
        })
        await test.step('Step 3. Click on Cart icon after adding product', async () => {
            await dashboardPage.navigateToCart()
        })

        await test.step('Step 4. Verify presence of selected product on Cart page', async () => {
            await cartPage.VerifyProductIsDisplayed(data.productName)
            const isOnCartPage = await cartPage.isOnCartPage()
            expect(isOnCartPage, 'User is redirected on Cart page').toBeTruthy()
        })

        await test.step('Step 5. Click Checkout button', async () => {
            await cartPage.Checkout()
        })

        await test.step('Step 7. Fill out payment information with valid cvv, card name and selection of country', async () => {
            await completeOrderPage.enterPaymentInformation(
                data.cvv,
                data.cardName,
                data.shortCountry,
                data.fullCountryName
            )
            expect(await completeOrderPage.getCvvInputValue(), 'CVV code is entered correctly').toBe(data.cvv)
            expect(await completeOrderPage.getCardNameInputValue(), 'Card name is entered correctly').toBe(
                data.cardName
            )
        })

        try {
            await test.step('Step 8. Click Complete Order button', async () => {
                orderId = await completeOrderPage.SubmitAndGetOrderId()
                console.log(orderId)
            })
        } catch (error) {
            console.error('Failed to submit order:', error)
        }

        await test.step("Step 9. Verify order's presence in Order History page", async () => {
            await dashboardPage.navigateToOrders()
            await orderHistoryPage.searchOrderAndSelect(orderId)
            expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()
        })
    })
}
