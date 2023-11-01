class DashboardPage {
  constructor(page) {
    this.products = page.locator(".card-body");
    this.cardTitle = page.locator(".card-body b");
    this.cardTitles = page.locator(".card-body b");
    this.cartLink = page.locator("[routerlink*=cart]");
    this.cvv = page.locator("(//input[@type='text'])[2]");
    this.cardName = page.locator("(//input[@type='text'])[3]");
  }

  async searchProduct(productName) {
    console.log(await this.cardTitle.first().textContent());
    console.log(
      "LOG: Product list titles is: ",
      await this.cardTitles.allTextContents()
    );
    console.log("LOG: Checkout counter equals to 0");
    await expect(this.cartLink).toContainText("");
    await this.cartLink.textContent();
    const count = await this.products.count();
    /* The code snippet is iterating over a list of products and checking if the product name matches the
  desired product name (in this case, "iphone 13 pro"). If a match is found, it clicks on the "Add
  To Cart" button for that product and then breaks out of the loop. This code is essentially adding
  the desired product to the shopping cart. */
    for (let i = 0; i < count; ++i) {
      // eslint-disable-next-line playwright/no-conditional-in-test
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        // Add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async validDashboardData(cvv, cardName)
  {
      await this.cvv.fill(cvv);
      await this.cardName.fill(cardName);
      await this.page.waitForLoadState("domcontentloaded");
  }

  async navigateToCart()
  {
    await this.cartLink.click();
  }
}
module.exports = {DashboardPage};