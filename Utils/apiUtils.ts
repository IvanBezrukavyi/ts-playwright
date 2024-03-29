import { APIRequestContext } from '@playwright/test'
import { logger } from '../srs/logger/winston.config'

const endpoints = {
    authLoginEndPoint: process.env.AUTH_LOGIN_END_POINT || 'https://rahulshettyacademy.com/api/ecom/auth/login',
    createOrder: 'https://rahulshettyacademy.com/api/ecom/order/create-order'
}

interface RequestPayload {
    [key: string]: never
}

interface CreateOrderResponse {
    token: string
    orderId: number
}

class ApiUtils {
    private apiContext: APIRequestContext
    private loginPayload: RequestPayload
    private token: string | null = null

    constructor(apiContext: APIRequestContext, loginPayload: RequestPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(): Promise<string> {
        try {
            const loginResponse = await this.apiContext.post(endpoints.authLoginEndPoint, {
                data: this.loginPayload
            })
            const loginResponseJson = await loginResponse.json()
            const token: string = loginResponseJson.token
            logger.info(token)
            return token
        } catch (error) {
            logger.error('Error while getting token:', error)
            throw error
        }
    }

    async createOrder(orderPayload: RequestPayload): Promise<CreateOrderResponse> {
        try {
            const response: CreateOrderResponse = {
                token: await this.getToken(),
                orderId: 0 // Initialize orderId
            }

            const orderResponse = await this.apiContext.post(endpoints.createOrder, {
                data: orderPayload,
                headers: {
                    Authorization: response.token,
                    'Content-Type': 'application/json'
                }
            })

            const orderResponseJson = await orderResponse.json()
            logger.info(orderResponseJson)
            const orderId = orderResponseJson.orders[0]
            response.orderId = orderId
            return response
        } catch (error) {
            logger.error('Error while creating order:', error)
            throw error
        }
    }
}

export default ApiUtils
