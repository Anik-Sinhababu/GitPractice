import {test, expect} from "@playwright/test";

test("Handling Dynamic and Pagination WebPages and Interacting with them", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("//h2[text()='Pagination Web Table']").scrollIntoViewIfNeeded();
    const table = page.locator("table[id = 'ProductTable']");
    const columnHeading = page.locator("table[id = 'productTable'] tr th");
    const tableRow = page.locator("table[id = 'productTable'] tr");


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
    const tableData = await page.$$("table[id = 'productTable'] tr td");
    let i=0;
    for(const data of tableData)
    {
        const text = (await data.textContent());
        process.stdout.write(text);
        i++;
        if(i == columnCount)
        {
            console.log("");
            i=0;
        }
    }



    // Select a specific checkbox using the filter method
    const filteredRow = tableRow.filter({
        has: page.locator("td"),
        hasText: "Smartwatch"
    })
    await filteredRow.locator("input").check();



    // Calling select Product method to select a specific checkbox in a table
    await selectProduct(page, tableRow, "Tablet");
    await selectProduct(page, tableRow, "Wireless Earbuds");


    //Pagination Locator
    const pagination = await page.$$("ul[class='pagination'] li a");
    await printValuesOfTableFromDifferentPages(page, table, pagination);


    await page.waitForTimeout(1000);

});


// a function to select a specific option, with a function called "selectProduct(page, rows, rowName)"
// page: reference of page to the main test method
// rows: reference to the rows locator, targetting ech row in the table
// rowName: to target a specific row for the click operation
async function selectProduct(page, rows, rowName)
{
    const filteredRow = await rows.filter({
        has: page.locator("td"),
        hasText: rowName
    });
    await filteredRow.locator("input").check();
}


// (PAGINATION) PRINT ALL THE DATA OF THE TABLE OF ALL THE PAGES 

// Now we have already printed the table data of the table
// Now at once its not possible to capture all the data of the table of different pages
// The function below will help in printing all the values
// Approach: 
//  1. pick a locator which points to all the pages
//  2. Then one by one click the page and print the values accordingly from the table
async function printValuesOfTableFromDifferentPages(page, table, pagination)
{
    const columnCount = await table.locator("th").count();
    for(const pageNum of pagination )
    {
        let i=0;
        await pageNum.click();
        const tableData = await page.$$("table[id = 'productTable'] tr td");
        for(const data of tableData)
        {
            console.log(await data.textContent());
            i++;
            if(i == columnCount)
            {
                i = 0;
                console.log("");
            }
        }

    }
}
