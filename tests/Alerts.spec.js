import {test, expect} from "@playwright/test";

test("Test and Handle Alert Boxes", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on("dialog", async (dialog)=>{
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("I am an alert box!");
        await dialog.accept();
    });

    await page.click("//button[@id='alertBtn']");
    await page.waitForTimeout(5000);
});


test("Test and Handle Confirmation Alert Boxes", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on("dialog", async(dialog)=>{
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain("Press a button!");
        await dialog.dismiss();
                //or
        //await dialog.accept();
    });
    await page.click("//button[@id='confirmBtn']");
    await page.waitForTimeout(5000);
});

test("Test and Handle Prompt Alert Boxes", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on("dialog", async(dialog)=>{
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain("Please enter your name:");
        // await dialog.dismiss();
        //         //or
        await dialog.accept("Anik");
    });
    await page.click("//button[@id='promptBtn']");
    await page.locator('//p[@id="demo"]').screenshot({path: "screenshots/promptAlert.png"});
    await page.waitForTimeout(5000);
});


