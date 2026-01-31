import { test, expect } from '@playwright/test';

// Negative functional test cases
const negativeCases = [
  { id: 'Neg_Fun_0001', input: 'oyaabaennotheyaalaatharahaaveyi', expected: '', desc: 'Joined words should not produce Sinhala output' },
  { id: 'Neg_Fun_0002', input: 'api heta enavaa\nthakota kathaa karamu', expected: '', desc: 'Line breaks' },
  { id: 'Neg_Fun_0003', input: 'oyaa              ehema             karanavanam     vaedak       naee.', expected: '', desc: 'Multiple spaces' },
  { id: 'Neg_Fun_0004', input: 'mama malak malak kadaa gannadha?', expected: '', desc: 'Repeated words' },
  { id: 'Neg_Fun_0005', input: 'eyaa ahinsakayidha@@', expected: '', desc: 'Excess punctuation' },
  { id: 'Neg_Fun_0006', input: 'mama,chithrayak!adhinna yanavaa.', expected: '', desc: 'Punctuation mixed inside words' },
  { id: 'Neg_Fun_0007', input: 'oyaa123mal456valata', expected: '', desc: 'Numbers inside words' },
  { id: 'Neg_Fun_0008', input: 'api go to school', expected: '', desc: 'Mixed English + Singlish words' },
  { id: 'Neg_Fun_0009', input: 'MaMa PaAsAl YaNaWaa', expected: '', desc: 'Random uppercase letters' },
  { id: 'Neg_Fun_0010', input: 'ghynbcxsafbvjjkhjfvbcvb', expected: '', desc: 'Random gibberish input' },
];

negativeCases.forEach(({ id, input, expected, desc }) => {
  test(`${id} - ${desc}`, async ({ page }, testInfo) => {

    // Open site
    await page.goto('https://www.swifttranslator.com/');

    // Focus & type input
    const inputBox = page.locator('textarea[placeholder*="Singlish"]');
    await inputBox.click();
    await inputBox.fill('');
    await inputBox.type(input, { delay: 50 });

    // Output container
    const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap');

    // Wait until text appears (max 15s)
    await page.waitForTimeout(2000);

    // Get actual output
    const actualOutput = (await outputBox.textContent())?.trim() || '';

    // Attach data to report
    testInfo.attach('Negative Test Data', {
      body: `Input: ${input}\nExpected (Empty): ${expected}\nActual Output: ${actualOutput}`,
      contentType: 'text/plain',
    });

    // Negative assertion -> force fail if translator produces anything
    expect(actualOutput).toBe(expected); // this will FAIL if output is not empty
  });
});
