import { expect, request, test } from '@playwright/test'
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

interface FakePayloadOrders {
    data: unknown[]
    message: string
}

const loginPayload: LoginPayload = {
    userEmail: 'nspprotest@gmail.com',
    userPassword: 'Pl@ywright_test_m1'
}

const orderPayload: OrderPayload = {
    orders: [{ country: 'Ukraine', productOrderedId: '6262e9d9e26b7e1a10e89c04' }]
}

const fakePayloadOrders: FakePayloadOrders = {
    data: [],
    message: 'No Orders'
}

let response: { token: string; orderId: number }

test.beforeAll(async () => {
    try {
        const apiContext = await request.newContext()
        const apiUtils = new ApiUtils(apiContext, loginPayload)
        response = await apiUtils.createOrder(orderPayload)
        console.log('Successfully obtained token and orderId')
    } catch (error) {
        console.error('Error during beforeAll test:', error)
        throw error
    }
})

test('TC: Verify absence of order via intercepted request', async ({ page }) => {
    try {
        await page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, response.token)
        await page.goto('https://rahulshettyacademy.com/client')
        await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async (route) => {
            const response = await page.request.fetch(route.request())
            const body = JSON.stringify(fakePayloadOrders)

            route.fulfill({
                response,
                body
            })
        })
        await page.locator('button[routerlink*=myorders]').click()
        console.log('LOG: No Orders in the cart')
        await expect(page.locator('.mt-4')).toHaveText('You have No Orders to show at this time. Please Visit Back Us')
    } catch (error) {
        console.error('Error during test:', error)
        throw error
    }
})
