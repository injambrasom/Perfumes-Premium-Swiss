import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import blackGoldMarbleBg from './assets/images/black_gold_marble_bg_1786232675565.jpg';
const LOGO_IMAGE_URL = 'https://i.postimg.cc/FKSJcM7t/Chat-GPT-Image-8-de-ago-de-2026-21-14-16.png';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ReferenceSearchModal } from './components/ReferenceSearchModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';
import { EssenceOrigin } from './components/EssenceOrigin';
import { WhySwiss } from './components/WhySwiss';
import { SignatureCollection } from './components/SignatureCollection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { OlfactoryExperience } from './components/OlfactoryExperience';
import { TrioBundleBuilder } from './components/TrioBundleBuilder';
import { Testimonials } from './components/Testimonials';
import { InstagramGallery } from './components/InstagramGallery';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PurchasingPolicyModal } from './components/PurchasingPolicyModal';
import { FloatingWhatsapp } from './components/FloatingWhatsapp';
import { PRODUCTS } from './data/products';
import { FragranceProduct, CartItem, BottleSize } from './types';
import { subscribeToInventory } from './lib/firebase';

export default function App() {
  const [products, setProducts] = useState<FragranceProduct[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrioModalOpen, setIsTrioModalOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FragranceProduct | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastSyncInfo, setLastSyncInfo] = useState<{
    timestamp: string;
    productName: string;
    stock: { '15ml': number; '55ml': number; '100ml': number };
  } | null>(null);

  // Real-time stock polling backup from backend
  const fetchLiveInventory = async () => {
    try {
      const res = await fetch('/api/inventory/stock').catch(() => null);
      if (!res || !res.ok) return;
      const data = await res.json();
      if (data.success && data.inventory) {
        const invMap = data.inventory;
        if (data.lastSync) {
          setLastSyncInfo(data.lastSync);
        }
        setProducts((prev) =>
          prev.map((p) => {
            const stock = invMap[p.id];
            if (!stock) return p;
            const hasStock = stock['15ml'] > 0 || stock['55ml'] > 0 || stock['100ml'] > 0;
            return {
              ...p,
              stockPerSize: stock,
              inStock: hasStock
            };
          })
        );
      }
    } catch {
      // Ignore transient fetch errors as Firebase handles real-time sync
    }
  };

  useEffect(() => {
    // Initial fetch from server API
    fetchLiveInventory();

    // Subscribe to Firebase Firestore & RTDB real-time updates for instant desktop/mobile sync
    const unsubscribeFirebase = subscribeToInventory((invMap) => {
      setProducts((prev) =>
        prev.map((p) => {
          const stock = invMap[p.id];
          if (!stock) return p;
          const hasStock = stock['15ml'] > 0 || stock['55ml'] > 0 || stock['100ml'] > 0;
          return {
            ...p,
            stockPerSize: stock,
            inStock: hasStock
          };
        })
      );
    });

    // Backup polling every 30s instead of 3s to avoid overwriting real-time Firebase data
    const interval = setInterval(fetchLiveInventory, 30000);

    return () => {
      unsubscribeFirebase();
      clearInterval(interval);
    };
  }, []);

  // Sync active selected product modal with updated live stock
  const currentSelectedProduct = selectedProduct
    ? products.find((p) => p.id === selectedProduct.id) || selectedProduct
    : null;

  // Cart Handlers
  const handleAddToCart = (
    product: FragranceProduct,
    quantity = 1,
    selectedSize: BottleSize = '100ml',
    selectedPrice = 130.00
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize, selectedPrice }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        const key = `${item.product.id}-${item.selectedSize || '100ml'}`;
        return key === itemKey ? { ...item, quantity } : item;
      })
    );
  };

  const handleRemoveItem = (itemKey: string) => {
    setCartItems((prev) =>
      prev.filter((item) => `${item.product.id}-${item.selectedSize || '100ml'}` !== itemKey)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleChoosePerfumeScroll = () => {
    const el = document.getElementById('signature-collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppDirect = () => {
    const text = 'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de atendimento exclusivo com um consultor olfativo.';
    window.open(
      `https://wa.me/5554999893370?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-black text-white font-sans selection:bg-[#C5A059] selection:text-white antialiased">
      {/* Real Black Obsidian & Gold Vein Marble Texture Background across the entire site while scrolling */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img 
          src={blackGoldMarbleBg} 
          alt="Textura Mármore Preto e Dourado" 
          style={{
            filter: 'contrast(1.4) brightness(1.3) saturate(1.25)',
            WebkitFilter: 'contrast(1.4) brightness(1.3) saturate(1.25)'
          }}
          className="w-full h-full object-cover object-center opacity-95 scale-105 fixed inset-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.22)_0%,_transparent_75%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        {/* Header Navigation */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenTrioBuilder={() => setIsTrioModalOpen(true)}
          onOpenPolicy={() => setIsPolicyOpen(true)}
          onOpenWhatsApp={handleWhatsAppDirect}
          cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

      {/* Main Content */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onChoosePerfume={handleChoosePerfumeScroll}
          onOpenWhatsApp={handleWhatsAppDirect}
          onOpenTrioBuilder={() => setIsTrioModalOpen(true)}
        />

        {/* 2. Destaques & Catálogo Principal */}
        <SignatureCollection
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onOpenTrioBuilder={() => setIsTrioModalOpen(true)}
        />

        {/* 3. Trio de Bolso (3x 15ml por R$ 89,90) */}
        <div id="trio-bolso-builder" className="py-12 bg-[#08080C] border-y border-white/10">
          <TrioBundleBuilder
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* 4. Categorias em Destaque */}
        <CategoryShowcase onSelectCategory={setActiveCategory} />

        {/* 5. Por Que Perfumes Premium Swiss? */}
        <WhySwiss />

        {/* 6. Quiz Olfativo Banner */}
        <section className="py-16 bg-gradient-to-r from-black via-[#121218] to-black text-white border-y border-white/10 text-center px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">
              DESCUBRA SUA ASSINATURA OLFATIVA
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal">
              Qual perfume combina com você?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
              Responda algumas perguntas e descubra as fragrâncias que mais combinam com o seu estilo e personalidade.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="px-8 py-3.5 bg-white text-black hover:bg-[#C5A059] transition-all duration-300 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg inline-flex items-center gap-2"
              >
                <span>FAZER O QUIZ OLFATIVO</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. Origem & Transparência */}
        <EssenceOrigin onExploreCollection={handleChoosePerfumeScroll} />

        {/* 8. Avaliações e Clientes Satisfeitos */}
        <Testimonials />

        {/* 9. CTA Final de Fechamento */}
        <section className="py-20 bg-black text-white text-center border-t border-white/10 px-4">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="font-serif text-2xl sm:text-4xl font-normal">
              ENCONTRE SUA PRÓXIMA FRAGRÂNCIA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light">
              Essências importadas, 36% de concentração Extrait de Parfum e consultoria olfativa via WhatsApp.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleChoosePerfumeScroll}
                className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-[#C5A059] transition-all text-xs font-bold uppercase tracking-[0.2em] cursor-pointer"
              >
                EXPLORAR FRAGRÂNCIAS
              </button>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer"
              >
                FALE COM UM CONSULTOR
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0B0B] text-white border-t border-neutral-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-neutral-800">
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#C5A059]/70 overflow-hidden shrink-0 p-0.5 bg-black shadow-xl">
                  <img 
                    src={LOGO_IMAGE_URL} 
                    alt="Logo Perfumes Premium Swiss" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="block font-serif text-base sm:text-lg tracking-[0.2em] font-medium text-white uppercase leading-snug">
                    PERFUMES PREMIUM SWISS
                  </span>
                  <span className="block text-[10px] font-sans tracking-[0.35em] font-light text-[#C5A059] uppercase mt-0.5">
                    SWISS ATELIER
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed pt-2">
                Ateliê de alta perfumaria com essências importadas das mais respeitadas casas da Suíça e da França.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
                Coleções
              </h4>
              <ul className="space-y-2 text-xs font-light text-neutral-400">
                <li>
                  <button onClick={() => { setActiveCategory('Masculino'); handleChoosePerfumeScroll(); }} className="hover:text-white transition-colors cursor-pointer">
                    Perfumes Masculinos
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Feminino'); handleChoosePerfumeScroll(); }} className="hover:text-white transition-colors cursor-pointer">
                    Perfumes Femininos
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Árabe'); handleChoosePerfumeScroll(); }} className="hover:text-white transition-colors cursor-pointer">
                    Coleção Árabe Opulenta
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('Nicho'); handleChoosePerfumeScroll(); }} className="hover:text-white transition-colors cursor-pointer">
                    Perfumaria de Nicho
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
                Consultoria &amp; Institucional
              </h4>
              <ul className="space-y-2 text-xs font-light text-neutral-400">
                <li>
                  <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                    <span>Busca por Referência</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsQuizOpen(true)} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                    <span>Quiz Olfativo Personalizado</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPolicyOpen(true)} className="hover:text-[#C5A059] transition-colors flex items-center gap-1 font-medium text-neutral-300 cursor-pointer">
                    <span>📜 Política de Compras</span>
                  </button>
                </li>
                <li>
                  <a
                    href={`https://wa.me/5554999893370?text=${encodeURIComponent(
                      'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de uma consultoria olfativa personalizada.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400"
                  >
                    <span>WhatsApp Executivo 24h</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
                Garantia &amp; Qualidade
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Extrait de Parfum com 36% de essência pura em todos os tamanhos (15ml, 55ml e 100ml). Fixação comprovada de 8h a 12h+ na pele.
              </p>
            </div>
          </div>

          {/* Logo Seal Banner */}
          <div className="py-8 my-6 border-y border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left bg-black/40 backdrop-blur-xs px-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#C5A059]/60 shadow-[0_0_25px_rgba(197,160,89,0.3)] overflow-hidden shrink-0 p-1 bg-black">
              <img 
                src={LOGO_IMAGE_URL} 
                alt="Selo Perfumes Premium Swiss" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl tracking-[0.25em] text-white uppercase font-medium">
                PERFUMES PREMIUM SWISS
              </span>
              <span className="block text-xs font-sans tracking-[0.4em] text-[#C5A059] uppercase mt-1">
                SWISS ATELIER • ESSÊNCIAS PREMIUM
              </span>
              <p className="text-xs text-neutral-400 font-light mt-2 max-w-md">
                Qualidade e pureza olfativa com 36% de essência pura (Extrait de Parfum) importada.
              </p>
            </div>
          </div>

          {/* Discrete Required Legal Provenance Disclaimer */}
          <div className="py-8 text-center border-b border-neutral-800">
            <p className="text-xs text-neutral-400 font-light tracking-wider italic max-w-2xl mx-auto leading-relaxed">
              &ldquo;Essências provenientes de casas internacionais reconhecidas pela excelência em perfumaria.&rdquo;
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <p>© {new Date().getFullYear()} PERFUMES PREMIUM SWISS ATELIER.</p>
              <button
                onClick={() => setIsPolicyOpen(true)}
                className="hover:text-[#C5A059] transition-colors underline decoration-neutral-700 underline-offset-4 cursor-pointer"
              >
                Política de Compras
              </button>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#C5A059] hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
            >
              Voltar ao Topo ↑
            </button>
          </div>

        </div>
      </footer>

      {/* Modals & Drawers */}
      <ReferenceSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
        }}
      />

      <FragranceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={(product) => {
          setSelectedProduct(product);
        }}
      />

      <ProductDetailModal
        product={currentSelectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty, size, price) => handleAddToCart(p, qty, size, price)}
        onOpenTrioBuilder={() => setIsTrioModalOpen(true)}
      />

      {/* Trio Bundle Overlay Modal */}
      {isTrioModalOpen && (
        <TrioBundleBuilder
          products={products}
          onAddToCart={handleAddToCart}
          isModal={true}
          onClose={() => setIsTrioModalOpen(false)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartItems.reduce((acc, curr) => acc + (curr.selectedPrice || curr.product.price) * curr.quantity, 0)}
        freightCost={0}
        total={cartItems.reduce((acc, curr) => acc + (curr.selectedPrice || curr.product.price) * curr.quantity, 0)}
        onClearCart={handleClearCart}
        onOpenPolicy={() => setIsPolicyOpen(true)}
      />

      <PurchasingPolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsapp />
      </div>
    </div>
  );
}
