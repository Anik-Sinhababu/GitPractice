import {test, expect} from "@playwright/test";

test("Locating Multiple Elements", async ({page})=>{
    await page.goto("https://demoblaze.com/");
    const elements = await page.$$('');
    for(let ele of elements)
    {
        const text = await ele.textContent();
        console.log("The product is: " + text);
    }

})