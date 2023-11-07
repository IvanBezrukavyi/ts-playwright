import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import CartPage from "./CartPage";

class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly cartPage: CartPage;
  private readonly dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
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
}

export default POManager;
