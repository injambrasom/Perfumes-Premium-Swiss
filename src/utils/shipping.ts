export type ShippingService = 'PAC' | 'Sedex';

export interface ShippingOption {
  id: ShippingService;
  name: string;
  carrier: string;
  badge?: string;
  price: number;
  deadlineDaysMin: number;
  deadlineDaysMax: number;
  deadlineText: string;
  description: string;
}

interface RegionRates {
  regionName: string;
  pacBasePrice: number;
  pacMinDays: number;
  pacMaxDays: number;
  sedexBasePrice: number;
  sedexMinDays: number;
  sedexMaxDays: number;
}

const REGION_RATES: Record<string, RegionRates> = {
  // SP (Estado de envio prioritário)
  SP: {
    regionName: 'São Paulo (Local)',
    pacBasePrice: 16.90,
    pacMinDays: 3,
    pacMaxDays: 5,
    sedexBasePrice: 24.90,
    sedexMinDays: 1,
    sedexMaxDays: 2,
  },
  // Sudeste (RJ, MG, ES)
  RJ: { regionName: 'Sudeste', pacBasePrice: 19.90, pacMinDays: 4, pacMaxDays: 6, sedexBasePrice: 29.90, sedexMinDays: 2, sedexMaxDays: 3 },
  MG: { regionName: 'Sudeste', pacBasePrice: 19.90, pacMinDays: 4, pacMaxDays: 6, sedexBasePrice: 29.90, sedexMinDays: 2, sedexMaxDays: 3 },
  ES: { regionName: 'Sudeste', pacBasePrice: 21.90, pacMinDays: 4, pacMaxDays: 7, sedexBasePrice: 32.90, sedexMinDays: 2, sedexMaxDays: 4 },
  
  // Sul (PR, SC, RS)
  PR: { regionName: 'Sul', pacBasePrice: 21.90, pacMinDays: 4, pacMaxDays: 6, sedexBasePrice: 32.90, sedexMinDays: 2, sedexMaxDays: 3 },
  SC: { regionName: 'Sul', pacBasePrice: 22.90, pacMinDays: 4, pacMaxDays: 7, sedexBasePrice: 34.90, sedexMinDays: 2, sedexMaxDays: 4 },
  RS: { regionName: 'Sul', pacBasePrice: 24.90, pacMinDays: 5, pacMaxDays: 7, sedexBasePrice: 36.90, sedexMinDays: 2, sedexMaxDays: 4 },

  // Centro-Oeste (DF, GO, MS, MT)
  DF: { regionName: 'Centro-Oeste', pacBasePrice: 26.90, pacMinDays: 5, pacMaxDays: 8, sedexBasePrice: 39.90, sedexMinDays: 2, sedexMaxDays: 4 },
  GO: { regionName: 'Centro-Oeste', pacBasePrice: 26.90, pacMinDays: 5, pacMaxDays: 8, sedexBasePrice: 39.90, sedexMinDays: 2, sedexMaxDays: 4 },
  MS: { regionName: 'Centro-Oeste', pacBasePrice: 28.90, pacMinDays: 6, pacMaxDays: 9, sedexBasePrice: 42.90, sedexMinDays: 3, sedexMaxDays: 5 },
  MT: { regionName: 'Centro-Oeste', pacBasePrice: 29.90, pacMinDays: 6, pacMaxDays: 10, sedexBasePrice: 44.90, sedexMinDays: 3, sedexMaxDays: 5 },

  // Nordeste
  BA: { regionName: 'Nordeste', pacBasePrice: 29.90, pacMinDays: 6, pacMaxDays: 10, sedexBasePrice: 46.90, sedexMinDays: 3, sedexMaxDays: 5 },
  PE: { regionName: 'Nordeste', pacBasePrice: 31.90, pacMinDays: 7, pacMaxDays: 11, sedexBasePrice: 49.90, sedexMinDays: 3, sedexMaxDays: 6 },
  CE: { regionName: 'Nordeste', pacBasePrice: 32.90, pacMinDays: 7, pacMaxDays: 11, sedexBasePrice: 51.90, sedexMinDays: 3, sedexMaxDays: 6 },
  RN: { regionName: 'Nordeste', pacBasePrice: 33.90, pacMinDays: 7, pacMaxDays: 12, sedexBasePrice: 52.90, sedexMinDays: 3, sedexMaxDays: 6 },
  PB: { regionName: 'Nordeste', pacBasePrice: 33.90, pacMinDays: 7, pacMaxDays: 12, sedexBasePrice: 52.90, sedexMinDays: 3, sedexMaxDays: 6 },
  AL: { regionName: 'Nordeste', pacBasePrice: 32.90, pacMinDays: 7, pacMaxDays: 11, sedexBasePrice: 50.90, sedexMinDays: 3, sedexMaxDays: 6 },
  SE: { regionName: 'Nordeste', pacBasePrice: 31.90, pacMinDays: 7, pacMaxDays: 11, sedexBasePrice: 49.90, sedexMinDays: 3, sedexMaxDays: 6 },
  PI: { regionName: 'Nordeste', pacBasePrice: 34.90, pacMinDays: 8, pacMaxDays: 12, sedexBasePrice: 54.90, sedexMinDays: 4, sedexMaxDays: 7 },
  MA: { regionName: 'Nordeste', pacBasePrice: 35.90, pacMinDays: 8, pacMaxDays: 13, sedexBasePrice: 56.90, sedexMinDays: 4, sedexMaxDays: 7 },

  // Norte
  TO: { regionName: 'Norte', pacBasePrice: 36.90, pacMinDays: 8, pacMaxDays: 13, sedexBasePrice: 56.90, sedexMinDays: 4, sedexMaxDays: 7 },
  PA: { regionName: 'Norte', pacBasePrice: 38.90, pacMinDays: 9, pacMaxDays: 14, sedexBasePrice: 59.90, sedexMinDays: 4, sedexMaxDays: 8 },
  RO: { regionName: 'Norte', pacBasePrice: 39.90, pacMinDays: 9, pacMaxDays: 14, sedexBasePrice: 62.90, sedexMinDays: 4, sedexMaxDays: 8 },
  AM: { regionName: 'Norte', pacBasePrice: 42.90, pacMinDays: 10, pacMaxDays: 15, sedexBasePrice: 66.90, sedexMinDays: 4, sedexMaxDays: 8 },
  AC: { regionName: 'Norte', pacBasePrice: 44.90, pacMinDays: 10, pacMaxDays: 16, sedexBasePrice: 69.90, sedexMinDays: 5, sedexMaxDays: 9 },
  RR: { regionName: 'Norte', pacBasePrice: 46.90, pacMinDays: 11, pacMaxDays: 17, sedexBasePrice: 72.90, sedexMinDays: 5, sedexMaxDays: 9 },
  AP: { regionName: 'Norte', pacBasePrice: 44.90, pacMinDays: 10, pacMaxDays: 16, sedexBasePrice: 69.90, sedexMinDays: 5, sedexMaxDays: 9 },
};

const DEFAULT_RATES: RegionRates = {
  regionName: 'Nacional',
  pacBasePrice: 24.90,
  pacMinDays: 5,
  pacMaxDays: 8,
  sedexBasePrice: 37.90,
  sedexMinDays: 2,
  sedexMaxDays: 4,
};

/**
 * Deduz o estado (UF) pelo prefixo de 8 dígitos do CEP brasileiro
 */
export function inferStateFromCep(cleanCep: string): string | null {
  if (!cleanCep || cleanCep.length < 2) return null;
  const num = parseInt(cleanCep.padEnd(8, '0'), 10);

  if (num >= 1000000 && num <= 19999999) return 'SP';
  if (num >= 20000000 && num <= 28999999) return 'RJ';
  if (num >= 29000000 && num <= 29999999) return 'ES';
  if (num >= 30000000 && num <= 39999999) return 'MG';
  if (num >= 40000000 && num <= 48999999) return 'BA';
  if (num >= 49000000 && num <= 49999999) return 'SE';
  if (num >= 50000000 && num <= 56999999) return 'PE';
  if (num >= 57000000 && num <= 57999999) return 'AL';
  if (num >= 58000000 && num <= 58999999) return 'PB';
  if (num >= 59000000 && num <= 59999999) return 'RN';
  if (num >= 60000000 && num <= 63999999) return 'CE';
  if (num >= 64000000 && num <= 64999999) return 'PI';
  if (num >= 65000000 && num <= 65999999) return 'MA';
  if (num >= 66000000 && num <= 68899999) return 'PA';
  if (num >= 68900000 && num <= 68999999) return 'AP';
  if ((num >= 69000000 && num <= 69299999) || (num >= 69400000 && num <= 69899999)) return 'AM';
  if (num >= 69300000 && num <= 69399999) return 'RR';
  if (num >= 69900000 && num <= 69999999) return 'AC';
  if ((num >= 70000000 && num <= 72799999) || (num >= 73000000 && num <= 73399999)) return 'DF';
  if ((num >= 72800000 && num <= 72999999) || (num >= 73400000 && num <= 76799999)) return 'GO';
  if (num >= 76800000 && num <= 76999999) return 'RO';
  if (num >= 77000000 && num <= 77999999) return 'TO';
  if (num >= 78000000 && num <= 78899999) return 'MT';
  if (num >= 79000000 && num <= 79999999) return 'MS';
  if (num >= 80000000 && num <= 87999999) return 'PR';
  if (num >= 88000000 && num <= 89999999) return 'SC';
  if (num >= 90000000 && num <= 99999999) return 'RS';

  return null;
}

/**
 * Calcula as opções de PAC e Sedex para um estado e quantidade de itens.
 */
export function calculateShippingOptions(
  ufOrCep: string,
  itemCount: number = 1
): ShippingOption[] {
  const cleanInput = (ufOrCep || '').trim().toUpperCase();
  let state = cleanInput;

  // Se veio CEP em vez de UF, deduz o estado
  if (cleanInput.replace(/\D/g, '').length >= 5) {
    const deduced = inferStateFromCep(cleanInput.replace(/\D/g, ''));
    if (deduced) state = deduced;
  }

  const rates = REGION_RATES[state] || DEFAULT_RATES;
  
  // Adicional marginal leve por frasco extra no carrinho (peso volumétrico)
  const extraItems = Math.max(0, itemCount - 1);
  const pacExtra = Number((extraItems * 2.00).toFixed(2));
  const sedexExtra = Number((extraItems * 3.00).toFixed(2));

  const pacTotal = Number((rates.pacBasePrice + pacExtra).toFixed(2));
  const sedexTotal = Number((rates.sedexBasePrice + sedexExtra).toFixed(2));

  return [
    {
      id: 'PAC',
      name: 'PAC Correios',
      carrier: 'Correios',
      badge: 'Econômico',
      price: pacTotal,
      deadlineDaysMin: rates.pacMinDays,
      deadlineDaysMax: rates.pacMaxDays,
      deadlineText: `${rates.pacMinDays} a ${rates.pacMaxDays} dias úteis`,
      description: 'Entrega padrão com código de rastreamento'
    },
    {
      id: 'Sedex',
      name: 'Sedex Expresso',
      carrier: 'Correios Express',
      badge: 'Mais Rápido',
      price: sedexTotal,
      deadlineDaysMin: rates.sedexMinDays,
      deadlineDaysMax: rates.sedexMaxDays,
      deadlineText: `${rates.sedexMinDays} a ${rates.sedexMaxDays} dias úteis`,
      description: 'Envio prioritário com entrega expressa'
    }
  ];
}
