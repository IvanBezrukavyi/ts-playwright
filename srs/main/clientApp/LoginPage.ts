import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly userName: Locator;
  readonly userPass: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.userPass = page.locator("#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(userName: string, userPass: string) {
    try {
      await this.userName.fill(userName);
      await this.userPass.fill(userPass);
      await this.signInButton.click();
    } catch (error) {
      console.error("Error During LOGIN:", error);
    }
  }
}

export default LoginPage;