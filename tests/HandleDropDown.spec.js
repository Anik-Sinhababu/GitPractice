import {test, expect} from "@playwright/test";

test("Test Dropdown: ", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    // using visible text

    await page.locator("#country").selectOption({label: "United States"});
    await page.locator("#country").selectOption("India");
    
    // using Value
    await page.locator("#country").selectOption({value: "uk"});
    
    //using Index
    await page.locator("#country").selectOption({index: 9});

    //Select By Text
    await page.selectOption("#country", "India");

    //Assertions
    // Check no of options in dropdown
    const options = await page.locator("#country option");
    await expect(options).toHaveCount(10);

    // Check no of options using $$
    const  options2 = await page.$$("#country option");
    await expect(options2.length).toBe(10);

    //Check prresence of element in the dropdown Approach-1
    const content = await page.locator("#country").textContent();
    await expect(content.includes("India")).toBeTruthy();

    //Check presence of element in the dropdown Approach-2
    let status = false;
    const options3 = await page.$$("#country option");
    for(const op of options3)
    {
        const value = await op.textContent();
        if(value.includes("France"))
        {
            status = true;
        }
    }
    await expect(status).toBeTruthy();
});