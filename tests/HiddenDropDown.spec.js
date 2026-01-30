import {test, expect} from "@playwright/test";

test("Hidden option Drop Down Practice: ", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", {name: "Login"}).click();
    await page.getByRole("link", {name: "PIM"}).click();
    await page.click('(//div[@class="oxd-select-text--after"])[3]');
    await page.waitForSelector('//div[@class="oxd-select-dropdown --positon-bottom"]/div/span');
    const allDropDownOprions = await page.$$('//div[@class="oxd-select-dropdown --positon-bottom"]/div/span');
    for(let option of allDropDownOprions)
    {
        const text = await option.textContent();
        console.log(text);
        if(text.includes("Financial Analyst"))
        {
            await option.screenshot({path: "screenshots/hiddenDropDown.png"});
            await option.click();
        }
    }
    console.log("Length of all the options are: " + allDropDownOprions.length);
    await expect(allDropDownOprions.length).toBe(34);
    await page.waitForTimeout(5000);
});