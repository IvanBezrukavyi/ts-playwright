import { Locator, Page, expect } from "@playwright/test";

class DashboardPage {
  readonly page: Page;
  readonly products: Locator;
  readonly cardTitle: Locator;
  readonly cartLink: Locator;
  readonly orders: Locator;
  readonly dashboardLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLogo = page.locator("div[class='left mt-1'] p");
    this.products = page.locator(".card-body");
    this.cardTitle = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*=cart]");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async isLoggedIn() {
    await expect(this.dashboardLogo).toBeAttached();
    await this.dashboardLogo;
    return !!this.dashboardLogo;
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
    await expect (this.orders, "Orders link is visible").toBeVisible();
    await expect (this.orders, "Orders link is active").toBeEnabled();
    await this.orders.click();
  }

  async navigateToCart() {
    await expect (this.cartLink, "Cart link is visible").toBeVisible();
    await expect (this.cartLink, "Cart link is active").toBeEnabled();
    await this.cartLink.click();
  }
}

export default DashboardPage;
