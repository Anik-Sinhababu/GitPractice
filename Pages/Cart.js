
// Pages/Cart.js
export class CartPageAction {
    constructor(page) {
        this.page = page;
        this.cartList = "//tbody[@id='tbodyid']";
        this.cartTable = "//table"
        this.placeOrderBtn = "//button[text()='Place Order']";
        this.nameInp = "#name";
        this.countryInp = "#country";
        this.cityInp = "#city";
        this.creditCardInp = "#card";
        this.monthInp = "#month";
        this.yearInp = "#year";
        this.purchaseBtn = "//button[text()='Purchase']";
        this.confirmationMsg = ".sweet-alert h2";
        this.orderDetails = ".sweet-alert p";
        this.cartValue = "#totalp";
    }

    async placeOrder(name, country, city, creditCard, month, year) {
        await this.page.waitForSelector(this.cartList);
        await this.page.locator(this.placeOrderBtn).click();

        await this.page.locator(this.nameInp).fill(name);
        await this.page.locator(this.countryInp).fill(country);
        await this.page.locator(this.cityInp).fill(city);
        await this.page.locator(this.creditCardInp).fill(creditCard);
        await this.page.locator(this.monthInp).fill(month);
        await this.page.locator(this.yearInp).fill(year);

        await this.page.locator(this.purchaseBtn).click();
    }

    async getPurchaseConfirmation() {
        // return the confirmation message text and the details of the order in a list
        const confirmationText = await this.page.locator(this.confirmationMsg).textContent();
        const orderDetails = await this.page.locator(this.orderDetails).textContent();
        return [confirmationText, orderDetails];
    }

    //Check for any previous items in the cart and get the total sum of prices


    async previousCartValue() {
        // 1. Wait for cart skeleton (DOM exists, not necessarily visible)
        await this.page.locator(this.cartList).waitFor({ state: "attached" });

        // 2. Try to detect at least one cart row — with a SHORT timeout
        let hasProducts = false;
        try {
            await this.page
                .locator(`${this.cartList}//tr`)
                .first()
                .waitFor({ state: "visible", timeout: 5000 });
            hasProducts = true;
        } catch (e) {
            // No rows → empty cart
        }

        // 3. If empty → return 0 safely
        if (!hasProducts) {
            return 0;
        }

        // 4. Else → extract total price
        const cartValueText = await this.page.locator(this.cartValue).textContent();
        return cartValueText.trim() === "" ? 0 : parseFloat(cartValueText);
    }

}