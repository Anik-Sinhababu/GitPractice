export class LoginPage{
    
    constructor(page, expect)
    {
        this.page = page;
        this.expect = expect;
        this.loginLink = "#login2";
        this.userNameInp = "#loginusername";
        this.passwordInp = "#loginpassword";
        this.loginPageclose = "(//button[text()='Close'])[3]"
        this.loginButton = "//button[@onclick='logIn()']";
        this.verifyPage = "#nameofuser";

    }

    async gotoLoginPage()
    {
        await this.page.goto("https://demoblaze.com/");
    }

    async loginAction(username, password)
    {
        await this.page.locator(this.loginLink).click();
        await this.page.locator(this.userNameInp).fill(username);
        await this.page.locator(this.passwordInp).click();
        await this.page.locator(this.passwordInp).fill(password);
        await this.page.locator(this.loginButton).click();
        await this.page.waitForSelector(this.verifyPage);
    }
}