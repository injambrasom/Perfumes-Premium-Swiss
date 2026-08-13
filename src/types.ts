export type FragranceCategory = 'Masculino' | 'Feminino' | 'Árabe' | 'Nicho' | 'Unissex';

export type OlfactoryFamily = 
  | 'Amadeirado' 
  | 'Oriental / Âmbar' 
  | 'Oriental / Amadeirado'
  | 'Oriental Floral'
  | 'Oriental Amadeirado'
  | 'Oriental Ambarado'
  | 'Oriental Especiado'
  | 'Oriental Afrodisíaco'
  | 'Oriental Gourmand'
  | 'Oriental Âmbar'
  | 'Oriental Baunilha'
  | 'Oriental Amadeirado de Luxo'
  | 'Floral' 
  | 'Floral Oriental'
  | 'Floral Frutado Amadeirado'
  | 'Floral Frutado Cítrico'
  | 'Cítrico / Fresco' 
  | 'Cítrico Aquático'
  | 'Gourmand' 
  | 'Especiaço' 
  | 'Aquático / Ozônico' 
  | 'Aromático'
  | 'Amadeirado Aromático'
  | 'Amadeirado Frutado'
  | 'Amadeirado Frutado de Luxo'
  | 'Amadeirado Especiado'
  | 'Amadeirado Licoroso'
  | (string & {});

export type IntensityLevel = 'Suave' | 'Moderada' | 'Moderada a Intensa' | 'Refrescante / Intensa' | 'Intensa' | 'Marcante / Avassaladora' | (string & {});

export type PerfumeOccasion = 'Trabalho' | 'Encontro' | 'Festa' | 'Verão' | 'Inverno' | 'Assinatura' | 'Nicho' | 'Dia a Dia' | 'Sedução' | 'Exclusivo' | 'Esportes' | 'Primavera' | 'Balada' | (string & {});

export interface OlfactoryPyramid {
  topNotes: string[];    // Notas de Saída / Topo
  heartNotes: string[];  // Notas de Coração / Corpo
  baseNotes: string[];   // Notas de Fundo / Base
}

export interface FragranceProduct {
  id: string;
  name: string;             // Nome exclusivo Perfumes Premium Swiss (ex: "Swiss Icon No. 01")
  referenceName: string;    // Perfume de Referência (ex: "Inspirado em Bleu de Chanel")
  referenceBrand?: string;   // Marca de referência (ex: "Chanel")
  category: FragranceCategory;
  olfactoryFamily?: OlfactoryFamily;
  intensity?: IntensityLevel;
  occasions?: PerfumeOccasion[];
  pyramid?: OlfactoryPyramid;
  notes?: {
    top: string[];
    middle: string[];
    base: string[];
  };
  price: number;
  originalPrice?: number;
  volume?: string;           // ex: "100ml Extrait de Parfum"
  fixationHours?: string;    // ex: "12h - 16h na pele"
  projectionMeter?: string;  // ex: "Alta (2 metros)"
  rating: number;
  reviewsCount: number;
  image: string;
  fallbackUrl?: string;
  description: string;
  badges?: string[];        // ["Mais Vendido", "Escolha do Perfumista", "Lançamento"]
  inStock?: boolean;
  stockPerSize?: Record<BottleSize, number>;
  featuredInSignature?: boolean;
}

export type BottleSize = '15ml' | '55ml' | '100ml';

export interface BottleOption {
  size: BottleSize;
  price: number;
  label: string;
}

export const BOTTLE_OPTIONS: BottleOption[] = [
  { size: '15ml', price: 35.00, label: '15ml • R$ 35,00' },
  { size: '55ml', price: 80.00, label: '55ml • R$ 80,00' },
  { size: '100ml', price: 130.00, label: '100ml • R$ 130,00' },
];

export interface CartItem {
  product: FragranceProduct;
  quantity: number;
  selectedSize: BottleSize;
  selectedPrice: number;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  verified: boolean;
  rating: number;
  text: string;
  perfumeChosen: string;
  avatarUrl?: string;
}

export interface QuizState {
  gender?: FragranceCategory;
  occasion?: PerfumeOccasion;
  familyPreference?: OlfactoryFamily;
}
