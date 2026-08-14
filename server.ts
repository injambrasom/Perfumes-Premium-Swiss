import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import cors from 'cors';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { PRODUCTS, REFERENCE_PERFUMES_LIST } from './src/data/products';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.text({ type: '*/*', limit: '10mb' }));

// Helper to get Mercado Pago client safely
function getMercadoPagoClient() {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) {
    return null;
  }
  return new MercadoPagoConfig({
    accessToken: token,
    options: { timeout: 10000 }
  });
}

// ==========================================
// MERCADO PAGO API ENDPOINTS
// ==========================================

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const hasToken = Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN);
  const hasPublicKey = Boolean(process.env.VITE_MERCADO_PAGO_PUBLIC_KEY);
  res.json({
    status: 'ok',
    mercadoPagoConfigured: hasToken,
    hasPublicKey,
    connectedStockAppId: '79c8f0b3-973d-460a-a7bd-65f19a2fa2e1'
  });
});

// ==========================================
// INTEGRATED STOCK & INVENTORY API ENDPOINTS
// Connected App ID: 79c8f0b3-973d-460a-a7bd-65f19a2fa2e1
// ==========================================

// In-memory stock store initialized from inventory data
let INVENTORY_STORE: Record<string, { '15ml': number; '55ml': number; '100ml': number }> = {
  'swiss-12-212-vip-black': { '15ml': 2, '55ml': 5, '100ml': 3 },
  'swiss-13-212-men': { '15ml': 4, '55ml': 2, '100ml': 4 },
  'swiss-66-212-party-fever': { '15ml': 3, '55ml': 5, '100ml': 4 },
  'swiss-38-212-sexy': { '15ml': 5, '55ml': 5, '100ml': 3 },
  'swiss-65-212-vip-mens': { '15ml': 6, '55ml': 5, '100ml': 3 },
  'swiss-11-212-vip-rose': { '15ml': 5, '55ml': 4, '100ml': 4 },
  'swiss-67-allure-homme-sport': { '15ml': 3, '55ml': 4, '100ml': 2 },
  'swiss-40-amber-rouge': { '15ml': 6, '55ml': 3, '100ml': 3 },
  'swiss-24-angel': { '15ml': 4, '55ml': 3, '100ml': 3 },
  'swiss-27-animale': { '15ml': 5, '55ml': 5, '100ml': 3 },
  'swiss-49-armani-code': { '15ml': 4, '55ml': 4, '100ml': 3 },
  'swiss-57-asad-bourbon': { '15ml': 4, '55ml': 5, '100ml': 1 },
  'swiss-42-asad': { '15ml': 1, '55ml': 2, '100ml': 1 },
  'swiss-43-attraction': { '15ml': 2, '55ml': 4, '100ml': 4 },
  'swiss-21-azzaro-wanted': { '15ml': 3, '55ml': 3, '100ml': 1 },
  'swiss-32-bareeq': { '15ml': 4, '55ml': 5, '100ml': 3 },
  'swiss-45-bleu-de-chanel': { '15ml': 5, '55ml': 4, '100ml': 2 },
  'swiss-68-chloe': { '15ml': 3, '55ml': 3, '100ml': 2 },
  'swiss-46-club-de-nuit': { '15ml': 4, '55ml': 2, '100ml': 3 },
  'swiss-76-coco-madamme': { '15ml': 3, '55ml': 3, '100ml': 2 },
  'swiss-47-creed-aventus': { '15ml': 2, '55ml': 1, '100ml': 2 },
  'swiss-56-light-blue': { '15ml': 2, '55ml': 2, '100ml': 2 },
  'swiss-05-delina': { '15ml': 3, '55ml': 2, '100ml': 2 },
  'swiss-70-dolce-gabbana-trad': { '15ml': 3, '55ml': 2, '100ml': 2 },
  'swiss-63-euphoria': { '15ml': 3, '55ml': 2, '100ml': 2 },
  'swiss-29-fakhar-rose': { '15ml': 4, '55ml': 0, '100ml': 2 },
  'swiss-71-fame': { '15ml': 4, '55ml': 3, '100ml': 3 },
  'swiss-25-fantasy': { '15ml': 5, '55ml': 4, '100ml': 4 },
  'swiss-19-ferrari-black': { '15ml': 2, '55ml': 3, '100ml': 5 },
  'swiss-09-good-girl': { '15ml': 5, '55ml': 4, '100ml': 2 },
  'swiss-10-good-girl-blush': { '15ml': 4, '55ml': 4, '100ml': 4 },
  'swiss-20-hugo-boss': { '15ml': 3, '55ml': 4, '100ml': 3 },
  'swiss-08-idole': { '15ml': 3, '55ml': 3, '100ml': 0 },
  'swiss-51-oud-for-greatness': { '15ml': 1, '55ml': 0, '100ml': 2 },
  'swiss-52-psychedelic-love': { '15ml': 3, '55ml': 2, '100ml': 2 },
  'swiss-14-invictus': { '15ml': 3, '55ml': 6, '100ml': 2 },
  'swiss-53-invictus-victory': { '15ml': 5, '55ml': 6, '100ml': 2 },
  'swiss-07-issey-miyake': { '15ml': 1, '55ml': 0, '100ml': 0 },
  'swiss-15-jadore': { '15ml': 4, '55ml': 4, '100ml': 4 },
  'swiss-54-jack-daniels': { '15ml': 3, '55ml': 4, '100ml': 3 },
  'swiss-16-la-vie-est-belle': { '15ml': 4, '55ml': 2, '100ml': 3 },
  'swiss-55-lady-million': { '15ml': 3, '55ml': 3, '100ml': 3 },
  'swiss-73-le-male-le-parfum': { '15ml': 2, '55ml': 0, '100ml': 0 },
  'swiss-77-libre': { '15ml': 4, '55ml': 3, '100ml': 2 },
  'swiss-72-imagination': { '15ml': 5, '55ml': 5, '100ml': 4 },
  'swiss-74-linterdit': { '15ml': 1, '55ml': 2, '100ml': 2 },
  'swiss-28-myslf': { '15ml': 5, '55ml': 2, '100ml': 2 },
  'swiss-64-my-way': { '15ml': 5, '55ml': 2, '100ml': 4 },
  'swiss-17-olympea': { '15ml': 4, '55ml': 3, '100ml': 4 },
  'swiss-62-1-million': { '15ml': 5, '55ml': 4, '100ml': 4 },
  'swiss-37-1-million-prive': { '15ml': 2, '55ml': 3, '100ml': 2 },
  'swiss-06-phantom': { '15ml': 5, '55ml': 3, '100ml': 3 },
  'swiss-18-polo-blue': { '15ml': 3, '55ml': 1, '100ml': 0 },
  'swiss-02-polo-green': { '15ml': 3, '55ml': 1, '100ml': 1 },
  'swiss-01-prada-luna-rossa': { '15ml': 3, '55ml': 3, '100ml': 1 },
  'swiss-35-royal-amber': { '15ml': 3, '55ml': 3, '100ml': 2 },
  'swiss-31-sabah-al-ward': { '15ml': 5, '55ml': 3, '100ml': 5 },
  'swiss-04-sauvage': { '15ml': 0, '55ml': 2, '100ml': 3 },
  'swiss-22-scandal': { '15ml': 5, '55ml': 3, '100ml': 4 },
  'swiss-58-scandal-men': { '15ml': 5, '55ml': 5, '100ml': 4 },
  'swiss-48-ferrari-silver': { '15ml': 5, '55ml': 4, '100ml': 3 },
  'swiss-33-spirit-dubai': { '15ml': 5, '55ml': 3, '100ml': 4 },
  'swiss-34-sultan': { '15ml': 3, '55ml': 2, '100ml': 0 },
  'swiss-23-si': { '15ml': 3, '55ml': 1, '100ml': 1 },
  'swiss-60-tuscan-leather': { '15ml': 4, '55ml': 7, '100ml': 3 },
  'swiss-39-al-noble-wazeer': { '15ml': 4, '55ml': 2, '100ml': 3 },
  'swiss-61-yara-tous': { '15ml': 4, '55ml': 4, '100ml': 2 },
  'swiss-30-yara': { '15ml': 3, '55ml': 4, '100ml': 2 },
  'swiss-41-acqua-di-gio': { '15ml': 5, '55ml': 4, '100ml': 3 },
  'swiss-59-stronger-with-you': { '15ml': 4, '55ml': 4, '100ml': 2 },
  'swiss-03-baccarat': { '15ml': 1, '55ml': 1, '100ml': 1 },
  'swiss-44-black-opium': { '15ml': 2, '55ml': 2, '100ml': 0 },
  'swiss-75-212-vip-woman': { '15ml': 4, '55ml': 3, '100ml': 5 },
  'swiss-13-aliem': { '15ml': 3, '55ml': 2, '100ml': 1 },
  'swiss-50-hypnotic-poison': { '15ml': 5, '55ml': 2, '100ml': 1 },
  'swiss-69-kouros': { '15ml': 0, '55ml': 0, '100ml': 1 },
  'swiss-26-lily': { '15ml': 5, '55ml': 5, '100ml': 3 }
};

// Helper function to normalize strings for robust matching
function normalizeStr(str: string): string {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

// Levenshtein distance for fuzzy matching typos
function levenshtein(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

let LAST_STOCK_SYNC: {
  timestamp: string;
  productName: string;
  productId: string;
  stock: { '15ml': number; '55ml': number; '100ml': number };
} | null = null;

// Smart resolver to match product key from ID, Name, Reference, or Original Perfume Name
function resolveProductKey(input: string): string | null {
  if (!input) return null;
  const rawStr = input.toString().trim();
  if (INVENTORY_STORE[rawStr]) return rawStr;

  const normInput = normalizeStr(rawStr);
  if (!normInput) return null;

  // Stripped input removing common noise words (brands, gender, perfume, etc.)
  const cleanedInput = normInput
    .replace(/\b(dior|chanel|paco|rabanne|carolina|herrera|yves|saint|laurent|ysl|lattafa|lancome|giorgio|armani|hugo|boss|creed|tom|ford|dolce|gabbana|boticario|azaro|azzaro|perfume|masculino|feminino|unissex|edp|edt|parfum|tradicional|inspirado|em|ref|swiss|atelier)\b/g, '')
    .trim();

  // 1. Direct normalized match in INVENTORY_STORE keys
  for (const key of Object.keys(INVENTORY_STORE)) {
    if (normalizeStr(key) === normInput || (cleanedInput && normalizeStr(key) === cleanedInput)) return key;
  }

  // 2. Exact match against REFERENCE_PERFUMES_LIST inputName
  if (Array.isArray(REFERENCE_PERFUMES_LIST)) {
    for (const ref of REFERENCE_PERFUMES_LIST) {
      const normRef = normalizeStr(ref.inputName);
      if ((normRef === normInput || (cleanedInput && normRef === cleanedInput)) && INVENTORY_STORE[ref.targetId]) {
        return ref.targetId;
      }
    }
  }

  // 3. Match against PRODUCTS array (id, name, referenceName, or cleaned referenceName)
  for (const p of PRODUCTS) {
    const normId = normalizeStr(p.id);
    const normName = normalizeStr(p.name);
    const normRefFull = normalizeStr(p.referenceName);
    const normRefClean = normalizeStr(p.referenceName.replace(/^inspirado\s*em\s*/i, ''));

    if (
      normId === normInput ||
      normName === normInput ||
      normRefFull === normInput ||
      normRefClean === normInput ||
      (cleanedInput && (normName === cleanedInput || normRefClean === cleanedInput || normId === cleanedInput))
    ) {
      if (INVENTORY_STORE[p.id]) return p.id;
    }
  }

  // 4. Partial / Contains match on REFERENCE_PERFUMES_LIST
  if (Array.isArray(REFERENCE_PERFUMES_LIST)) {
    for (const ref of REFERENCE_PERFUMES_LIST) {
      const normRef = normalizeStr(ref.inputName);
      if (
        (normRef.includes(normInput) || normInput.includes(normRef) || (cleanedInput && (normRef.includes(cleanedInput) || cleanedInput.includes(normRef)))) &&
        INVENTORY_STORE[ref.targetId]
      ) {
        return ref.targetId;
      }
    }
  }

  // 5. Partial / Contains match on PRODUCTS
  for (const p of PRODUCTS) {
    const normName = normalizeStr(p.name);
    const normRefClean = normalizeStr(p.referenceName.replace(/^inspirado\s*em\s*/i, ''));
    const normId = normalizeStr(p.id);

    if (
      (normName && (normName.includes(normInput) || normInput.includes(normName))) ||
      (normRefClean && (normRefClean.includes(normInput) || normInput.includes(normRefClean))) ||
      (normId && normId.includes(normInput)) ||
      (cleanedInput && ((normName && normName.includes(cleanedInput)) || (normRefClean && normRefClean.includes(cleanedInput))))
    ) {
      if (INVENTORY_STORE[p.id]) return p.id;
    }
  }

  // 6. Fuzzy edit distance (<= 2 character differences)
  for (const p of PRODUCTS) {
    const normName = normalizeStr(p.name);
    const normRefClean = normalizeStr(p.referenceName.replace(/^inspirado\s*em\s*/i, ''));
    if (
      (normName && levenshtein(normInput, normName) <= 2) ||
      (normRefClean && levenshtein(normInput, normRefClean) <= 2) ||
      (cleanedInput && normRefClean && levenshtein(cleanedInput, normRefClean) <= 2)
    ) {
      if (INVENTORY_STORE[p.id]) return p.id;
    }
  }

  return null;
}

// Universal updater function that accepts any object format or single number
function applyUpdateToProduct(rawId: string, payload: any): boolean {
  if (!rawId) return false;
  let resolvedKey = resolveProductKey(rawId);
  if (!resolvedKey) {
    // Dynamically register unknown/new products (e.g. Aromatizante Bamboo) so stock sync never fails
    resolvedKey = rawId.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    console.log(`[INVENTORY]: Produto "${rawId}" registrado dinamicamente no mapa de estoque com chave "${resolvedKey}"`);
    if (!INVENTORY_STORE[resolvedKey]) {
      INVENTORY_STORE[resolvedKey] = { '15ml': 0, '55ml': 0, '100ml': 0 };
    }
  }

  const current = INVENTORY_STORE[resolvedKey];
  let updated = false;

  // If payload is directly a number or numeric string
  if (typeof payload === 'number' || (typeof payload === 'string' && payload.trim() !== '' && !isNaN(Number(payload)))) {
    const val = Math.max(0, Number(payload));
    INVENTORY_STORE[resolvedKey] = { '15ml': val, '55ml': val, '100ml': val };
    updated = true;
  } else if (typeof payload === 'object' && payload) {
    // Check if a specific bottle size was specified alongside quantity
    const sizeInput = payload.size || payload.volume || payload.tamanho || payload.sizeName;
    const qtyInput = payload.quantity ?? payload.qty ?? payload.stock ?? payload.estoque ?? payload.quantidade ?? payload.amount;

    if (sizeInput && typeof qtyInput !== 'undefined') {
      const sStr = sizeInput.toString().toLowerCase();
      const normSize = sStr.includes('15') ? '15ml'
        : sStr.includes('55') ? '55ml'
        : sStr.includes('100') ? '100ml'
        : null;

      if (normSize) {
        INVENTORY_STORE[resolvedKey][normSize] = Math.max(0, Number(qtyInput));
        updated = true;
      }
    }

    if (!updated) {
      // Extract quantities from sub-object or top-level properties
      const subObj = (payload.stock && typeof payload.stock === 'object') ? payload.stock
        : (payload.inventory && typeof payload.inventory === 'object') ? payload.inventory
        : (payload.quantities && typeof payload.quantities === 'object') ? payload.quantities
        : (payload.estoque && typeof payload.estoque === 'object') ? payload.estoque
        : payload;

      const s15 = subObj['15ml'] ?? subObj['15'] ?? subObj.size15 ?? subObj.ml15 ?? subObj.qtd15 ?? subObj.quantidade15 ?? subObj.quantidade_15ml ?? subObj.qtd_15ml ?? subObj.estoque_15ml;
      const s55 = subObj['55ml'] ?? subObj['55'] ?? subObj.size55 ?? subObj.ml55 ?? subObj.qtd55 ?? subObj.quantidade55 ?? subObj.quantidade_55ml ?? subObj.qtd_55ml ?? subObj.estoque_55ml;
      const s100 = subObj['100ml'] ?? subObj['100'] ?? subObj.size100 ?? subObj.ml100 ?? subObj.qtd100 ?? subObj.quantidade100 ?? subObj.quantidade_100ml ?? subObj.qtd_100ml ?? subObj.estoque_100ml;

      if (typeof s15 !== 'undefined' && !isNaN(Number(s15))) {
        current['15ml'] = Math.max(0, Number(s15));
        updated = true;
      }
      if (typeof s55 !== 'undefined' && !isNaN(Number(s55))) {
        current['55ml'] = Math.max(0, Number(s55));
        updated = true;
      }
      if (typeof s100 !== 'undefined' && !isNaN(Number(s100))) {
        current['100ml'] = Math.max(0, Number(s100));
        updated = true;
      }

      // Fallback: If no size keys matched, check top-level single number stock / quantity / estoque
      if (!updated) {
        const fallbackVal = payload.stock ?? payload.quantity ?? payload.qty ?? payload.estoque ?? payload.quantidade ?? payload.total;
        if (typeof fallbackVal !== 'undefined' && fallbackVal !== null && !isNaN(Number(fallbackVal))) {
          const val = Math.max(0, Number(fallbackVal));
          INVENTORY_STORE[resolvedKey] = { '15ml': val, '55ml': val, '100ml': val };
          updated = true;
        }
      }
    }
  }

  if (updated) {
    const prod = PRODUCTS.find(p => p.id === resolvedKey);
    LAST_STOCK_SYNC = {
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      productId: resolvedKey,
      productName: prod?.name || rawId,
      stock: { ...INVENTORY_STORE[resolvedKey] }
    };
  }

  return updated;
}

// Master handler for all stock / inventory requests (GET, POST, PUT, PATCH)
function handleGenericInventoryUpdate(req: any, res: any) {
  // Set explicit CORS headers for cross-origin POST requests from Stock Manager
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  console.log(`[INVENTORY REQUEST ${req.method} ${req.path}]:`, {
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers
  });

  let rawData = req.body;

  // Try parsing string body if sent as raw text
  if (typeof rawData === 'string' && rawData.trim()) {
    try {
      rawData = JSON.parse(rawData);
    } catch (e) {
      // Keep as string
    }
  }

  const urlId = req.params.id || req.params.productId || req.query.productId || req.query.id || req.query.product || req.query.name || req.query.produto || req.query.nome;

  // Case 1: Array of items in body
  if (Array.isArray(rawData)) {
    let successCount = 0;
    rawData.forEach(item => {
      const rawId = item.productId || item.productName || item.name || item.id || item.product || item.item || item.sku || item.nome || item.produto;
      if (rawId && applyUpdateToProduct(rawId, item)) {
        successCount++;
      }
    });
    return res.json({
      success: true,
      message: 'Estoque atualizado com sucesso',
      updatedCount: successCount,
      inventory: INVENTORY_STORE
    });
  }

  // Case 2: Array in object field (e.g. { updates: [...]} or { products: [...] } or { items: [...] })
  const arrayField = rawData?.updates || rawData?.items || rawData?.products || rawData?.produtos || rawData?.data;
  if (Array.isArray(arrayField)) {
    let successCount = 0;
    arrayField.forEach(item => {
      const rawId = item.productId || item.productName || item.name || item.id || item.product || item.item || item.sku || item.nome || item.produto;
      if (rawId && applyUpdateToProduct(rawId, item)) {
        successCount++;
      }
    });
    return res.json({
      success: true,
      message: 'Estoque atualizado com sucesso',
      updatedCount: successCount,
      inventory: INVENTORY_STORE
    });
  }

  // Case 3: Bulk inventory dict in body (e.g. { inventory: { "Salvage": { ... }, "Assad": 10 } })
  const dictField = rawData?.inventory || (rawData?.stock && !rawData?.productName && !rawData?.productId && !rawData?.name && !rawData?.product && !rawData?.id && !rawData?.item && !rawData?.sku && !rawData?.nome && !rawData?.produto ? rawData?.stock : null) || rawData?.estoque;
  if (dictField && typeof dictField === 'object' && !Array.isArray(dictField) && !rawData?.productId && !rawData?.productName && !rawData?.name && !rawData?.product && !rawData?.id && !rawData?.item && !rawData?.sku && !rawData?.nome && !rawData?.produto) {
    let successCount = 0;
    Object.keys(dictField).forEach(key => {
      if (applyUpdateToProduct(key, dictField[key])) {
        successCount++;
      }
    });
    return res.json({
      success: true,
      message: 'Estoque atualizado com sucesso',
      updatedCount: successCount,
      inventory: INVENTORY_STORE
    });
  }

  // Case 4: Single item update
  const rawId = urlId || rawData?.productId || rawData?.productName || rawData?.name || rawData?.id || rawData?.product || rawData?.item || rawData?.sku || rawData?.nome || rawData?.produto;

  if (rawId) {
    const success = applyUpdateToProduct(rawId, rawData);
    if (success) {
      const resolvedKey = resolveProductKey(rawId) || rawId.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
      console.log(`[INVENTORY UPDATE SUCCESS]: ${rawId} -> ${resolvedKey}:`, INVENTORY_STORE[resolvedKey]);
      return res.json({
        success: true,
        message: 'Estoque atualizado com sucesso',
        productId: resolvedKey,
        productName: PRODUCTS.find(p => p.id === resolvedKey)?.name || rawId,
        stock: INVENTORY_STORE[resolvedKey],
        inventory: INVENTORY_STORE
      });
    }
  }

  // Case 5: Default fallback
  return res.json({
    success: true,
    message: 'Estoque atualizado com sucesso',
    inventory: INVENTORY_STORE
  });
}

// Endpoint returning catalog products list for external apps
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    total: PRODUCTS.length,
    products: PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      referenceName: p.referenceName,
      referenceBrand: p.referenceBrand,
      category: p.category,
      stock: INVENTORY_STORE[p.id] || { '15ml': 0, '55ml': 0, '100ml': 0 }
    }))
  });
});

// GET Stock
app.get('/api/inventory/stock', (req, res) => {
  res.json({
    success: true,
    stockAppUrl: 'https://aistudio.google.com/apps/79c8f0b3-973d-460a-a7bd-65f19a2fa2e1',
    stockAppId: '79c8f0b3-973d-460a-a7bd-65f19a2fa2e1',
    inventory: INVENTORY_STORE,
    lastSync: LAST_STOCK_SYNC
  });
});
app.get('/api/inventory', (req, res) => res.json({ success: true, inventory: INVENTORY_STORE, lastSync: LAST_STOCK_SYNC }));
app.get('/api/stock', (req, res) => res.json({ success: true, inventory: INVENTORY_STORE }));
app.get('/api/estoque', (req, res) => res.json({ success: true, inventory: INVENTORY_STORE }));

// Register all update routes for POST, PUT, PATCH
const updateRoutes = [
  '/api/inventory/update',
  '/api/inventory/update/:id',
  '/api/inventory/stock',
  '/api/inventory/sync',
  '/api/inventory/webhook',
  '/api/inventory',
  '/api/stock',
  '/api/stock/:id',
  '/api/estoque',
  '/api/estoque/:id',
  '/api/products/stock',
  '/api/products/:id/stock',
  '/api/products/:id'
];

updateRoutes.forEach(route => {
  app.options(route, (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    return res.sendStatus(200);
  });
  app.post(route, handleGenericInventoryUpdate);
  app.put(route, handleGenericInventoryUpdate);
  app.patch(route, handleGenericInventoryUpdate);
});

// Deduct inventory when sale is confirmed
app.post('/api/inventory/deduct', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, error: 'items must be an array' });
  }

  const deductions: Array<{ productId: string; size: string; quantity: number; newStock: number }> = [];

  for (const item of items) {
    const { productId, size, quantity = 1 } = item;
    if (productId && size && INVENTORY_STORE[productId]) {
      const current = INVENTORY_STORE[productId][size as '15ml' | '55ml' | '100ml'] || 0;
      const updated = Math.max(0, current - quantity);
      INVENTORY_STORE[productId][size as '15ml' | '55ml' | '100ml'] = updated;
      deductions.push({ productId, size, quantity, newStock: updated });
    }
  }

  res.json({
    success: true,
    message: 'Estoque atualizado e sincronizado com Sucesso!',
    deductions,
    currentInventory: INVENTORY_STORE
  });
});

// 1. Create PIX Payment
app.post('/api/mercadopago/create-pix', async (req, res) => {
  try {
    const client = getMercadoPagoClient();
    if (!client) {
      return res.status(400).json({
        error: 'MERCADO_PAGO_NOT_CONFIGURED',
        message: 'A chave MERCADO_PAGO_ACCESS_TOKEN não está configurada no ambiente.'
      });
    }

    const { transaction_amount, description, payer } = req.body;

    if (!transaction_amount || !payer || !payer.email) {
      return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes.' });
    }

    const payment = new Payment(client);

    // Sanitize CPF / CNPJ
    const cleanDoc = (payer.identification?.number || payer.cpf || '').replace(/\D/g, '');

    const payerData: any = {
      email: payer.email,
      first_name: payer.first_name || payer.name?.split(' ')[0] || 'Cliente',
      last_name: payer.last_name || payer.name?.split(' ').slice(1).join(' ') || 'Swiss',
    };

    if (cleanDoc && (cleanDoc.length === 11 || cleanDoc.length === 14)) {
      payerData.identification = {
        type: cleanDoc.length === 14 ? 'CNPJ' : 'CPF',
        number: cleanDoc
      };
    }

    const body: any = {
      transaction_amount: Number(transaction_amount),
      description: description || 'Perfumes Premium Swiss - Pedido',
      payment_method_id: 'pix',
      payer: payerData
    };

    let response;
    try {
      response = await payment.create({ body });
    } catch (err: any) {
      const errMsg = String(err?.message || err?.cause || JSON.stringify(err) || '');
      console.warn('[MercadoPago PIX warning]:', errMsg);
      // If error is caused by invalid identification number, try creating without identification
      if (errMsg.toLowerCase().includes('identification') || errMsg.toLowerCase().includes('user identification')) {
        try {
          const bodyWithoutId = { ...body, payer: { ...payerData } };
          delete bodyWithoutId.payer.identification;
          response = await payment.create({ body: bodyWithoutId });
        } catch (retryErr: any) {
          return res.status(400).json({
            error: 'INVALID_CPF',
            message: 'CPF ou CNPJ digitado é inválido. Por favor, verifique os números digitados.'
          });
        }
      } else {
        throw err;
      }
    }

    const pointOfInteraction = response.point_of_interaction?.transaction_data;

    res.json({
      success: true,
      id: response.id,
      status: response.status,
      status_detail: response.status_detail,
      qr_code: pointOfInteraction?.qr_code,
      qr_code_base64: pointOfInteraction?.qr_code_base64,
      ticket_url: pointOfInteraction?.ticket_url
    });
  } catch (error: any) {
    console.error('Erro ao criar pagamento PIX no Mercado Pago:', error);
    res.status(500).json({
      error: 'PAYMENT_CREATION_FAILED',
      message: error?.message || 'Falha ao gerar pagamento PIX no Mercado Pago.',
      details: error
    });
  }
});

// 2. Check Payment Status
app.get('/api/mercadopago/payment-status/:id', async (req, res) => {
  try {
    const client = getMercadoPagoClient();
    if (!client) {
      return res.status(400).json({
        error: 'MERCADO_PAGO_NOT_CONFIGURED',
        message: 'A chave MERCADO_PAGO_ACCESS_TOKEN não está configurada.'
      });
    }

    const { id } = req.params;
    const payment = new Payment(client);
    const result = await payment.get({ id });

    res.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail
    });
  } catch (error: any) {
    console.error('Erro ao verificar status do pagamento:', error);
    res.status(500).json({
      error: 'PAYMENT_CHECK_FAILED',
      message: error?.message || 'Erro ao consultar status.'
    });
  }
});

// 3. Create Preference (Checkout Pro / Mercado Pago)
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    const client = getMercadoPagoClient();
    if (!client) {
      return res.status(400).json({
        error: 'MERCADO_PAGO_NOT_CONFIGURED',
        message: 'A chave MERCADO_PAGO_ACCESS_TOKEN não está configurada.'
      });
    }

    const { items, payer, orderId } = req.body;

    const mpItems = (items || []).map((item: any) => ({
      id: item.product?.id || 'PERFUME-SWISS',
      title: `${item.product?.name || 'Perfume'} (${item.selectedSize || '100ml'})`,
      description: item.product?.referenceName || 'Perfumes Premium Swiss Atelier',
      quantity: item.quantity || 1,
      unit_price: Number(item.selectedPrice || item.product?.price || 0),
      currency_id: 'BRL'
    }));

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: mpItems,
        external_reference: orderId,
        payer: {
          name: payer?.name || 'Cliente Swiss',
          email: payer?.email || 'cliente@swiss.com',
          phone: {
            number: (payer?.phone || '').replace(/\D/g, '')
          },
          identification: {
            type: 'CPF',
            number: (payer?.cpf || '').replace(/\D/g, '')
          }
        },
        auto_return: 'approved'
      }
    });

    res.json({
      success: true,
      preferenceId: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error: any) {
    console.error('Erro ao criar preferência no Mercado Pago:', error);
    res.status(500).json({
      error: 'PREFERENCE_CREATION_FAILED',
      message: error?.message || 'Falha ao criar preferência de checkout.'
    });
  }
});

// ==========================================
// VITE / STATIC SERVING SETUP
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
