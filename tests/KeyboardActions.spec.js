import {test, expect} from "@playwright/test";

test("Handling keyboard inputs", async({page})=>{
    await page.goto("https://gotranscript.com/text-compare");
    await page.locator('[name="text1"]').fill("Hello mera naam Anik hai!!!!!!!!!!!!!!!!!!!!!");

    await page.keyboard.press('Control+A');
    await page.waitForTimeout(1000);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Control+V");
    await page.waitForTimeout(3000);

})