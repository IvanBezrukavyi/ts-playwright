import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import CartPage from "./CartPage";
import CompleteOrderPage from "./CompleteOrderPage";

class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly cartPage: CartPage;
  private readonly dashboardPage: DashboardPage;
  private readonly completeOrderPage: CompleteOrderPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.completeOrderPage = new CompleteOrderPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }
  getCartPage(): CartPage {
    return this.cartPage;
  }

  getCompleteOrderPage(): CompleteOrderPage {
    return this.completeOrderPage;
  }
}

export default POManager;
