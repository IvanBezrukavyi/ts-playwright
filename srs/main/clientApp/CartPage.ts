import { Locator, Page } from "@playwright/test";

class CartPage {
  readonly page: Page;
  readonly cvv: Locator;
  readonly cardName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cvv = page.locator("div:has-text('CVV Code ')");
    this.cardName = page.locator("(//input[@type='text'])[3]");
  }
  async validDashboardData(cvv: string, cardName: string) {
    try {
      await this.cvv.fill(cvv);
      await this.cardName.fill(cardName);
      await this.page.waitForLoadState("domcontentloaded");
    } catch (error) {
      console.error("Error after filling data on CHECKOUT page:", error);
    }
  }
}

export default CartPage;
