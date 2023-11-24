import { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

class CartPage {
  readonly page: Page;
  readonly cartProducts: Locator;
  readonly productsText: Locator;
  readonly cart: Locator;
  readonly orders: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
  }

  async isOnCartPage() {
    const currentUrl = await this.page.url();
    const expectedCartUrl = 'https://rahulshettyacademy.com/client/dashboard/cart'; 
    return currentUrl === expectedCartUrl;
  }

  async VerifyProductIsDisplayed(productName: string) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName: string) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}

export default CartPage;
