import { expect, test as setup } from '@playwright/test'
import { levels, logger } from '../srs/logger/winston.config'

const authLoginEndPoint = process.env.AUTH_LOGIN_END_POINT || 'https://rahulshettyacademy.com/api/ecom/auth/login'
const authFile = process.env.AUTH_FILE || './srs/auth/defaultStorageState.json'
const clientAppUrl = process.env.CLIENT_APP_URL || 'https://rahulshettyacademy.com'
const userEmail = process.env.USER_EMAIL || 'nspprotest@gmail.com'
const userPassword = process.env.USER_PASSWORD || 'Pl@ywright_test_m1'

setup('default authentication for client app', async ({ context, request }) => {
    logger.info('Starting set up auth process')

    const requestBody = {
        userEmail,
        userPassword
    }
    logger.debug('Sending login request with body:', { requestBody })

    const loginResponse = await request.post(authLoginEndPoint, {
        data: requestBody
    })

    logger.info('API request sent to:', { authLoginEndPoint })

    if (!loginResponse.ok) {
        logger.error('Login failed with status code:', { statusCode: loginResponse.status })
        throw new Error(`Login failed with status code: ${loginResponse.status}`)
    }
    const loginResponseJson = await loginResponse.json()
    const token = loginResponseJson.token

    logger.info('Login response received:', levels.info, {
        url: authLoginEndPoint,
        statusCode: loginResponse.status,
        headers: loginResponse.headers,
        body: JSON.stringify(loginResponseJson)
    })

    expect(token).not.toBeFalsy()

    try {
        await context.addCookies([
            {
                name: 'JWToken',
                value: loginResponseJson.token,
                url: clientAppUrl
            }
        ])

        await context.storageState({ path: authFile })
    } catch (error) {
        logger.error('Error setting up authentication:', { error: error.stack })
        throw error
    }
})
