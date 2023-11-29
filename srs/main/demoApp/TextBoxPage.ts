import { Locator, Page } from "playwright";

class TextBoxPage {
  readonly page: Page;
  readonly elementsMenu: Locator;
  readonly textBoxMenu: Locator;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly currentAddress: Locator;
  readonly permanentAddress: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsMenu = page.locator("h5:has-text('Elements')");
    this.textBoxMenu = page.locator("span:has-text('Text Box')");
    this.fullName = page.locator("#userName");
    this.email = page.locator("#userEmail");
    this.currentAddress = page.locator("#currentAddress");
    this.permanentAddress = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
  }

  async goTo() {
    await this.page.goto('');
  }

  async selectElementsMenu() {
    await this.elementsMenu.click();
  }

  async selectTextBoxMenu() {
    await this.textBoxMenu.click();
  }

  async fillInputsByValues(
    fullName: string,
    email: string,
    currentAddress: string,
    permanentAddress: string
  ) {
    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.currentAddress.fill(currentAddress);
    await this.permanentAddress.fill(permanentAddress);
  }

  async submitTextBoxForm() {
    await this.submitButton.click();
  }
}
export default TextBoxPage;
