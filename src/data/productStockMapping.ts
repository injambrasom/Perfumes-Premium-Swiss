/**
 * Product stock mapping between:
 * 1. Site Product ID (e.g., 'swiss-04-sauvage', 'swiss-12-212-vip-black', 'swiss-31-sabah-al-ward')
 * 2. Stock App exact registered name in Firebase Firestore (e.g., 'Sauvage masc', '212 Black Masc.', 'Sabah Al Ward fem')
 */

export interface StockMappingEntry {
  siteProductId: string;
  stockAppName: string;
  aliases?: string[];
}

export const PRODUCT_STOCK_MAPPINGS: StockMappingEntry[] = [
  // 1. 212 Black Masc.
  { siteProductId: 'swiss-12-212-vip-black', stockAppName: '212 Black Masc.', aliases: ['212-vip-black', '2i2 vips blacked', '212 vip black', 'vip black', '212 black'] },
  // 2. 212 Men Masc
  { siteProductId: 'swiss-13-212-men', stockAppName: '212 Men Masc', aliases: ['212-men', '212-men-nyc', '2i2 mens nyc', '212 men nyc'] },
  // 3. 212 Party Fever Masc
  { siteProductId: 'swiss-66-212-party-fever', stockAppName: '212 Party Fever Masc', aliases: ['212-vip-party-fever', '2i2 vip men party fever', 'party fever'] },
  // 4. 212 Sexy Fem
  { siteProductId: 'swiss-38-212-sexy', stockAppName: '212 Sexy Fem', aliases: ['212-sexy', '2i2 sexy'] },
  // 5. 212 VIP Men masc
  { siteProductId: 'swiss-65-212-vip-mens', stockAppName: '212 VIP Men masc', aliases: ['212-vip-men', '2i2 vips mens', '212 vip men'] },
  // 6. 212 VIP Rosé fem
  { siteProductId: 'swiss-11-212-vip-rose', stockAppName: '212 VIP Rosé fem', aliases: ['212-vip-rose', '2i2vip rose', '212 vip rose'] },
  // 7. Allure Homme masc
  { siteProductId: 'swiss-67-allure-homme-sport', stockAppName: 'Allure Homme masc', aliases: ['allure-homme', 'aluri homme xtreme', 'allure homme sport'] },
  // 8. Amber Rouge fem
  { siteProductId: 'swiss-40-amber-rouge', stockAppName: 'Amber Rouge fem', aliases: ['amber-rouge', 'amber rouge'] },
  // 9. Angel fem
  { siteProductId: 'swiss-24-angel', stockAppName: 'Angel fem', aliases: ['angel', 'engel'] },
  // 10. Animale masc
  { siteProductId: 'swiss-27-animale', stockAppName: 'Animale masc', aliases: ['animale', 'animals'] },
  // 11. Armani Code masc
  { siteProductId: 'swiss-49-armani-code', stockAppName: 'Armani Code masc', aliases: ['armani-code', 'harmany code'] },
  // 12. Asad Bourbon masc
  { siteProductId: 'swiss-57-asad-bourbon', stockAppName: 'Asad Bourbon masc', aliases: ['asad-bourbon', 'asad bourbon'] },
  // 13. Asad Tradicional masc
  { siteProductId: 'swiss-42-asad', stockAppName: 'Asad Tradicional masc', aliases: ['asad', 'asad-tradicional', 'assad tradiconal'] },
  // 14. Atracion masc
  { siteProductId: 'swiss-43-attraction', stockAppName: 'Atracion masc', aliases: ['attraction', 'atracion', 'atracione men'] },
  // 15. Azzaro Wanted masc
  { siteProductId: 'swiss-21-azzaro-wanted', stockAppName: 'Azzaro Wanted masc', aliases: ['azzaro-wanted', 'wanted', 'azzaro wanted'] },
  // 16. Bareeq masc
  { siteProductId: 'swiss-32-bareeq', stockAppName: 'Bareeq masc', aliases: ['bareeq', 'bareq'] },
  // 17. Bleu De Chanel masc
  { siteProductId: 'swiss-45-bleu-de-chanel', stockAppName: 'Bleu De Channel masc', aliases: ['bleu-de-chanel', 'bleu', 'bleu de chanel'] },
  // 18. Chloé fem
  { siteProductId: 'swiss-68-chloe', stockAppName: 'Chloé fem', aliases: ['chloe', 'chloé'] },
  // 19. Club De Nuit masc
  { siteProductId: 'swiss-46-club-de-nuit', stockAppName: 'Club De Nuit masc', aliases: ['club-de-nuit', 'club de nuit'] },
  // 20. Coco Mademoiselle fem
  { siteProductId: 'swiss-76-coco-madamme', stockAppName: 'Coco Mademoiselle fem', aliases: ['coco-mademoiselle', 'coco madame', 'coco mademoiselle'] },
  // 21. Creed Aventus masc
  { siteProductId: 'swiss-47-creed-aventus', stockAppName: 'Creed Aventus masc', aliases: ['creed-aventus', 'creed aventus'] },
  // 22. D&G Light Blue fem
  { siteProductId: 'swiss-56-light-blue', stockAppName: 'D&G Light Blue fem', aliases: ['light-blue', 'light blue', 'd&g light blue'] },
  // 23. Delina Rose fem
  { siteProductId: 'swiss-05-delina', stockAppName: 'Delina Rose fem', aliases: ['delina', 'delinna', 'delina rose'] },
  // 24. Dolce & Gabbana Trad fem
  { siteProductId: 'swiss-70-dolce-gabbana-trad', stockAppName: 'Dolce & Gabbana Trad fem', aliases: ['dolce-gabbana-trad', 'dolce & gabanna tradicional'] },
  // 25. Euphoria CK fem
  { siteProductId: 'swiss-63-euphoria', stockAppName: 'Euphoria CK fem', aliases: ['euphoria', 'eufhoria'] },
  // 26. Fakar fem
  { siteProductId: 'swiss-29-fakhar-rose', stockAppName: 'Fakar fem', aliases: ['fakhar-rose', 'fakar rose'] },
  // 27. fame fem
  { siteProductId: 'swiss-71-fame', stockAppName: 'fame fem', aliases: ['fame', 'famme'] },
  // 28. Fantasy fem
  { siteProductId: 'swiss-25-fantasy', stockAppName: 'Fantasy fem', aliases: ['fantasy'] },
  // 29. Ferrari Black masc
  { siteProductId: 'swiss-19-ferrari-black', stockAppName: 'Ferrari Black masc', aliases: ['ferrari-black', 'ferrati black'] },
  // 30. Good Girl Trad. fem
  { siteProductId: 'swiss-09-good-girl', stockAppName: 'Good Girl Trad. fem', aliases: ['good-girl-tradicional', 'gold girl tradicional', 'good girl'] },
  // 31. Good Girl Fantastic Pink fem
  { siteProductId: 'swiss-10-good-girl-blush', stockAppName: 'Good Girl Trad. fem', aliases: ['good-girl-blush', 'gold girl blush'] },
  // 32. Hugo Boss masc
  { siteProductId: 'swiss-20-hugo-boss', stockAppName: 'Hugo Boss masc', aliases: ['hugo-boss-bottled', 'hugo boss bottled', 'hugo boss'] },
  // 33. Idôle fem
  { siteProductId: 'swiss-08-idole', stockAppName: 'Idôle fem', aliases: ['idole', 'idôle'] },
  // 34. Initio masc
  { siteProductId: 'swiss-51-oud-for-greatness', stockAppName: 'Initio Psychedelic Love fem', aliases: ['oud-for-greatness', 'initio'] },
  // 35. Initio Psychedelic Love fem
  { siteProductId: 'swiss-52-psychedelic-love', stockAppName: 'Initio Psychedelic Love fem', aliases: ['psychedelic-love', 'initio psychedelic love'] },
  // 36. Invictus masc
  { siteProductId: 'swiss-14-invictus', stockAppName: 'Invictus masc', aliases: ['invictus', 'inviktus'] },
  // 37. Invictus Victory masc
  { siteProductId: 'swiss-53-invictus-victory', stockAppName: 'Invictus Victory masc', aliases: ['invictus-victory', 'inviktus victory'] },
  // 38. Issey Miyake masc
  { siteProductId: 'swiss-07-issey-miyake', stockAppName: 'IIssey Miyake masc', aliases: ['issey-miyake', 'issey miyake'] },
  // 39. J'adore fem
  { siteProductId: 'swiss-15-jadore', stockAppName: 'J\'adore fem', aliases: ['jadore', 'j\'ador', 'j\'adore'] },
  // 40. Jack Daniel’s masc
  { siteProductId: 'swiss-54-jack-daniels', stockAppName: 'Jack Daniel’s masc', aliases: ['jack-daniels', 'jack daniels essencial', 'jack daniels'] },
  // 41. La Vie Est Belle fem
  { siteProductId: 'swiss-16-la-vie-est-belle', stockAppName: 'La Vie Est Belle fem', aliases: ['la-vie-est-belle', 'la vie & belle', 'la vie est belle'] },
  // 42. Lady Million fem
  { siteProductId: 'swiss-55-lady-million', stockAppName: 'Lady Million fem', aliases: ['lady-million', 'lady woman', '212 vips woman fem'] },
  // 43. Le Male Le Parfum masc
  { siteProductId: 'swiss-73-le-male-le-parfum', stockAppName: 'Le Male Le Parfum masc', aliases: ['le-male-le-parfum', 'le male'] },
  // 44. Libre YSL fem
  { siteProductId: 'swiss-77-libre', stockAppName: 'Libre YSL fem', aliases: ['libre-ysl', 'libre ysl', 'libre'] },
  // 45. Louis Vuitton (Imagination) masc
  { siteProductId: 'swiss-72-imagination', stockAppName: 'Louis Vuitton (Imagination) masc', aliases: ['imagination', 'louis vuitton imagination'] },
  // 46. L’Interdit fem
  { siteProductId: 'swiss-74-linterdit', stockAppName: 'L’Interdit fem', aliases: ['linterdit', 'l\'interdit'] },
  // 47. My Self masc
  { siteProductId: 'swiss-28-myslf', stockAppName: 'My Self masc', aliases: ['myself', 'my self'] },
  // 48. My Way fem
  { siteProductId: 'swiss-64-my-way', stockAppName: 'My Way fem', aliases: ['my-way', 'my way'] },
  // 49. Olympea fem
  { siteProductId: 'swiss-17-olympea', stockAppName: 'Olympea fem', aliases: ['olympea', 'olimpia'] },
  // 50. One Million masc
  { siteProductId: 'swiss-62-1-million', stockAppName: 'One Million masc', aliases: ['1-million', 'one million', '1 million'] },
  // 51. One Million Privê masc
  { siteProductId: 'swiss-37-1-million-prive', stockAppName: 'One Million Privê masc', aliases: ['1-million-prive', 'one million prive', 'one million privé', '1 million private'] },
  // 52. Phantom masc
  { siteProductId: 'swiss-06-phantom', stockAppName: 'Phantom masc', aliases: ['phantom', 'fantom'] },
  // 53. Polo Blue masc
  { siteProductId: 'swiss-18-polo-blue', stockAppName: 'Polo Blue masc', aliases: ['polo-blue', 'polo blue'] },
  // 54. Polo Verde masc
  { siteProductId: 'swiss-02-polo-green', stockAppName: 'Polo Verde masc', aliases: ['polo-verde', 'polo green', 'polo verde'] },
  // 55. Prada Luna Rossa masc
  { siteProductId: 'swiss-01-prada-luna-rossa', stockAppName: 'Prada Luna Rossa masc', aliases: ['prada-luna-rossa', 'prado', 'prada luna rossa'] },
  // 56. Royal Amber fem
  { siteProductId: 'swiss-35-royal-amber', stockAppName: 'Royal Amber fem', aliases: ['royal-amber', 'royal amber'] },
  // 57. Sabah Al Ward fem
  { siteProductId: 'swiss-31-sabah-al-ward', stockAppName: 'Sabah Al Ward fem', aliases: ['sabah-al-ward', 'sabah al ward'] },
  // 58. Sauvage masc
  { siteProductId: 'swiss-04-sauvage', stockAppName: 'Sauvage masc', aliases: ['sauvage', 'salvage', 'sauvage masc'] },
  // 59. Scandal Feminino
  { siteProductId: 'swiss-22-scandal', stockAppName: 'Scandal Feminino', aliases: ['scandal-fem', 'scandal', 'scandal fem'] },
  // 60. Scandal Man
  { siteProductId: 'swiss-58-scandal-men', stockAppName: 'Scandal Man', aliases: ['scandal-men', 'skandal', 'scandal men'] },
  // 61. Silver Scent / Ferrati Silver
  { siteProductId: 'swiss-48-ferrari-silver', stockAppName: 'Silver Scent masc', aliases: ['silver-cents', 'ferrati silver', 'silver scent', 'silver scent masc', 'ferrari silver'] },
  // 62. Spirit Dubai masc
  { siteProductId: 'swiss-33-spirit-dubai', stockAppName: 'Spirit Dubai masc', aliases: ['spirit-dubai-oud', 'spirit dubai', 'spirit dubai oud'] },
  // 63. Sultan masc
  { siteProductId: 'swiss-34-sultan', stockAppName: 'Sultan masc', aliases: ['sultan'] },
  // 64. Sì Armani fem
  { siteProductId: 'swiss-23-si', stockAppName: 'Sì Armani fem', aliases: ['si-armani', 'si armani', 'sì armani', 'si'] },
  // 65. Tom Ford masc
  { siteProductId: 'swiss-60-tuscan-leather', stockAppName: 'Tom Ford masc', aliases: ['tuscan-leather', 'tom ford'] },
  // 66. Wazzer Alce masc
  { siteProductId: 'swiss-39-al-noble-wazeer', stockAppName: 'Wazzer Alce masc', aliases: ['wazeer-alce', 'alce', 'wazeer', 'wazzer alce'] },
  // 67. Yara Amarelo fem
  { siteProductId: 'swiss-61-yara-tous', stockAppName: 'Yara Amarelo fem', aliases: ['yara-tous-amarelo', 'yara amarelo', 'yara tous'] },
  // 68. Yara Rosê fem
  { siteProductId: 'swiss-30-yara', stockAppName: 'Yara Rosê fem', aliases: ['yara-rose', 'yara rose', 'yara rosê'] },
  // 69. Aqua de Dió masc
  { siteProductId: 'swiss-41-acqua-di-gio', stockAppName: 'Aqua de Dió masc', aliases: ['aqua-de-dio', 'acua de dió', 'aqua de dio', 'acqua di gio'] },
  // 70. Stronger Whithout You masc
  { siteProductId: 'swiss-59-stronger-with-you', stockAppName: 'Stronger Whithout You masc', aliases: ['stronger-with-you', 'stronger without you', 'stronger with you'] },
  // 71. Baccarat Rouge fem
  { siteProductId: 'swiss-03-baccarat', stockAppName: 'Baccarat Rouge fem', aliases: ['baccarat-rouge', 'baccarat', 'baccarat rouge 540'] },
  // 72. Black Opium fem
  { siteProductId: 'swiss-44-black-opium', stockAppName: 'Black Opium fem', aliases: ['black-opium', 'black opium'] },
  // 73. 212 Vips Woman fem
  { siteProductId: 'swiss-75-212-vip-woman', stockAppName: '212 Vips Woman fem', aliases: ['212-vip-woman', '212 vips woman'] },
  // 74. Aliem fem
  { siteProductId: 'swiss-13-aliem', stockAppName: 'Aliem fem', aliases: ['alien', 'aliem'] },
  // 75. Hypnotic Portion fem
  { siteProductId: 'swiss-50-hypnotic-poison', stockAppName: 'Hypnotic Portion fem', aliases: ['hypnotic-poison', 'hypnotic portion', 'hypnotic poison'] },
  // 76. Kouros masc
  { siteProductId: 'swiss-69-kouros', stockAppName: 'Kouros masc', aliases: ['kouros', 'couros'] },
  // 77. Lili fem
  { siteProductId: 'swiss-26-lily', stockAppName: 'Lili fem', aliases: ['lily-essence', 'lili essense', 'lily essence', 'lili'] }
];

export function normalizeKey(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const NORM_MAP: Record<string, string[]> = {};

PRODUCT_STOCK_MAPPINGS.forEach((item) => {
  const primaryId = item.siteProductId;
  
  const addMapping = (rawKey: string) => {
    const norm = normalizeKey(rawKey);
    if (!norm) return;
    if (!NORM_MAP[norm]) NORM_MAP[norm] = [];
    if (!NORM_MAP[norm].includes(primaryId)) {
      NORM_MAP[norm].push(primaryId);
    }
  };

  addMapping(item.siteProductId);
  addMapping(item.stockAppName);
  if (item.aliases) {
    item.aliases.forEach(addMapping);
  }
});

/**
 * Returns ALL site product IDs that match a given document ID or product name
 */
export function resolveAllSiteProductIds(docIdOrName: string): string[] {
  if (!docIdOrName) return [];
  const norm = normalizeKey(docIdOrName);
  const results: string[] = [];

  if (NORM_MAP[norm]) {
    results.push(...NORM_MAP[norm]);
  }

  // Fuzzy fallback substring match
  for (const [k, ids] of Object.entries(NORM_MAP)) {
    if (k.length >= 4 && (norm.includes(k) || k.includes(norm))) {
      ids.forEach((id) => {
        if (!results.includes(id)) results.push(id);
      });
    }
  }

  // Always return the original docIdOrName as well in case it matches directly
  if (!results.includes(docIdOrName)) {
    results.push(docIdOrName);
  }

  return results;
}

export function resolveSiteProductId(docIdOrName: string): string {
  const ids = resolveAllSiteProductIds(docIdOrName);
  return ids[0] || docIdOrName;
}

export function getStockAppName(siteProductId: string): string {
  const found = PRODUCT_STOCK_MAPPINGS.find((m) => m.siteProductId === siteProductId);
  return found ? found.stockAppName : siteProductId;
}
