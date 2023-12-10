import { Browser, Page, chromium, firefox } from 'playwright'
import { TestLogger } from '../srs/logger/testLogger'

let browser: Browser | null = null
let page: Page | null = null
let logger: TestLogger | null = null

async function getBrowser(browserType: 'chromium' | 'firefox' = 'chromium'): Promise<Browser> {
    if (!browser) {
        switch (browserType) {
            case 'chromium':
                browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' })
                break
            case 'firefox':
                browser = await firefox.launch()
                break
            default:
                throw new Error('Unsupported browser type: ' + browserType)
        }
    }
    return browser
}

async function getPage(browserType: 'chromium' | 'firefox' = 'chromium'): Promise<Page> {
    if (!page) {
        page = await (await getBrowser(browserType)).newPage()
    }
    return page
}

async function getLogger(): Promise<TestLogger> {
    if (!logger) {
        // Import and initialize logger
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { logger: winstonLogger } = require('../srs/logger/winston.config')
        logger = new TestLogger(winstonLogger)
    }
    return logger
}

export { getBrowser, getPage, getLogger }
