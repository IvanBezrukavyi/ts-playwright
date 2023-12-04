import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
  reporter: [
            ['html'],
            ['allure-playwright']
            ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
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
      testMatch: 'auth.tearDown.spec.ts',
    },
    {
      name: 'client app',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: 'https://rahulshettyacademy.com',
        storageState: 'srs/auth/defaultStorageState.json',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
     },
    },
    {     
     name: "demoqa",
     testDir: './tests-demoqa',
     use: {
      ...devices['Desktop Firefox'],
      browserName: 'firefox',
      baseURL: 'https://demoqa.com/',
      headless : true,
      screenshot : 'on',
      video: 'retain-on-failure',
     },
    },
  ],
});
