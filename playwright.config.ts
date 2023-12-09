import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()
//console.log(process.env); // it needs for debugging

const authFile = process.env.AUTH_FILE || './srs/auth/defaultStorageState.json'

export default defineConfig({
    testDir: './tests',
    /* Add timeout in milliseconds */
    timeout: 5 * 60 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 3 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html'], ['allure-playwright']],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure'
    },
    projects: [
        {
            name: 'setup',
            use: {
                headless: true
            },
            testMatch: 'auth.setupNew.spec.ts',
            teardown: 'teardown'
        },
        {
            name: 'teardown',
            testMatch: 'auth.tearDown.spec.ts'
        },
        {
            name: 'client app',
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                baseURL: 'https://rahulshettyacademy.com',
                storageState: authFile,
                screenshot: 'only-on-failure',
                video: 'retain-on-failure'
            }
        },
        {
            name: 'demoqa',
            testDir: './tests-demoqa',
            use: {
                ...devices['Desktop Firefox'],
                browserName: 'firefox',
                baseURL: 'https://demoqa.com/',
                headless: true,
                screenshot: 'on',
                video: 'retain-on-failure'
            }
        }
    ]
})
