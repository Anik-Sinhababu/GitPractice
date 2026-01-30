
import { test, expect } from '@playwright/test';

test('Bootstrap Dropdown Testing', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html');

  // Open the 10th multiselect dropdown
  const dropdownButton = page.locator(
    '(//button[@class="multiselect form-select dropdown-toggle custom-select text-center"])[10]'
  );
  await dropdownButton.click();

  // Scope all queries to the open dropdown menu container
  const menu = page.locator('.multiselect-container.dropdown-menu.show');

  // All inputs inside dropdown
  // All Labels in the dropdown 
  const allInputs = menu.locator('input');
  const allLabels = menu.locator('label');

  for(let i = 0; i < await allLabels.count(); i++)
  {
    const content = await allLabels.nth(i).textContent();
    console.log(`option label: ${content}`);
  }

  for(let i =0; i<await allInputs.count(); i++)
  {
    const text = await allLabels.nth(i).textContent();
    if(text == "Option 1.3" || text == "Option 2.2")
    {
        allInputs.nth(i).click();
    }
  }

  await page.waitForTimeout(5000);

  // 

  // Assert total number of dropdown items
  await expect(allInputs).toHaveCount(8);
  console.log('Total inputs:', await allInputs.count());

  // Enabled (clickable) inputs — use :enabled
  const enabledInputs = menu.locator('input:enabled');
  await expect(enabledInputs).toHaveCount(6);
  console.log('Enabled inputs:', await enabledInputs.count());

  // Disabled inputs — use :disabled
  const disabledInputs = menu.locator('input:disabled');
  await expect(disabledInputs).toHaveCount(2);
  console.log('Disabled inputs:', await disabledInputs.count());

  // If you want to log something user-friendly for each disabled item:
  // - inputs often have no text; use `value` or data attributes,
  // - or locate the label next to the input and read its text.
  const disabledCount = await disabledInputs.count();
  for (let i = 0; i < disabledCount; i++) {
    const input = disabledInputs.nth(i);
    const value = await input.getAttribute('value'); // e.g., "1-1"
    // Example: find a sibling label (adjust selector to your markup)
    const label = input.locator('xpath=following-sibling::label[1]');
    const labelText = await label.textContent();
    console.log(`Disabled: value=${value}, label=${labelText?.trim() ?? '(no label)'}`);
   }
});

