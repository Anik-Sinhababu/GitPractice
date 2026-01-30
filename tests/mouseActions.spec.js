import { test, expect } from "@playwright/test";


test("Mouse Actions Hover, Click, Double Click, drage and drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // Perform hover action using the hover method
    await page.hover(".dropbtn");
    await page.waitForTimeout(3000);



    //Perform the double click operation

    const btn = page.locator('button:has-text("Copy Text")');
    const field1 = page.locator("#field1");
    const field2 = page.locator("#field2");
    // Perform the double-click
    await btn.dblclick();
    // Assert field2 copied the value from field1
    await expect(field2).toHaveValue(await field1.inputValue());


    //Perform drag and drop 
    const from = await page.locator("#draggable");
    const to = await page.locator("#droppable");

    // await from.hover();
    // await page.mouse.down();

    // await to.hover();
    // await page.mouse.up();

    await page.dragAndDrop("#draggable", "#droppable");

    await expect(page.locator("#droppable p")).toHaveText("Dropped!");
    await page.waitForTimeout(3000);

})