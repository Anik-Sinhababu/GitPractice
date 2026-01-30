
// tests/pageObjectModel.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/login";
import { HomePageAction } from "../Pages/Home";
import { CartPageAction } from "../Pages/Cart";



/**
 * This test verifies the complete purchase workflow on the DemoBlaze application.
 *
 * Flow covered:
 * 1. Logs in with a valid user account.
 * 2. Navigates to the cart and checks whether any previous items exist
 *    (handles both empty and non‑empty cart scenarios).
 * 3. Returns to the home page and adds products from:
 *      - The recommended section
 *      - Specific product categories (Laptops, Monitors)
 * 4. Tracks the total cost of all products added during this session.
 * 5. Navigates to the cart again, fills the purchase form, and places the order.
 * 6. Validates the confirmation message and verifies the amount charged
 *    matches the expected total (previous cart items + newly added items).
 *
 * This test ensures the cart logic, price calculation, add‑to‑cart actions,
 * and checkout flow all work together end‑to‑end.
 */

test("should add products from home and categories and place an order", async ({ page }) => {

    // Page definitions
    // Login
    const loginPage = new LoginPage(page, expect);
    // Cart
    const cartPage = new CartPageAction(page);
    // Home
    const homePage = new HomePageAction(page);


    // Login Action
    await loginPage.gotoLoginPage();
    await loginPage.loginAction("hello123400998877", "hello1234");
    await expect(page.locator(loginPage.verifyPage)).toHaveText("Welcome hello123400998877");


    //Check if the cart had any previous items
    await page.locator(homePage.navCart).click();
    const previousCartValue = await cartPage.previousCartValue();
    console.log("Previous Cart Value: " + previousCartValue);
    await page.locator(homePage.navHome).click();


    // Add Products from Recommendation
    await page.waitForSelector(homePage.productList);
    await homePage.addProductToCartFromRecommendation("Samsung galaxy s6");
    await homePage.addProductToCartFromRecommendation("Nokia lumia 1520");


    // Add Product from Category
    await homePage.addProductToCartFromCategories("Laptops", "Sony vaio i5");
    await homePage.addProductToCartFromCategories("Monitors", "Apple monitor 24");


    // Place order in the cart
    await page.locator(homePage.navCart).click();
    await cartPage.placeOrder("Anik", "USA", "New York", "1234 5678 9012 3456", "12", "2025");
    const [confirmationMsg, orderDetails] = await cartPage.getPurchaseConfirmation();
    expect(confirmationMsg).toBe("Thank you for your purchase!");
    expect(orderDetails).toContain(`Amount: ${previousCartValue + homePage.sum}`);
    console.log("Order Details: ", orderDetails);
});

