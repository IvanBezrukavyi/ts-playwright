import { Locator, Page } from "@playwright/test";

class CartPage {
    readonly page: Page;
    readonly cvv: Locator;
    readonly cardName: Locator;


    constructor(page: Page){
        this.page = page;
        this.cvv = page.locator("div:has-text('CVV Code ')");
        this.cardName = page.locator("(//input[@type='text'])[3]");
        

    }
    async validDashboardData(cvv: string, cardName: string) {
        await this.cvv.fill(cvv);
        await this.cardName.fill(cardName);
        await this.page.waitForLoadState("domcontentloaded");
      }
}

export default CartPage;