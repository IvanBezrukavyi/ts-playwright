import { Locator, Page, expect } from "@playwright/test";

class DashboardPage {
  readonly page: Page;
  readonly products: Locator;
  readonly cardTitle: Locator;
  readonly cartLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cardTitle = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*=cart]");

  }

  async searchProductAddCart(productName: string) {
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

  async navigateToCart() {
    await this.cartLink.click();
  }
}

export default DashboardPage;
