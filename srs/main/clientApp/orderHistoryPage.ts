import { Locator, Page } from '@playwright/test'

class OrdersHistoryPage {
    readonly page: Page
    readonly ordersTable: Locator
    readonly rows: Locator
    readonly orderIdDetails: Locator

    constructor(page) {
        this.page = page
        this.ordersTable = page.locator('tbody')
        this.rows = page.locator('tbody tr')
        this.orderIdDetails = page.locator('.col-text')
    }
    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor()
        for (let i = 0; i < (await this.rows.count()); ++i) {
            const rowOrderId = await this.rows.nth(i).locator('th').textContent()
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator('button').first().click()
                break
            }
        }
    }

    async getOrderId() {
        return await this.orderIdDetails.textContent()
    }
}

export default OrdersHistoryPage
