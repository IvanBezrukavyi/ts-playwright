// loginPage.ts

import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly signInButton: Locator;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;

    constructor(private readonly page: Page) {
        this.signInButton = page.locator("#login");
        this.usernameField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }    

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        try {
            await this.usernameField.fill(username);
            await this.passwordField.fill(password);
            await this.signInButton.click();
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
}

export default LoginPage;
