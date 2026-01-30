import {test, expect} from '@playwright/test';
import {ssPath} from './path.js';

test('AssertionsTest', async ({page}) => {
  await page.goto('https://www.browserstack.com/');
  // Basic Assertions
  // URL assertion: Here we are asserting that the current page URL is as expected.
  await expect(page).toHaveURL("https://www.browserstack.com/");

    // Title assertion: Here we are asserting that the page title is as expected.
  await expect(page).toHaveTitle("Most Reliable App & Cross Browser Testing Platform | BrowserStack");

    // Element Assertions: Here we are asserting the visibility and state of specific elements on the page.
  await expect(page.getByAltText("BrowserStack Logo").nth(0)).toBeVisible();
  await page.getByAltText("BrowserStack Logo").nth(0).screenshot({path: `${ssPath}logo.png`});

    // Check if "Sign Up" button is enabled
  await expect(page.getByRole("link", {name: "Get started free"}).nth(0)).toBeEnabled();
  await page.getByRole("link", {name: "Get started free"}).nth(0).screenshot({path: `${ssPath}getStartedFreeBtn.png`});

  // Switch to Pricing page
  await page.getByRole("link", {name: "Pricing"}).nth(0).click();
  
  // Wait for the toggle switch to be visible
  await expect(page.locator('#switch-cycle')).toBeVisible({timeout: 5000});
  await page.locator('.toggle-plan-cycle-exp').screenshot({path: `${ssPath}beforeToggleSwitchCycle.png`});
  await expect(page.locator('#switch-cycle')).toBeEnabled();
  await page.locator('#switch-cycle').check();

  // Verify that the toggle switch is checked
  await expect(page.locator('#switch-cycle')).toBeChecked();
  await page.locator('.toggle-plan-cycle-exp').screenshot({path: `${ssPath}afterToggleSwitchCycle.png`});

  // To Have Attribute Assertion
  await expect(page.locator('.products-toggle-active ')).toHaveAttribute("class", "products-toggle-active ");
  await page.locator('.products-toggle-active ').screenshot({path: `${ssPath}toHaveAttribute.png`});

  // To Have Text Assertion & To Contain Text Assertion
  // Here we are asserting that a specific element contains the expected text.
  await expect(page.getByText("           Real device cloud of 30,000+ real iOS & Android devices, instantly accessible         ")).toHaveText("           Real device cloud of 30,000+ real iOS & Android devices, instantly accessible         ");
  await expect(page.getByText("           Real device cloud of 30,000+ real iOS & Android devices, instantly accessible         ")).toContainText("30,000+ real iOS & Android devices");
  await page.getByText("           Real device cloud of 30,000+ real iOS & Android devices, instantly accessible         ").screenshot({path: `${ssPath}toHaveText.png`});


  // To Have Value Assertion: Here we are asserting that an input field has the expected value.
  // specially in situations where the input field is pre-filled or has a default value.
  await page.locator("#doc-menu-toggle").click();
  await page.locator("#doc-search-box-input").fill("Playwright");
  await page.locator("#doc-search-box-input").press("Enter");
  await expect(page.locator("(//input[@class='ais-SearchBox-input'])[2]")).toHaveValue("Playwright");
  await page.screenshot({path: `${ssPath}toHaveValue_FilledInput.png`});
  await expect(page.locator("#dev-menu-dropdown li")).toHaveCount(8);
});