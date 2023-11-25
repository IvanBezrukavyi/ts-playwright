import { Locator, Page, expect } from "@playwright/test";

class CompleteOrderPage {
  readonly page: Page;
  readonly cvv: Locator;
  readonly cardName: Locator;
  readonly countryPlaceholder: Locator;
  readonly countryDropDown: Locator;
  readonly emailId: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmationText: Locator;
  readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cvv = page.locator('input[type="text"]').nth(1);
    this.cardName = page.locator('input[type="text"]').nth(2);
    this.countryPlaceholder = page.locator("[placeholder*='Country']");
    this.countryDropDown = page.locator(".ta-results");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.placeOrderButton = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  /**
   * Enters payment information including CVV code, card name, and country.
   * @param {string} cvv - CVV code.
   * @param {string} cardName - Name on the card.
   * @param {string} shortCountry - Short Country code to select.
   * @param {string} fullCountryName - Full Country name to select.
   */
  async enterPaymentInformation(
    cvv: string,
    cardName: string,
    shortCountry: string,
    fullCountryName: string
  ) {
    try {
      await this.cvv.fill(cvv);
      await this.cardName.fill(cardName);
      await this.countryPlaceholder.type(shortCountry, { delay: 100 });
      await this.countryDropDown.waitFor();
      const countryButtons = await this.countryDropDown.locator("button").all(); // Use .all() to get an array of elements
      for (const button of countryButtons) {
        const text = await button.textContent();
        console.log("Button text:", text); // Add this line for debugging

        if (text.trim() === fullCountryName) {
          console.log("Matching country found:", fullCountryName); // Add this line for debugging
          await button.click();
          break;
        }
      }
    } catch (error) {
      console.error("Error while entering payment information:", error);
    }
  }

  async getCvvInputValue() {
    return await this.cvv.inputValue();
  }

  async getCardNameInputValue() {
    return await this.cardName.inputValue();
  }

  /**
   * Verifies the displayed email ID.
   * @param {string} userName - Expected user name.
   */
  async VerifyEmailId(userName: string) {
    await expect(this.emailId).toHaveText(userName);
  }

  async SubmitAndGetOrderId() {
    try {
      await this.placeOrderButton.waitFor({ state: "visible" });
      await this.placeOrderButton.click();
      await expect(this.orderConfirmationText).toHaveText(
        " Thankyou for the order. "
      );
      return await this.orderId.textContent();
    } catch (error) {
      console.error(
        "Error while submitting order and getting order ID:",
        error
      );
      throw error; // Rethrow the error to handle it at a higher level if needed
    }
  }
}

export default CompleteOrderPage;
