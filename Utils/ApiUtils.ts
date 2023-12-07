import { APIRequestContext } from '@playwright/test'

interface LoginPayload {
    username: string
    password: string
}

interface OrderPayload {
    productId: number
    quantity: number
}

interface CreateOrderResponse {
    token: string
    orderId: number
}

class ApiUtils {
    private apiContext: APIRequestContext
    private loginPayload: LoginPayload

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(): Promise<string> {
        try {
            const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
                data: this.loginPayload
            })
            const loginResponseJson = await loginResponse.json()
            const token: string = loginResponseJson.token
            console.log(token)
            return token
        } catch (error) {
            console.error('Error while getting token:', error)
            throw error
        }
    }

    async createOrder(orderPayload: OrderPayload): Promise<CreateOrderResponse> {
        try {
            const response: CreateOrderResponse = {
                token: await this.getToken(),
                orderId: 0 // Initialize orderId
            }

            const orderResponse = await this.apiContext.post(
                'https://rahulshettyacademy.com/api/ecom/order/create-order',
                {
                    data: orderPayload,
                    headers: {
                        Authorization: response.token,
                        'Content-Type': 'application/json'
                    }
                }
            )

            const orderResponseJson = await orderResponse.json()
            console.log(orderResponseJson)
            const orderId = orderResponseJson.orders[0]
            response.orderId = orderId
            return response
        } catch (error) {
            console.error('Error while creating order:', error)
            throw error
        }
    }
}

export default ApiUtils
