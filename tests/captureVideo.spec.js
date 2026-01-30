import {test, expect} from "@playwright/test";

test("Capture video of the test if it fails (PASS SCENARIO)", async({page})=>{
    await page.goto("https://www.opencart.com/index.php?route=cms/demo");
    await page.locator("(//a[text()='Marketplace'])[1]").click();
    const time = Date.now();
    await page.locator('(//div[@class="col-md-4"])[30]').screenshot({path: `screenshots/${time}/captureVideo1.png`});
    await expect(page.locator('(//div[@class="col-md-4"])[30]//div//p//a')).toHaveText("Event Manager for Opencart Developers");

});


test("Capture video of the test if it fails (FAIL SCENARIO)", async({page})=>{
    test.only();
    await page.goto("https://www.opencart.com/index.php?route=cms/demo");
    await page.locator("(//a[text()='Marketplace'])[1]").click();
    const time = Date.now();
    await page.locator('(//div[@class="col-md-4"])[26]').screenshot({path: `screenshots/${time}/captureVideo1.png`});
    await page.locator('(//div[@class="col-md-4"])[26]//div//p//a').click();
    await expect(page.locator("//div[text()='$40.00']")).toHaveText("$39.00");
});