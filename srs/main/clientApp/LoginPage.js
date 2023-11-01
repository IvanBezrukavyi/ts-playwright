class LoginPage {

    constructor(page)
    {
        this.loginPage = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.userPass = page.locator("#userPassword");

    }

    async goTo()
    {
        await this.loginPage.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, userpass)
    {
        await this.userName.fill(username);
        await this.userPass.fill(userpass);
        await this.signInButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }
}
module.exports = {LoginPage};