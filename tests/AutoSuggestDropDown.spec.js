import {test, expect} from "@playwright/test";

test("Handle Auto Suggestion in dropdown", async ({page})=>{
    
    await page.goto("https://www.redbus.in/");

    const fromDropDownLoc = page.locator('//input[@id="srcinput"]');
    await fromDropDownLoc.fill("Delhi");

    await page.waitForSelector('//div[@class="listItem___9a15c0 lineLength2___c5b70b suggestion-item hoverHighlight___dda210 "]/div/div/div[@class="listHeader___90a8b7"]');
    await page.screenshot({path: "screenshots/autosuggestion1.png"});
    const allFromCitySuggestions = await page.$$('//div[@class="listItem___9a15c0 lineLength2___c5b70b suggestion-item hoverHighlight___dda210 "]/div/div/div[@class="listHeader___90a8b7"]');
    let i = 0;
    for(let suggestion of allFromCitySuggestions)
    {
        const text = await suggestion.textContent();
        if(text.includes("Majnu Ka Tilla, Delhi"))
        {
            await suggestion.click();
        }
        console.log(++i + ". " + text);
    }

    await page.screenshot({path: "screenshots/autosuggestion2.png"});
    await page.waitForTimeout(2000);

});