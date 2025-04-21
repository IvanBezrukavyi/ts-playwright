// TO DO: Refactor this test to use the Page Object Model (POM) pattern
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* import { test, expect, request } from '@playwright/test'
import ApiUtils from '../Utils/apiUtils'

interface LoginPayload {
    userEmail: string
    userPassword: string
}

interface OrderPayload {
    orders: {
        country: string
        productOrderedId: string
    }[]
}

let response: { token: string; orderId: number }

const loginPayload: LoginPayload = {
    userEmail: 'nspprotest@gmail.com',
    userPassword: 'Pl@ywright_test_m1'
}

const orderPayload: OrderPayload = {
    orders: [
        {
            country: 'Ukraine',
            productOrderedId: '6262e9d9e26b7e1a10e89c04'
        }
    ]
}

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new ApiUtils(apiContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload)
    console.log('Verify success login')
})

test('E2E for ordering IPHONE 13 PRO cell phone with mix UI and API', async ({ page }) => {
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('button[routerlink*=myorders]').waitFor({ state: 'visible' })
    console.log('Orders tab is now visible.')
    await page.locator('button[routerlink*=myorders]').click()
    await page.locator('table').waitFor()

    const rows = page.locator('tbody tr')

    for (let i = 0; i < (await rows.count()); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent()

        if (response.orderId === rowOrderId) {
            await rows.nth(i).locator('button').first().click()
            break
        }
    }

    const orderIdDetails = await page.locator('.col-text').textContent()
    console.log('Order id equals to bought stuff')

    // Check if orderIdDetails is equal to response.orderId
    expect(response.orderId === orderIdDetails).toBeTruthy()
})*/
