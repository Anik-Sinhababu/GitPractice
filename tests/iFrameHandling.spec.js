import {test, expect} from "@playwright/test";

test("Handling iFrames or Frames using url; or name", async ({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");


    //APPROACH-! USING URL OR NAME
    //SYNTAX:- const frame1 = await page.frame({url: "url of the frame"})
    //SYNTAX:- const frame2 = await page.frame({name: "name of the iframe"})
                                //or
                              //await page.frame("name of the iframe")

    const allFrames = await page.frames();
    let i=1;
    console.log("The total no of iFrames are: " + allFrames.length);
    for(const frame of allFrames)
    {
        console.log(frame.url());
        if(frame.url().includes(`frame_${i}`))
        {
            const frame1 = await page.frame({url: frame.url()});
            //const frame2 = await page.frame({name: ""});
            await frame1.fill(`//input[@name="mytext${i}"]`, "Hello How are you!");
            await expect(frame1.locator(`//input[@name="mytext${i++}"]`)).toHaveValue("Hello How are you!")
        }
    }
    await page.waitForTimeout(5000);
});


test("Handling iFrame using the frame locator", async({page})=>{
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frameLocator = await page.frameLocator('//frame[@src="frame_2.html"]');
    await frameLocator.locator("//input[@name='mytext2']").fill("My name is Anik");
    
    await page.waitForTimeout(5000);
    
    
})


