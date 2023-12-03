import { Locator, Page, expect } from "@playwright/test";

class DashboardPage {
  private readonly page: Page;
  private readonly products: Locator;
  private readonly cardTitle: Locator;
  private readonly cartLink: Locator;
  private readonly orders: Locator;
  private readonly dashboardLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLogo = page.locator("div[class='left mt-1'] p");
    this.products = page.locator(".card-body");
    this.cardTitle = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*=cart]");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  getDashboardLogo(): Locator {
    return this.dashboardLogo;
  }

  async verifyLoggedIn() {
    await expect(this.dashboardLogo).toBeAttached();
  }

  async isLoggedIn(): Promise <boolean> {
    return this.dashboardLogo.isVisible()
  }

  async searchProductAddCart(productName: string) {
    await this.cardTitle.first().waitFor();
    console.log(await this.cardTitle.first().textContent());
    console.log(
      "LOG: Product list titles is: ",
      await this.cardTitle.allTextContents()
    );
    console.log("LOG: Checkout counter equals to 0");
    await expect(this.cartLink).toContainText("");
    await this.cartLink.textContent();
    const count = await this.products.count();

    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToOrders() {
    await this.orders.click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }
}

export default DashboardPage;
