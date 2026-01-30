
import { test, expect } from '@playwright/test';
import { ssPath } from './path.js'; 

test('BuiltInLocatorMethods', async ({ page }) => {
  await page.goto('https://support.orangehrm.com/portal/en/signin');

  await expect(page.getByAltText('OrangeHRM')).toBeVisible();

  const fframe = page.frameLocator('#iamFrame');
  const inp = fframe.getByPlaceholder('Email Address').first();
  await inp.click();
  await inp.fill('sinhababubarun@gmail.com');

  const nextBtn = fframe.locator('#nextbtn').first();
  await nextBtn.click();

  await page.screenshot({ path: `${ssPath}iframe.png`});

  await page.getByRole('menuitem', { name: /user preference/i }).first().click();
  await page.screenshot({ path: `${ssPath}accessibility.png` });

  await page.locator('#accessibilityTab_accessibility_personas').click();

  // Tooltips & icons
  const infos = page.locator('.InfoRow__infoIconContainer');
  const tooltip = page.locator('.InfoRow__tooltipContent');

  // Reduce motion to stabilize fade-ins/outs
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const count = await infos.count();
  for (let i = 0; i < count; i++) {
    const info = infos.nth(i);

    await info.scrollIntoViewIfNeeded();
    await info.hover(); // keep hover active

    // Park mouse at the center of the trigger so hover state persists
    const box = await info.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }

    // Wait for tooltip to be visible, then capture with animations disabled
    await expect(tooltip).toBeVisible();
    await tooltip.screenshot({ path: `${ssPath}info${i}.png`, animations: 'disabled' });

    // Your requirement: move mouse out of viewport afterwards
    await page.mouse.move(-10, -10);
    await expect(tooltip).toBeHidden({ timeout: 1500 }).catch(() => {});
  }


  await page.goto("https://practice.expandtesting.com/locators");
  await page.getByRole("button", {name: "Add Item"}).click();
  await page.locator("//a[text()='Contact']").click();
  await page.screenshot({path: `${ssPath}getByRolePractice.png`});



  //Get By Label Method
  await page.goBack();
  await page.getByLabel("Email for newsletter").fill("udithnayak@gmail.com");
  await page.screenshot({path: `${ssPath}getByLabelSc.png`});

  // Get By PlaceHolder
  await page.getByPlaceholder("Search the site").fill("France");
  await page.getByPlaceholder("Filter by tag").fill("Skyscraper");
  await page.screenshot({path: `${ssPath}getByPlaceholderSc.png`});

  // Get By AltText
const text = await page.getByAltText("User avatar").textContent();
console.log("Get By Alt Text: " + text);

});
