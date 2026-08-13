import { BottleSize } from '../types';

export interface ProductStockData {
  '15ml': number;
  '55ml': number;
  '100ml': number;
}

export const INVENTORY_APP_URL = 'https://aistudio.google.com/apps/79c8f0b3-973d-460a-a7bd-65f19a2fa2e1';
export const INVENTORY_APP_ID = '79c8f0b3-973d-460a-a7bd-65f19a2fa2e1';

// Exact inventory stock quantities from client's AI Studio inventory app
export const INITIAL_INVENTORY: Record<string, ProductStockData> = {
  // 1. 212 Black Masc. (C. Herrera)
  'swiss-12-212-vip-black': { '15ml': 2, '55ml': 5, '100ml': 3 },

  // 2. 212 Men Masc (C. Herrera)
  'swiss-13-212-men': { '15ml': 4, '55ml': 2, '100ml': 4 },

  // 3. 212 Party Fever Masc (C. Herrera)
  'swiss-66-212-party-fever': { '15ml': 3, '55ml': 5, '100ml': 4 },

  // 4. 212 Sexy Fem (C. Herrera)
  'swiss-38-212-sexy': { '15ml': 5, '55ml': 5, '100ml': 3 },

  // 5. 212 VIP Men masc (C. Herrera)
  'swiss-65-212-vip-mens': { '15ml': 6, '55ml': 5, '100ml': 3 },

  // 6. 212 VIP Rosé fem (C. Herrera)
  'swiss-11-212-vip-rose': { '15ml': 5, '55ml': 4, '100ml': 4 },

  // 7. Allure Homme masc (Chanel)
  'swiss-67-allure-homme-sport': { '15ml': 3, '55ml': 4, '100ml': 2 },

  // 8. Amber Rouge fem (Lattafa)
  'swiss-40-amber-rouge': { '15ml': 6, '55ml': 3, '100ml': 3 },

  // 9. Angel fem (Mugler)
  'swiss-24-angel': { '15ml': 4, '55ml': 3, '100ml': 3 },

  // 10. Animale masc (Animale)
  'swiss-27-animale': { '15ml': 5, '55ml': 5, '100ml': 3 },

  // 11. Armani Code masc (G. Armani)
  'swiss-49-armani-code': { '15ml': 4, '55ml': 4, '100ml': 3 },

  // 12. Asad Bourbon masc (Lattafa)
  'swiss-57-asad-bourbon': { '15ml': 4, '55ml': 5, '100ml': 1 },

  // 13. Asad Tradicional masc (Lattafa)
  'swiss-42-asad': { '15ml': 1, '55ml': 2, '100ml': 1 },

  // 14. Atracion masc (Avon Premium)
  'swiss-43-attraction': { '15ml': 2, '55ml': 4, '100ml': 4 },

  // 15. Azzaro Wanted masc (Azzaro)
  'swiss-21-azzaro-wanted': { '15ml': 3, '55ml': 3, '100ml': 1 },

  // 16. Bareeq masc (Lattafa)
  'swiss-32-bareeq': { '15ml': 4, '55ml': 5, '100ml': 3 },

  // 17. Bleu De Chanel masc (Chanel)
  'swiss-45-bleu-de-chanel': { '15ml': 5, '55ml': 4, '100ml': 2 },

  // 18. Chloé fem (Chloé)
  'swiss-68-chloe': { '15ml': 3, '55ml': 3, '100ml': 2 },

  // 19. Club De Nuit masc (Armaf)
  'swiss-46-club-de-nuit': { '15ml': 4, '55ml': 2, '100ml': 3 },

  // 20. Coco Mademoiselle fem (Chanel)
  'swiss-76-coco-madamme': { '15ml': 3, '55ml': 3, '100ml': 2 },

  // 21. Creed Aventus masc (Creed)
  'swiss-47-creed-aventus': { '15ml': 2, '55ml': 1, '100ml': 2 },

  // 22. D&G Light Blue fem (D&G)
  'swiss-56-light-blue': { '15ml': 2, '55ml': 2, '100ml': 2 },

  // 23. Delina Rose fem (P. de Marly)
  'swiss-05-delina': { '15ml': 3, '55ml': 2, '100ml': 2 },

  // 24. Dolce & Gabbana Trad fem (D&G)
  'swiss-70-dolce-gabbana-trad': { '15ml': 3, '55ml': 2, '100ml': 2 },

  // 25. Euphoria CK fem (C. Klein)
  'swiss-63-euphoria': { '15ml': 3, '55ml': 2, '100ml': 2 },

  // 26. Fakar fem (Lattafa)
  'swiss-29-fakhar-rose': { '15ml': 4, '55ml': 0, '100ml': 2 },

  // 27. fame fem (Paco Rabanne)
  'swiss-71-fame': { '15ml': 4, '55ml': 3, '100ml': 3 },

  // 28. Fantasy fem (B. Spears)
  'swiss-25-fantasy': { '15ml': 5, '55ml': 4, '100ml': 4 },

  // 29. Ferrari Black masc (Ferrari)
  'swiss-19-ferrari-black': { '15ml': 2, '55ml': 3, '100ml': 5 },

  // 30. Good Girl Trad. fem (C. Herrera)
  'swiss-09-good-girl': { '15ml': 5, '55ml': 4, '100ml': 2 },

  // 31. Good Girl Fantastic Pink fem (C. Herrera)
  'swiss-10-good-girl-blush': { '15ml': 4, '55ml': 4, '100ml': 4 },

  // 32. Hugo Boss masc (Hugo Boss)
  'swiss-20-hugo-boss': { '15ml': 3, '55ml': 4, '100ml': 3 },

  // 33. Idôle fem (Lancôme) - 100ml esgotado!
  'swiss-08-idole': { '15ml': 3, '55ml': 3, '100ml': 0 },

  // 34. Initio masc (Initio) - 55ml esgotado!
  'swiss-51-oud-for-greatness': { '15ml': 1, '55ml': 0, '100ml': 2 },

  // 35. Initio Psychedelic Love fem (Initio)
  'swiss-52-psychedelic-love': { '15ml': 3, '55ml': 2, '100ml': 2 },

  // 36. Invictus masc (Paco Rabanne)
  'swiss-14-invictus': { '15ml': 3, '55ml': 6, '100ml': 2 },

  // 37. Invictus Victory masc (Paco Rabanne)
  'swiss-53-invictus-victory': { '15ml': 5, '55ml': 6, '100ml': 2 },

  // 38. Issey Miyake masc (Issey Miyake) - 55ml e 100ml esgotados!
  'swiss-07-issey-miyake': { '15ml': 1, '55ml': 0, '100ml': 0 },

  // 39. J'adore fem (Dior)
  'swiss-15-jadore': { '15ml': 4, '55ml': 4, '100ml': 4 },

  // 40. Jack Daniel’s masc (Custom Elite)
  'swiss-54-jack-daniels': { '15ml': 3, '55ml': 4, '100ml': 3 },

  // 41. La Vie Est Belle fem (Lancôme)
  'swiss-16-la-vie-est-belle': { '15ml': 4, '55ml': 2, '100ml': 3 },

  // 42. Lady Million fem (Paco Rabanne)
  'swiss-55-lady-million': { '15ml': 3, '55ml': 3, '100ml': 3 },

  // 43. Le Male Le Parfum masc (J.P. Gaultier) - 55ml e 100ml esgotados!
  'swiss-73-le-male-le-parfum': { '15ml': 2, '55ml': 0, '100ml': 0 },

  // 44. Libre YSL fem (YSL)
  'swiss-77-libre': { '15ml': 4, '55ml': 3, '100ml': 2 },

  // 45. Louis Vuitton (Imagination) masc (L. Vuitton)
  'swiss-72-imagination': { '15ml': 5, '55ml': 5, '100ml': 4 },

  // 46. L’Interdit fem (Givenchy)
  'swiss-74-linterdit': { '15ml': 1, '55ml': 2, '100ml': 2 },

  // 47. My Self masc (Nicho Elite)
  'swiss-28-myslf': { '15ml': 5, '55ml': 2, '100ml': 2 },

  // 48. My Way fem (G. Armani)
  'swiss-64-my-way': { '15ml': 5, '55ml': 2, '100ml': 4 },

  // 49. Olympea fem (Paco Rabanne)
  'swiss-17-olympea': { '15ml': 4, '55ml': 3, '100ml': 4 },

  // 50. One Million masc (Paco Rabanne)
  'swiss-62-1-million': { '15ml': 5, '55ml': 4, '100ml': 4 },

  // 51. One Million Privê masc (Paco Rabanne)
  'swiss-37-1-million-prive': { '15ml': 2, '55ml': 3, '100ml': 2 },

  // 52. Phantom masc (Paco Rabanne)
  'swiss-06-phantom': { '15ml': 5, '55ml': 3, '100ml': 3 },

  // 53. Polo Blue masc (Ralph Lauren) - 100ml esgotado!
  'swiss-18-polo-blue': { '15ml': 3, '55ml': 1, '100ml': 0 },

  // 54. Polo Verde masc (Ralph Lauren)
  'swiss-02-polo-green': { '15ml': 3, '55ml': 1, '100ml': 1 },

  // 55. Prada Luna Rossa masc (Prada)
  'swiss-01-prada-luna-rossa': { '15ml': 3, '55ml': 3, '100ml': 1 },

  // 56. Royal Amber fem (Orientica)
  'swiss-35-royal-amber': { '15ml': 3, '55ml': 3, '100ml': 2 },

  // 57. Sabah Al Ward fem (Al Wataniah)
  'swiss-31-sabah-al-ward': { '15ml': 5, '55ml': 3, '100ml': 5 },

  // 58. Sauvage masc (Dior) - 15ml esgotado!
  'swiss-04-sauvage': { '15ml': 0, '55ml': 2, '100ml': 3 },

  // 59. Scandal Feminino (J.P. Gaultier)
  'swiss-22-scandal': { '15ml': 5, '55ml': 3, '100ml': 4 },

  // 60. Scandal Man (J.P. Gaultier)
  'swiss-58-scandal-men': { '15ml': 5, '55ml': 5, '100ml': 4 },

  // 61. Silver Scent / Ferrati Silver
  'swiss-48-ferrari-silver': { '15ml': 5, '55ml': 4, '100ml': 3 },

  // 62. Spirit Dubai masc (Nicho)
  'swiss-33-spirit-dubai': { '15ml': 5, '55ml': 3, '100ml': 4 },

  // 63. Sultan masc (Al Haramain) - 100ml esgotado!
  'swiss-34-sultan': { '15ml': 3, '55ml': 2, '100ml': 0 },

  // 64. Sì Armani fem (G. Armani)
  'swiss-23-si': { '15ml': 3, '55ml': 1, '100ml': 1 },

  // 65. Tom Ford masc (Tom Ford)
  'swiss-60-tuscan-leather': { '15ml': 4, '55ml': 7, '100ml': 3 },

  // 66. Wazzer Alce masc (Lattafa)
  'swiss-39-al-noble-wazeer': { '15ml': 4, '55ml': 2, '100ml': 3 },

  // 67. Yara Amarelo fem (Lattafa)
  'swiss-61-yara-tous': { '15ml': 4, '55ml': 4, '100ml': 2 },

  // 68. Yara Rosê fem (Lattafa)
  'swiss-30-yara': { '15ml': 3, '55ml': 4, '100ml': 2 },

  // 69. Aqua de Dió masc (G. Armani)
  'swiss-41-acqua-di-gio': { '15ml': 5, '55ml': 4, '100ml': 3 },

  // 70. Stronger Whithout You masc (G. Armani)
  'swiss-59-stronger-with-you': { '15ml': 4, '55ml': 4, '100ml': 2 },

  // 71. Baccarat Rouge fem (M.F. Kurkdjian)
  'swiss-03-baccarat': { '15ml': 1, '55ml': 1, '100ml': 1 },

  // 72. Black Opium fem (YSL) - 100ml esgotado!
  'swiss-44-black-opium': { '15ml': 2, '55ml': 2, '100ml': 0 },

  // 73. 212 Vips Woman fem (Swiss)
  'swiss-75-212-vip-woman': { '15ml': 4, '55ml': 3, '100ml': 5 },

  // 74. Aliem fem (Swiss)
  'swiss-13-aliem': { '15ml': 3, '55ml': 2, '100ml': 1 },

  // 75. Hypnotic Portion fem (Swiss)
  'swiss-50-hypnotic-poison': { '15ml': 5, '55ml': 2, '100ml': 1 },

  // 76. Kouros masc (Premium Swiss) - 15ml e 55ml esgotados!
  'swiss-69-kouros': { '15ml': 0, '55ml': 0, '100ml': 1 },

  // 77. Lili fem (Premium Swiss)
  'swiss-26-lily': { '15ml': 5, '55ml': 5, '100ml': 3 },
};

// Helper function to get stock for a specific product and size
export function getStockForProduct(productId: string): ProductStockData {
  return INITIAL_INVENTORY[productId] || { '15ml': 3, '55ml': 3, '100ml': 3 };
}

// Check if a specific size is available
export function isSizeInStock(productId: string, size: BottleSize): boolean {
  const stock = getStockForProduct(productId);
  return (stock[size] || 0) > 0;
}

// Check if any size is available for a product
export function isProductInStock(productId: string): boolean {
  const stock = getStockForProduct(productId);
  return stock['15ml'] > 0 || stock['55ml'] > 0 || stock['100ml'] > 0;
}
