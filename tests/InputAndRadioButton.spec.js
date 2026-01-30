import { test, expect } from '@playwright/test';
import { ssPath } from './path.js';

test('InputTest', async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/login");
    await expect(page.locator("#username")).toBeVisible();
    await page.locator("#username").scrollIntoViewIfNeeded();
    await expect.soft(page.locator("#username")).toBeInViewport();
    await expect(page.locator("#username")).toBeEmpty();
    await expect(page.locator("#username")).toBeEditable();
    await expect(page.locator("#username")).toBeEnabled();
    await page.fill("#username", "Hello1234");
    await page.waitForTimeout(5000);
    await page.close();
});

test('TestRadioButtons', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/radio-buttons');

  const blue = page.locator('#blue');
  const red = page.locator('#red');                 // or page.locator('input[value="red"]')
  const yellow = page.locator('#yellow');

  // Soft assertion for a non-critical check
  await expect.soft(blue).toBeVisible();

  // Optional in most cases; Playwright auto-scrolls for actions.
  await red.scrollIntoViewIfNeeded();

  await red.check();

  // Web-first, retried assertions (best practice)
  await expect(red).toBeChecked();
  await expect(yellow).not.toBeChecked();

  // If you still want to demonstrate imperative checks (not needed, but shown correctly):
  const isRedChecked = await red.isChecked();
  expect(isRedChecked).toBeTruthy();
  page.close();
});



test("Testcheckboxes", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const checkboxes = ["//input[@id='checkBoxOption1']", "//input[@id='checkBoxOption2']", "//input[@id='checkBoxOption3']"];
    for(const checkbox of checkboxes) {
        await expect(page.locator(checkbox)).toBeVisible();
        await page.locator(checkbox).check();
    }

    for(const check of checkboxes)
    {
        await expect(page.locator(check)).toBeVisible();
        await expect(page.locator(check)).toBeChecked();
        await page.locator(check).uncheck();
    }
    page.close();
});

