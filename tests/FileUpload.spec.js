import {test, expect} from "@playwright/test";

test("File upload handling and asserting", async({page})=>{
    await page.goto("https://practice.expandtesting.com/upload");
    await page.locator('#fileInput').scrollIntoViewIfNeeded();
    await page.locator('#fileInput').click();
    await page.locator('[data-testid="file-input"]').setInputFiles("tests/student.json");
    await expect(page.locator('#fileInput')).toHaveValue(/student\.json$/);
    await page.waitForTimeout(3000);
})

// upload multiple files
test("Upload multiple files", async({page})=>{
    const filepath = ["student.json", "4AfterLogin.png"];
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator("#filesToUpload").setInputFiles(["tests/"+filepath[0], "tests/"+filepath[1]]);
    await page.waitForTimeout(4000);
    const capturedFiles = page.locator("#fileList li");
    for(let i=0; i<filepath.length; i++)
    {
        await expect.soft(page.locator("#fileList li").nth(i)).toHaveText(filepath[i]);
    }


    //Remove all the files 

    await page.locator("#filesToUpload").setInputFiles([]);
    await page.waitForTimeout(6000);

})