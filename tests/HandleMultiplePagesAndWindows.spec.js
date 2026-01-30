import {test, expect, chromium} from "@playwright/test";

test("test1", async({})=>{
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();

    const page = await browserContext.newPage();
    const page2 = await browserContext.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle("OrangeHRM");
    await page2.goto("https://www.orangehrm.com/");
    await expect(page2).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM");

    // print the number of pages in a context
    const pages = await browserContext.pages();
    console.log("Number of pages:" + pages.length);

    await browser.close();

    

});


test("test2", async({})=>{
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle("OrangeHRM");
    // Click on LinkedIn icon which opens a new window
    const pagePromise = browserContext.waitForEvent('page');
    await page.locator("xpath=//a[@href='https://www.linkedin.com/company/orangehrm/mycompany/']").click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log("New Page Title: " + await newPage.title());
    console.log("New Page URL: " + newPage.url());
});