import {test, expect} from "@playwright/test";

test("Capture ScreenShots", async({page})=>{
    await page.goto("https://demoblaze.com/");
    const time = Date.now().toLocaleString();
    await page.screenshot({path: `screenshots/normalScreenShot${time}.png`});
});

test("Capture Full Page ScreenShots", async({page})=>{
    await page.goto("https://demoblaze.com/");
    const time = Date.now().toLocaleString();
    await page.waitForSelector("#tbodyid");
    await page.screenshot({path: `screenshots/FullPageScreenShot${time}.png`, fullPage: true});
});

test("Capture Element ScreenShots", async({page})=>{
    await page.goto("https://demoblaze.com/");
    const time = Date.now().toLocaleString();
});



