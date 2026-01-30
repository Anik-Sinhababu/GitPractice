import {test, expect} from "@playwright/test";

test("MultiSelect DropDown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#colors").scrollIntoViewIfNeeded();

    await page.selectOption("#colors", ["Red", "Blue", "Green"]);


    //Assertions:
    // 1) Check number of options
    const options = await page.locator("#colors option").count();
    expect(page.locator("#colors option")).toHaveCount(options);
    console.log(options);

                              //OR
    
    const locators = await page.$$("#colors option");
    expect(locators.length).toBe(7);

    //2) Checking availability of an option 
    const contents = await page.locator("#colors").textContent();
    expect.soft(contents.includes("Red")).toBeTruthy();
    console.log(contents);

    //3) Negative assertion 
    expect.soft(contents.includes("Black")).toBeFalsy();


    await page.waitForTimeout(5000);



})