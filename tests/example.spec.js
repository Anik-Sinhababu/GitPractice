const {test, expect} = require('@playwright/test');
const { Console } = require('console');

test('basic test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await expect(page).toHaveURL('https://demoblaze.com/');
  const title = await page.title();
  console.log(title);
  await expect(page).toHaveTitle(/STORE/i);
  // Alternatively to check title
  // await expect(title).toBe('STORE');
  await page.close();
});
