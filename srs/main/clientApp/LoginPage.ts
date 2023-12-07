import { type Locator, type Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly signInButton: Locator
    readonly userName: Locator
    readonly userPass: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#login')
        this.userName = page.locator('#userEmail')
        this.userPass = page.locator('#userPassword')
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client')
        expect(await this.page.title(), 'Login page is open').toContain("Let's Shop")
    }

    async validLogin(userName: string, userPass: string) {
        await expect(this.userName, "Email field doesn't contain any data").toBeEmpty()
        await expect(this.userName, 'Default placeholder is displayed').toHaveAttribute(
            'placeholder',
            'email@example.com'
        )
        await expect(this.userPass, "Password field doesn't contain any data").toBeEmpty()
        await expect(this.userPass, 'Default placeholder is displayed').toHaveAttribute(
            'placeholder',
            'enter your passsword'
        )
        await expect(this.signInButton, 'Login button is active').toBeEnabled()
        try {
            await this.userName.fill(userName)
            await this.userPass.fill(userPass)
            await this.signInButton.click()
        } catch (error) {
            console.error('Error During LOGIN:', error)
        }
    }
}

export default LoginPage
