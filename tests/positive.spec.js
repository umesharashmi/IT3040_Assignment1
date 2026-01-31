import { test, expect } from '@playwright/test';

// Array of test cases
const positiveCases = [
  { id: 'Pos_Fun_0001', input: 'mama kanna yanavaa.', expected: 'මම කන්න යනවා.', desc: 'Simple sentence' },
  { id: 'Pos_Fun_0002', input: 'mama ruupavaahiniya baeluvata passe paadam karanavaa.', expected: 'මම රූපවාහිනිය බැලුවට පස්සෙ පාඩම් කරනවා.', desc: 'Complex sentence' },
  { id: 'Pos_Fun_0003', input: 'oyaa paadam kaloth viBhaagaya samath veyi', expected: 'ඔයා පාඩම් කලොත් විභාගය සමත් වෙයි', desc: 'Complex sentence' },
  { id: 'Pos_Fun_0004', input: 'meaka hari yayi kiyala oyaa hithanavadha?', expected: 'මේක හරි යයි කියල ඔයා හිතනවද?', desc: 'Response sentence' },
  { id: 'Pos_Fun_0005', input: 'dhora vahanna.', expected: 'දොර වහන්න.', desc: 'Imperative command' },
  { id: 'Pos_Fun_0006', input: 'oyaa hariyata gaNan tika hadhala thiyanavaa', expected: 'ඔයා හරියට ගණන් ටික හදල තියනවා', desc: 'positive forms' },
  { id: 'Pos_Fun_0007', input: 'oyaa mal valata vathura dhaalaa naee', expected: 'ඔයා මල් වලට වතුර දාලා නෑ', desc: 'negative forms' },
  { id: 'Pos_Fun_0008', input: 'suBha raathriyak!', expected: 'සුභ රාත්‍රියක්!', desc: 'Greeting' },
  { id: 'Pos_Fun_0009', input: 'mama ee vaedee karannam.', expected: 'මම ඒ වැඩේ කරන්නම්.', desc: 'Response' },
  { id: 'Pos_Fun_0010', input: 'karuNaakaralaa dhora poddak aeralaa thiyanavadha?', expected: 'කරුණාකරලා දොර පොඩ්ඩක් ඇරලා තියනවද?', desc: 'Request' },
  { id: 'Pos_Fun_0011', input: 'uba palayan.', expected: 'උබ පලයන්.', desc: ' Informal phrasing ' },
  { id: 'Pos_Fun_0012', input: 'hari hari mama ikmanata enavaa', expected: 'හරි හරි මම ඉක්මනට එනවා', desc: 'Repeated word expressions ' },
  { id: 'Pos_Fun_0013', input: 'shrii lQQkaava indhiyan saagarayee pihiti sundhara dhuupath rataki.mehi sundhara veraLa,haritha thee vathu,vanaanthara haa saQQskRUthika uruma aetha.', expected: 'ශ්‍රී ලංකාව ඉන්දියන් සාගරයේ පිහිටි සුන්දර දූපත් රටකි.මෙහි සුන්දර වෙරළ,හරිත තේ වතු,වනාන්තර හා සංස්කෘතික උරුම ඇත.', desc: 'Paragraph' },
  { id: 'Pos_Fun_0014', input: 'mama pereedhaa nuvara giyaa,ehee godaak lassanayi.', expected: 'මම පෙරේදා නුවර ගියා,එහේ ගොඩාක් ලස්සනයි.', desc: 'Simple past sentence' },
  { id: 'Pos_Fun_0015', input: 'mama adha gamee yanavaa', expected: 'මම අද ගමේ යනවා', desc: 'Simple present sentence' },
  { id: 'Pos_Fun_0016', input: 'mata hoDHA Lamayek venna puLUvan veyi.', expected: 'මට හොඳ ළමයෙක් වෙන්න පුළුවන් වෙයි.', desc: 'Simple future sentence' },
  { id: 'Pos_Fun_0017', input: 'mama eyaa ekka kathaa karanna aeththatama kaemathi naee', expected: 'මම එයා එක්ක කතා කරන්න ඇත්තටම කැමති නෑ', desc: 'Negation patterns ' },
  { id: 'Pos_Fun_0018', input: 'aeya koNdaya kaepuvaa', expected: 'ඇය කොණ්ඩය කැපුවා', desc: ' Singular  sentence' },
  { id: 'Pos_Fun_0019', input: 'api mal vaththata yamu.', expected: 'අපි මල් වත්තට යමු.', desc: 'Plural sentence' },
  { id: 'Pos_Fun_0020', input: 'oyaa haemadhaama cartoon balanavadha?', expected: 'ඔයා හැමදාම cartoon බලනවද?', desc: 'English technical/brand terms' },
  { id: 'Pos_Fun_0021', input: 'mama gee athuganavaa saha askaranavaa', expected: 'මම ගේ අතුගනවා සහ අස්කරනවා', desc: 'Compound sentense' },
  { id: 'Pos_Fun_0022', input: 'mama 2.30 idhan paeya 2 k paadam karanavaa', expected: 'මම 2.30 ඉදන් පැය 2 ක් පාඩම් කරනවා', desc: 'Time and number format' },
  { id: 'Pos_Fun_0023', input: 'mama 2025/12/03 udhaarita suBha pathalaa SMS ekak dhaemmaa.', expected: 'මම 2025/12/03 උදාරිට සුභ පතලා SMS එකක් දැම්මා.', desc: 'English abbreviations' },
  { id: 'Pos_Fun_0024', input: 'Name field eka empty thiyanava,karuNaakara eya puravanna.', expected: 'Name field එක empty තියනව,කරුණාකර එය පුරවන්න.', desc: 'Cleared input handling' },
];

// 🔹 normalization helper (NEW – logic unchanged)
const normalizeText = (text) =>
  text
    .replace(/\s+/g, ' ')
    .replace(/\s*([.,!?])\s*/g, '$1')
    .trim();

// Stable test version
positiveCases.forEach(({ id, input, expected, desc }) => {
  test(`${id} - ${desc}`, async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

    const inputArea = page.locator('textarea[placeholder*="Singlish"]');
    await inputArea.fill('');
    await inputArea.type(input, { delay: 50 });

    const outputBox = page.locator('div.bg-slate-50.whitespace-pre-wrap');

    const expectedNormalized = normalizeText(expected);

    await expect.poll(async () => {
      const text = await outputBox.textContent();
      return text ? normalizeText(text) : '';
    }, { timeout: 45000, interval: 500 }).toContain(expectedNormalized);
  });
});
