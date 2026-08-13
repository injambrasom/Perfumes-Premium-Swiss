import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import {
  getDatabase,
  ref as rtdbRef,
  onValue as rtdbOnValue,
  set as rtdbSet
} from 'firebase/database';
import firebaseConfig from '../../firebase-applet-config.json';
import { INITIAL_INVENTORY, ProductStockData } from '../data/inventory';
import {
  resolveSiteProductId,
  resolveAllSiteProductIds,
  getStockAppName
} from '../data/productStockMapping';

// Initialize Firebase App
const app = getApps().length === 0
  ? initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
      databaseURL: `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`
    })
  : getApps()[0];

// The primary target Firestore Database ID from the stock app URL
const stockAppDbId = 'ai-studio-79c8f0b3-973d-460a-a7bd-65f19a2fa2e1';

const KNOWN_DB_IDS = [
  stockAppDbId,
  'ai-studio-perfumespremiums-6b624074-dcce-4860-ae88-a993437e77d4',
  'ai-studio-17618b9e-e7f0-4f06-a97d-e8f3beb2a9ed',
  'ai-studio-7dedab88-7035-4b33-b9c6-c1d7d93b354c',
  'ai-studio-d8993257-87b4-4958-96a8-af55f8c41b78',
  'ai-studio-dadc6e28-d8ba-4abf-9c7b-57bf06cd736b'
];

export const defaultDb = getFirestore(app);
export const db = getFirestore(app, stockAppDbId);

export const allFirestoreInstances = [
  db,
  defaultDb,
  ...KNOWN_DB_IDS.map((id) => {
    try { return getFirestore(app, id); } catch { return null; }
  }).filter(Boolean) as any[]
];

export const rtdb = getDatabase(app);

export type InventoryStoreMap = Record<string, ProductStockData>;

/**
 * Helper to safely extract quantity from various key patterns without returning 0 if key not found
 */
function extractQuantity(data: any, keys: string[]): number | undefined {
  if (!data || typeof data !== 'object') return undefined;
  for (const k of keys) {
    if (data[k] !== undefined && data[k] !== null) {
      const parsed = Number(data[k]);
      if (!isNaN(parsed)) return parsed;
    }
  }
  for (const subKey of ['estoque', 'stock', 'quantidades', 'qtd', 'frascos', 'tamanhos']) {
    if (data[subKey] && typeof data[subKey] === 'object') {
      for (const k of keys) {
        if (data[subKey][k] !== undefined && data[subKey][k] !== null) {
          const parsed = Number(data[subKey][k]);
          if (!isNaN(parsed)) return parsed;
        }
      }
    }
  }
  return undefined;
}

const KEYS_15ML = [
  '15ml', '15ML', 'qtd15ml', 'quantidade15ml', '15_ml', 'ml15', 'v15ml',
  'qtd_15ml', 'quant15ml', 'tam15', 'tam15ml', '15', 'stock15ml', 'stock_15ml',
  'qntd15ml', 'qnt15ml', 'f15ml', 'frasco15ml', 'qtd15', '15ml_qtd', '15ml_stock', '15ml_estoque'
];

const KEYS_55ML = [
  '55ml', '55ML', 'qtd55ml', 'quantidade55ml', '55_ml', 'ml55', 'v55ml',
  'qtd_55ml', 'quant55ml', 'tam55', 'tam55ml', '55', 'stock55ml', 'stock_55ml',
  'qntd55ml', 'qnt55ml', 'f55ml', 'frasco55ml', 'qtd55', '55ml_qtd', '55ml_stock', '55ml_estoque'
];

const KEYS_100ML = [
  '100ml', '100ML', 'qtd100ml', 'quantidade100ml', '100_ml', 'ml100', 'v100ml',
  'qtd_100ml', 'quant100ml', 'tam100', 'tam100ml', '100', 'stock100ml', 'stock_100ml',
  'qntd100ml', 'qnt100ml', 'f100ml', 'frasco100ml', 'qtd100', '100ml_qtd', '100ml_stock', '100ml_estoque'
];

/**
 * Seed Firestore inventory collection with initial stock only if database is completely empty
 */
export async function seedInitialInventoryIfEmpty(): Promise<void> {
  try {
    const colRef = collection(db, 'inventory');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      const promises = Object.entries(INITIAL_INVENTORY).map(([productId, stock]) => {
        const docRef = doc(db, 'inventory', productId);
        return setDoc(docRef, {
          '15ml': stock['15ml'],
          '55ml': stock['55ml'],
          '100ml': stock['100ml'],
          updatedAt: new Date().toISOString()
        });
      });
      await Promise.all(promises);
    }
  } catch (_error) {
    // Silently ignore if collection is read-only or managed by stock app
  }
}

/**
 * Subscribe to real-time inventory updates from Firestore and Realtime DB
 */
export function subscribeToInventory(
  onUpdate: (inventory: InventoryStoreMap) => void,
  onError?: (err: any) => void
): () => void {
  seedInitialInventoryIfEmpty().catch(() => {});

  const candidateCollections = ['inventory', 'produtos', 'estoque', 'products', 'perfumes', 'items'];
  const unsubscribes: Array<() => void> = [];
  const accumMap: InventoryStoreMap = {};

  allFirestoreInstances.forEach((database) => {
    candidateCollections.forEach((colName) => {
      try {
        const colRef = collection(database, colName);
        const unsub = onSnapshot(
          colRef,
          (snapshot) => {
            let hasChanges = false;
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const docName = docSnap.id;

              const targetProductIds = [
                ...resolveAllSiteProductIds(docName),
                ...resolveAllSiteProductIds(data.name || data.nome || data.produto || data.title || '')
              ].filter((v, i, a) => a.indexOf(v) === i);

              const q15 = extractQuantity(data, KEYS_15ML);
              const q55 = extractQuantity(data, KEYS_55ML);
              const q100 = extractQuantity(data, KEYS_100ML);

              if (q15 !== undefined || q55 !== undefined || q100 !== undefined) {
                targetProductIds.forEach((targetProductId) => {
                  const current = accumMap[targetProductId] || { '15ml': 0, '55ml': 0, '100ml': 0 };
                  accumMap[targetProductId] = {
                    '15ml': q15 !== undefined ? q15 : current['15ml'],
                    '55ml': q55 !== undefined ? q55 : current['55ml'],
                    '100ml': q100 !== undefined ? q100 : current['100ml']
                  };
                });
                hasChanges = true;
              }
            });

            if (hasChanges && Object.keys(accumMap).length > 0) {
              onUpdate({ ...accumMap });
            }
          },
          (err) => {
            if (onError) onError(err);
          }
        );
        unsubscribes.push(unsub);
      } catch (e) {
        // ignore
      }
    });
  });

  candidateCollections.forEach((colName) => {
    try {
      const dbRef = rtdbRef(rtdb, colName);
      const unsubRtdb = rtdbOnValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (val && typeof val === 'object') {
          let hasChanges = false;
          Object.entries(val).forEach(([docKey, data]: [string, any]) => {
            if (!data) return;
            const targetProductIds = [
              ...resolveAllSiteProductIds(docKey),
              ...resolveAllSiteProductIds(data.name || data.nome || data.produto || '')
            ].filter((v, i, a) => a.indexOf(v) === i);

            const q15 = extractQuantity(data, KEYS_15ML);
            const q55 = extractQuantity(data, KEYS_55ML);
            const q100 = extractQuantity(data, KEYS_100ML);

            if (q15 !== undefined || q55 !== undefined || q100 !== undefined) {
              targetProductIds.forEach((targetProductId) => {
                const current = accumMap[targetProductId] || { '15ml': 0, '55ml': 0, '100ml': 0 };
                accumMap[targetProductId] = {
                  '15ml': q15 !== undefined ? q15 : current['15ml'],
                  '55ml': q55 !== undefined ? q55 : current['55ml'],
                  '100ml': q100 !== undefined ? q100 : current['100ml']
                };
              });
              hasChanges = true;
            }
          });
          if (hasChanges && Object.keys(accumMap).length > 0) {
            onUpdate({ ...accumMap });
          }
        }
      });
      unsubscribes.push(() => unsubRtdb());
    } catch {
      // ignore
    }
  });

  return () => {
    unsubscribes.forEach((fn) => fn());
  };
}

/**
 * Update stock for a specific product in Firestore and Realtime DB
 */
export async function updateProductStockInFirebase(
  productId: string,
  stock: ProductStockData
): Promise<void> {
  try {
    const stockAppName = getStockAppName(productId);
    const payload = {
      '15ml': stock['15ml'],
      '55ml': stock['55ml'],
      '100ml': stock['100ml'],
      updatedAt: new Date().toISOString()
    };

    allFirestoreInstances.forEach((activeDb) => {
      ['inventory', 'produtos', 'estoque', 'products'].forEach(async (colName) => {
        try {
          const docRef = doc(activeDb, colName, productId);
          await setDoc(docRef, payload, { merge: true });
          if (stockAppName !== productId) {
            const appDocRef = doc(activeDb, colName, stockAppName);
            await setDoc(appDocRef, payload, { merge: true });
          }
        } catch {
          // ignore
        }
      });
    });

    try {
      await rtdbSet(rtdbRef(rtdb, `inventory/${productId}`), payload);
      if (stockAppName !== productId) {
        await rtdbSet(rtdbRef(rtdb, `inventory/${stockAppName}`), payload);
      }
    } catch {
      // ignore
    }
  } catch (error) {
    console.error(`[FIREBASE]: Error updating stock for product ${productId}:`, error);
  }
}

/**
 * Deduct stock when an order is completed
 */
export async function deductStockInFirebase(
  items: Array<{ productId: string; size: '15ml' | '55ml' | '100ml'; quantity: number }>
): Promise<void> {
  try {
    for (const item of items) {
      if (!item.productId || !item.size) continue;
      const stockAppName = getStockAppName(item.productId);

      allFirestoreInstances.forEach(async (activeDb) => {
        ['inventory', 'produtos', 'estoque'].forEach(async (colName) => {
          try {
            const docRef = doc(activeDb, colName, item.productId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              const currentQty = Number(data[item.size] ?? 0);
              const newQty = Math.max(0, currentQty - item.quantity);
              await updateDoc(docRef, {
                [item.size]: newQty,
                updatedAt: new Date().toISOString()
              });
            }

            if (stockAppName !== item.productId) {
              const appDocRef = doc(activeDb, colName, stockAppName);
              const appDocSnap = await getDoc(appDocRef);
              if (appDocSnap.exists()) {
                const data = appDocSnap.data();
                const currentQty = Number(data[item.size] ?? 0);
                const newQty = Math.max(0, currentQty - item.quantity);
                await updateDoc(appDocRef, {
                  [item.size]: newQty,
                  updatedAt: new Date().toISOString()
                });
              }
            }
          } catch {
            // ignore
          }
        });
      });
    }
  } catch (error) {
    console.error('[FIREBASE]: Error deducting stock in Firestore:', error);
  }
}
