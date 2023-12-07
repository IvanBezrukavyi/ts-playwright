import { Page } from '@playwright/test'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'
import CartPage from './CartPage'
import CompleteOrderPage from './CompleteOrderPage'
import OrderHistoryPage from './OrderHistoryPage'

class POManager {
    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly cartPage: CartPage
    private readonly dashboardPage: DashboardPage
    private readonly completeOrderPage: CompleteOrderPage
    private readonly orderHistoryPage: OrderHistoryPage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.completeOrderPage = new CompleteOrderPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage(): LoginPage {
        return this.loginPage
    }

    getDashboardPage(): DashboardPage {
        return this.dashboardPage
    }
    getCartPage(): CartPage {
        return this.cartPage
    }

    getCompleteOrderPage(): CompleteOrderPage {
        return this.completeOrderPage
    }

    getOrderHistoryPage(): OrderHistoryPage {
        return this.orderHistoryPage
    }
}

export default POManager
