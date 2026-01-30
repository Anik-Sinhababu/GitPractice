import { test, expect } from "@playwright/test";

test("Handling Static Web-Table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("//h2[text()='Static Web Table']").scrollIntoViewIfNeeded();
    const table = page.locator("table[name = 'BookTable']");
    const columnHeading = page.locator("table[name = 'BookTable'] tr th");
    const tableRow = page.locator("table[name = 'BookTable'] tr");


    // 1st approach, where the process looks complicated as we need to first take the count
    // then iterate to the limit and get the text conent, which works obviously
    const columnCount = await columnHeading.count();
    const rowCount = await tableRow.count();

    for (let i = 0; i < columnCount; i++) {
        console.log(await columnHeading.nth(i).textContent());
    }

    // Else it is the recommended apprach 
    for (const text of await columnHeading.allTextContents()) {
        console.log(text);
    }

    // Print all the data of the table and check accordingly
    const tableData = await page.$$("table[name = 'BookTable'] tr td");
    let i=0;
    for(const data of tableData)
    {

        const text = (await data.textContent()).trim() + " ";
        process.stdout.write(text);
        i++;
        if(i == columnCount)
        {
            console.log("");
            i=0;
        }
    }


    //Assertions on the table row and column count 
    await expect.soft(rowCount).toBe(7);
    await expect.soft(columnCount).toBe(4);

    //Asserting the column headers of the table
    const headings = ["BookName", "Author", "Subject", "Price"];
    for (let i = 0; i < columnCount; i++) {
         expect(await columnHeading.nth(i).textContent()).toBe(headings[i]);
    }


    await page.waitForTimeout(3000);

})