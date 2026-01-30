import * as pw from "@playwright/test";

// Locators in Playwright
pw.test('Locators', async({page})=>{
    // Go to https://demoblaze.com/
    await page.goto("https://demoblaze.com/");
    await page.screenshot({ path: '1Homepage.png' });

    // Locator type: attribute, id, xpath, css
    // Click on Login button
    await page.locator('id=login2').click();
    await page.locator('id=login2').screenshot({ path: '2AfterLoginClick.png' });

    // Locator type: xpath
    await pw.expect(page.locator("//div[@id='logInModal']")).toBeInViewport();

    // Fill username and password
    // using locator type: id, xpath
    await page.locator('#loginusername').fill("hello123400998877");
    await page.locator('//input[@id="loginpassword"]').fill("hello1234");
    await page.screenshot({ path: '3AfterFillingLoginDetails.png' });

    // Click on Login button
    //using locator type: xpath
    await page.click("//button[normalize-space()='Log in']");

    // Verify user is logged in
    // using locator type: attribute
    await pw.expect(page.locator('id=nameofuser')).toHaveText(`Welcome hello123400998877`);
    await page.locator('id=nameofuser').screenshot({ path: '4AfterLogin.png' });
    await page.close();
});
