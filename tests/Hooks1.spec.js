
import { test, expect } from "@playwright/test";

let page;

  // Login
test.beforeEach(async ({browser})=>{
  page = await browser.newPage();
  await page.goto("https://demoblaze.com/");
  await page.getByRole("link", { name: "Log in" }).click();
  await page.fill("#loginusername", "hello123400998877");
  await page.fill("#loginpassword", "hello1234");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.locator("#nameofuser")).toHaveText("Welcome hello123400998877");
});


test.afterEach(async()=>{
    await page.getByRole("link", { name: "Log out" }).click();
});


test("Implementation of hooks", async ({}) => {
  // Products list
  const products = page.locator(".card-title a");
  await expect(products.first()).toBeVisible();

  // --- Single product only (first), operations unchanged ---
  const name = (await products.nth(0).innerText()).trim();
  console.log(name);

  await products.nth(0).click();

  // ✅ Assert on product page (stable selector) — unchanged
  await expect.soft(page.locator("#imgp")).toBeVisible();        // product image

  await page.screenshot({ path: `tests/HooksScr/${name}.png` });

  // ✅ Deterministic return to list, then re-stabilize — unchanged
  await page.getByRole("link", { name: "Home" }).click();
  await expect(products.first()).toBeVisible();
});


test("Add product to the cart", async ({  }) => {
  // Products list
  const products = page.locator(".card-title a");
  await expect(products.first()).toBeVisible();

  // --- Single product only (first), operations unchanged ---
  const name = (await products.nth(0).innerText()).trim();
  console.log(name);

  await products.nth(0).click();

  await page.locator("//a[text()='Add to cart']").click();

  // Keep dialog handler position and behavior unchanged
  page.on("dialog", async dialog => {
    await dialog.accept();
  });

  await page.locator("//a[text()='Home ']").click();
  // ---------------------------------------------------------

  await page.locator("#cartur").click();
  await page.waitForSelector("#tbodyid");
  await page.locator("#tbodyid").screenshot({path: "tests/HooksScr/cart.png"})
});

