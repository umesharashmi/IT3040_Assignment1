import { test, expect } from '@playwright/test';

test('Pos_UI_0001 - UI shows Sinhala output for typed Singlish sentence', async ({ page }) => {

  //  Open site
  await page.goto('https://www.swifttranslator.com/');

  //  Input textarea
  const inputArea = page.locator('textarea[placeholder*="Singlish"]');
  await inputArea.click();
  await inputArea.fill('');
  await inputArea.type('mata oyaa hari lassanayi', { delay: 50 });

  // Output area
  const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap');

  // Wait until Sinhala output contains key word
  await expect.poll(async () => {
    const text = await outputBox.textContent();
    return text ? text.trim() : '';
  }, { timeout: 30000 }).toContain('මට ඔයා හරි ලස්සනයි');

});
