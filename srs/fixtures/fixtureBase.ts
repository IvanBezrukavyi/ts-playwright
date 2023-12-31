import { ConsoleMessage, test as base } from '@playwright/test'

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 })

        page.on(`console`, async (msg: ConsoleMessage) => {
            if (msg.type() === 'error' && msg.text().includes('https://demoqa.com/')) {
                throw new Error(`Console error: ${msg.text()}`)
            }
        })

        //Additional needed logic can be added here

        await use(page)

        // Post condition test logic can be added here
    }
})
