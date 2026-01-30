
import { test, expect } from "@playwright/test";

test("Date Picker with format of input", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const datePicker = page.locator("#datepicker");
  await datePicker.click();
  await datePicker.pressSequentially("10/05/2000");
  await expect(datePicker).toHaveValue("10/05/2000");
  await page.waitForTimeout(4000);
});

test("Date Picker with selecting date", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const datePicker = page.locator("#txtDate");
  await datePicker.click();
  await page.waitForSelector("//div[@id='ui-datepicker-div']");
  const year = "2016";
  const month = "Oct";
  const day = "5";
  const yearDp = page.locator("//select[@class='ui-datepicker-year']");
  const monthDp = page.locator("//select[@class='ui-datepicker-month']");
  const dayLoc = page.locator("//td[@data-handler='selectDay']/a");
  await selectDate(year, month, day, yearDp, monthDp, dayLoc, datePicker);
  await page.waitForTimeout(4000);
  await selectDate("2018", "Nov", "10", yearDp, monthDp, dayLoc, datePicker);
  await page.waitForTimeout(4000);
});

async function selectDate(year, month, day, yeardp, monthdp, dayloc, datePicker)
{
    await datePicker.click();
    await yeardp.selectOption({value: year});
    await monthdp.selectOption({label: month});
    for(let i=0; i<await dayloc.count(); i++)
    {
        const dayText = await dayloc.nth(i).textContent();
        if(dayText === day)
        {
            await dayloc.nth(i).click();
            break;
        }
    }
}
