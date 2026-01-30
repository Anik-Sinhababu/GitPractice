
// Pages/Home.js
export class HomePageAction {
    constructor(page) {
        this.sum = 0;
        this.page = page;
        this.productList = '//a[@class="hrefch"]';
        this.addToCartBtn = "//a[text()='Add to cart']";
        this.categoryList = "#itemc";
        this.priceLoc = "#tbodyid h5";

        // Nav Locators
        this.navHome = "(//a[@href='index.html'])[2]";
        this.navContact = "//a[text()='Contact']";
        this.navAboutUs = "//a[text()='About us']";
        this.navCart = "//a[text()='Cart']";
        this.navLogin = "//a[text()='Log in']";
        this.navSignUp = "//a[text()='Sign up']";

        // Contact Us Locators
        this.contactNameInp = "#recipient-name";
        this.contactEmailInp = "#recipient-email";
        this.contactMessageInp = "#message-text";
        this.contactSendBtn = "//button[text()='Send message']";
    }

    async addProductToCartFromRecommendation(productName) {
        const count = await this.page.locator(this.productList).count();
        console.log("Total Products: " + count);

        for (let i = 0; i < count; i++) {
            const text = await this.page.locator(this.productList).nth(i).textContent();
            if (text === productName) {
                console.log(text);
                await this.getSumOfProductsAddedToCart(i);

                // Open product detail
                await this.page.locator(this.productList).nth(i).click();

                // Prepare to handle the *next* dialog BEFORE clicking Add to cart
                const dialogPromise = this.page.waitForEvent('dialog');

                await this.page.locator(this.addToCartBtn).click();

                const dialog = await dialogPromise;
                if (dialog.message() === "Product added.") {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }

                // Go back to Home and ensure list is loaded
                await this.page.locator(this.navHome).click();
                await this.page.waitForSelector(this.productList);
                break;
            }
        }
    }

    async addProductToCartFromCategories(categoryName, productName) {
        const categoryCount = await this.page.locator(this.categoryList).count();
        console.log("Total Categories: " + categoryCount);

        for (let j = 0; j < categoryCount; j++) {
            const categoryText = await this.page.locator(this.categoryList).nth(j).textContent();
            if (categoryText === categoryName) {
                console.log("Category: " + categoryText);
                await this.page.locator(this.categoryList).nth(j).click();
                break;
            }
        }

        const products = this.page.locator(this.productList);
        const productCount = await products.count();

        for (let i = 0; i < productCount; i++) {
            const text = await products.nth(i).textContent();
            if (text === productName) {
                console.log(text);
                await this.getSumOfProductsAddedToCart(i);

                await products.nth(i).click();

                // Prepare for dialog BEFORE the click that triggers it
                const dialogPromise = this.page.waitForEvent('dialog');

                await this.page.locator(this.addToCartBtn).click();

                const dialog = await dialogPromise;
                if (dialog.message() === "Product added.") {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }

                await this.page.locator(this.navHome).click();
                await this.page.waitForSelector(this.productList);
                break;
            }
        }
    }

    async constactUsFormSubmission(name, email, message) {
        await this.page.locator(this.navContact).click();
        await this.page.locator(this.contactNameInp).fill(name);
        await this.page.locator(this.contactEmailInp).fill(email);
        await this.page.locator(this.contactMessageInp).fill(message);

        // One-shot dialog handling for the send
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.page.locator(this.contactSendBtn).click();
        const dialog = await dialogPromise;
        await dialog.accept();
    }

    //Function to get the sum of prices of all products added to the cart from Home Page
    async getSumOfProductsAddedToCart(index) {
        const priceText = await this.page.locator(this.priceLoc).nth(index).textContent();
        const price = parseFloat(priceText.replace("$", ""));
        this.sum += price;
    }

}