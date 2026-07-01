import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  Sparkles, 
  ShoppingBag, 
  Trash2, 
  ShieldCheck, 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Info,
  Layers,
  Award,
  Waves,
  HeartHandshake
} from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CheckoutFlow from './components/CheckoutFlow';
import Footer from './components/Footer';
import BubbleBackground from './components/BubbleBackground';
import ProductVisual from './components/ProductVisual';

export default function App() {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout & Detail Modal States
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active navigation section state
  const [activeSection, setActiveSection] = useState('hero');

  // Product Category Filter state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mineral' | 'alkaline' | 'energy' | 'jelly'>('all');

  // Interactive Delivery range check widget state
  const [deliveryQuery, setDeliveryQuery] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'eligible' | 'not-eligible'>('idle');

  // Track scroll position to highlight active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'why-us', 'products', 'eco-vision', 'contact'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: product.minOrderQuantity || 1 }];
    });
  };

  const handleRemoveOneFromCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (!existing) return prevCart;
      
      if (existing.quantity <= (product.minOrderQuantity || 1)) {
        // Remove completely if decrementing below min or 1
        return prevCart.filter((item) => item.product.id !== product.id);
      }
      
      return prevCart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Smooth scroll helper
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setIsCartOpen(false);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Delivery checker trigger
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryQuery.trim()) {
      setDeliveryStatus('idle');
      return;
    }
    
    const query = deliveryQuery.toLowerCase();
    // Eligible if mentions Alluru, Aluru, Nellore, or standard residential spots
    if (
      query.includes('alluru') || 
      query.includes('aluru') || 
      query.includes('ward') || 
      query.includes('bazaar') || 
      query.includes('street') || 
      query.includes('road') || 
      query.includes('temple') ||
      query.length >= 4
    ) {
      setDeliveryStatus('eligible');
    } else {
      setDeliveryStatus('not-eligible');
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen text-slate-800 font-sans antialiased selection:bg-sky-200 selection:text-sky-900 pb-0">
      
      {/* 1. Global Floating Water Bubbles Animation Overlay */}
      <BubbleBackground />

      {/* 2. Sticky Glassmorphic Navbar */}
      <Navbar 
        cart={cart} 
        onOpenCart={() => setIsCartOpen(true)} 
        activeSection={activeSection} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* 3. HERO WELCOME SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen pt-36 pb-20 flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Slogans & Pitch */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200/50 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                <span>ALLURU'S OFFICIAL PREMIUM WATER BRAND</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-blue-900 leading-[0.95]">
                CU <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">WATER</span>
                <span className="block text-2xl sm:text-4xl lg:text-[2.75rem] font-bold text-blue-600 mt-2 tracking-normal">
                  SMART HYDRATION
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience pristine purity crafted for peak health. Hand-delivered across Alluru—offering mineral-balanced water bottles, premium ionized Alkaline tins, sport-electrolyte Energy water, and innovative fruit Jelly water.
              </p>

              {/* Promo stats blocks */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
                <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-blue-100 shadow-lg shadow-blue-200/10 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-blue-600">8.5+</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">pH Alkaline</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-blue-100 shadow-lg shadow-blue-200/10 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Eco Pure</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-blue-100 shadow-lg shadow-blue-200/10 text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-600">Free</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">COD Delivery</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-2xl text-base shadow-xl shadow-blue-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Shop</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleScrollToSection('why-us')}
                  className="w-full sm:w-auto h-14 px-8 bg-white/80 hover:bg-white text-slate-800 font-bold rounded-2xl text-base border border-blue-100/80 transition-all hover:border-blue-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  Our Pure Process
                </button>
              </div>

              {/* Direct support information */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <span>📍 Location: Alluru, AP</span>
                <span>•</span>
                <span>📞 Hotline: 9100805905</span>
              </div>
            </div>

            {/* Right Column: Dynamic floating bottle banner */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-72 sm:w-80 md:w-96 aspect-square max-w-full flex items-center justify-center">
                {/* Visual backdrop soft gradient circle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" />
                
                {/* Hero Showcase Frame with Vector Model */}
                <div className="relative z-10 w-full h-full bg-gradient-to-b from-white/60 to-blue-50/40 backdrop-blur-2xl border border-white/85 rounded-[3rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-600 text-white font-extrabold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      pH Balance Champion
                    </span>
                    <span className="text-xs font-bold text-blue-900/60">300ml sleek tin</span>
                  </div>

                  {/* High definition vector illustration of our best seller */}
                  <div className="h-64 flex items-center justify-center py-4">
                    <ProductVisual imageKey="alkaline-tin" name="CU Alkaline" size="300ml" className="scale-110" />
                  </div>

                  <div className="text-center pt-2">
                    <h4 className="text-lg font-black text-blue-900">CU Alkaline Water</h4>
                    <p className="text-xs text-blue-600 font-extrabold">Active Body Wellness & Acidity Relief</p>
                  </div>
                </div>

                {/* Micro floating product labels to enrich aesthetic depth */}
                <div className="absolute -top-4 -right-4 z-20 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-[150px] animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Tin Packaging</span>
                    <span className="block text-[11px] font-extrabold text-slate-800">100% Eco Safe</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 z-20 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-[160px]">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Free Delivery</span>
                    <span className="block text-[11px] font-extrabold text-slate-800">Local Alluru AP</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEVEN-STAGE PURITY PHILOSOPHY SECTION */}
      <section 
        id="why-us" 
        className="py-24 bg-white/40 backdrop-blur-md border-y border-white/40 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-blue-600 font-extrabold tracking-widest uppercase text-xs">
              Meticulous Purity Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900">
              The Purest Smart Hydration on Earth
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Every drop of CU Water undergoes a seven-stage purification process at our state-of-the-art facility, resulting in a naturally sweet taste balanced with healthy trace minerals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Standard 1: Advanced Tin */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-lg shadow-blue-100/20 hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/5 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-extrabold text-blue-900 mb-2">Premium Eco Tins</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 text-blue-600">300ml Portable Wellness</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our CU Alkaline and CU Energy waters are sealed in beautifully recyclable aluminium tins. This provides an instant chilling capability, keeps physical light from degrading mineral structure, and completely eliminates plastic waste.
              </p>
            </div>

            {/* Standard 2: Pure minerals */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-lg shadow-blue-100/20 hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-500/5 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-extrabold text-blue-900 mb-2">Mineral Enrichment</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 text-emerald-600">Calcium & Magnesium Infused</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard RO water strips out healthy components. We enrich our purified water with standard minerals like calcium, potassium, and magnesium, which supports muscle recovery, cell hydration, and produces a silky smooth taste.
              </p>
            </div>

            {/* Standard 3: Eco Cans */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-lg shadow-blue-100/20 hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-cyan-500/5 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
                <Waves className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-extrabold text-blue-900 mb-2">20L Home Smart Cans</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 text-cyan-600">Zero Waste Family Choice</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save money and keep your family hydrated with our reusable, heavy-duty 20 Liter cans. They are thoroughly sterilized, fitted with anti-leak seals, and perfect for office and home water dispensers. Delivered free directly to your door!
              </p>
            </div>

          </div>

          {/* Quick process flow overview */}
          <div className="mt-16 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl p-6 sm:p-8 border border-blue-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">Certified Safety</span>
              <h4 className="text-base font-extrabold text-blue-900">Do you operate wholesale distribution in Nellore district?</h4>
              <p className="text-xs text-slate-500 font-semibold">We supply customized distribution cases of 500ml, 1L, and 2L bottles for weddings, retailers, and public venues.</p>
            </div>
            <button
              onClick={() => handleScrollToSection('contact')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-200/55 transition-all shrink-0 cursor-pointer"
            >
              Contact Distribution Office
            </button>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCT CATALOG SHOP SECTION */}
      <section 
        id="products" 
        className="py-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-blue-600 font-extrabold tracking-widest uppercase text-xs">
              Organic & Smart Product Lineup
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900">
              Select Your Hydration Blend
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-slate-500 leading-relaxed font-medium">
              Browse through our premium minerals, wellness ionics, energy blends, and jelly waters. Select your preferred volume and complete verification for instant Cash on Delivery in Alluru.
            </p>
          </div>

          {/* Catalog Filter Controls */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'mineral', label: 'Mineral Bottles & Cans' },
              { id: 'alkaline', label: 'Ionized Alkaline' },
              { id: 'energy', label: 'Active Energy' },
              { id: 'jelly', label: 'Fun Jelly Water' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all border outline-none ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200/40'
                    : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white/95'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const itemInCart = cart.find((item) => item.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  cartItem={itemInCart}
                  onAddToCart={handleAddToCart}
                  onRemoveOneFromCart={handleRemoveOneFromCart}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. ECO-FRIENDLY ENVIRONMENTAL INITIATIVE SECTION */}
      <section 
        id="eco-vision" 
        className="py-24 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/65 backdrop-blur-lg border border-emerald-100 p-8 sm:p-14 rounded-[3rem] shadow-xl overflow-hidden relative">
            {/* Leaf illustration circle background decor */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 filter blur-3xl -translate-y-20 translate-x-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3.5 py-1 text-xs font-bold text-emerald-700">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>100% ECO-CONSCIOUS PHILOSOPHY</span>
                </div>
                
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900 leading-none">
                  Protecting Alluru's Coastlines & Lands
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  At CU Water, we believe hydration shouldn't compromise our ecological health. We are deeply committed to reducing plastic pollution by transitioning our key SKU inventory into beautiful, infinitely recyclable aluminium tins and smart reusable family cans.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aluminium Cool-Tins</strong>: Keeps minerals chemically stable, prevents plastic heat leaching, and reduces standard carbon emission metrics.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Circular Can Loop</strong>: Our 20-Liter cans are sanitized using industrial triple wash systems, and reused over 100 times, protecting the local environment.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-emerald-800 font-bold">
                    * For every order placed, we donate towards waste-recycling programs across coastal Andhra Pradesh!
                  </p>
                </div>
              </div>

              {/* Right Column illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-64 sm:w-72 aspect-square relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-3xl" />
                  
                  {/* Clean SVG Earth/Leaf Graphic representation */}
                  <svg viewBox="0 0 100 100" className="w-full h-full max-h-[220px] drop-shadow-xl animate-spin-slow" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="44" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 4" />
                    {/* Inner pure water leaf drop */}
                    <path
                      d="M50 20 C65 40, 72 50, 72 65 C72 77, 62 84, 50 84 C38 84, 28 77, 28 65 C28 50, 35 40, 50 20 Z"
                      fill="url(#eco-leaf-grad)"
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    {/* Glowing white veins */}
                    <path d="M50 35 L50 80" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
                    <path d="M50 50 Q58 45, 64 42" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
                    <path d="M50 62 Q42 58, 36 55" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />

                    <defs>
                      <linearGradient id="eco-leaf-grad" x1="50" y1="20" x2="50" y2="84" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Label tag overlay */}
                  <span className="absolute bottom-4 bg-white px-3 py-1 text-[10px] font-black text-emerald-700 uppercase rounded-full shadow-md border border-emerald-50">
                    Eco Hydration Purity
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US & LOCAL ALLURU RANGE CHECKER */}
      <section 
        id="contact" 
        className="py-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct office contacts details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4 text-center lg:text-left">
                <span className="text-blue-600 font-extrabold tracking-widest uppercase text-xs">
                  We are here for you
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-blue-900 leading-none">
                  Get in Touch
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mx-auto lg:mx-0" />
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Have questions about retail margins, distributor orders, or residential delivery schedules? Feel free to call us or write to our team directly.
                </p>
              </div>

              {/* Informative direct contact list details */}
              <div className="space-y-4">
                
                {/* Contact item 1 */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg shadow-blue-100/10 flex items-start gap-4 animate-fade-in">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">Main Bottling Plant</span>
                    <span className="block text-sm font-extrabold text-slate-800">Alluru, Nellore District, AP, India</span>
                    <span className="block text-xs text-slate-500">Pincode: 524315</span>
                  </div>
                </div>

                {/* Contact item 2 */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg shadow-blue-100/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">24/7 Phone / WhatsApp Helpline</span>
                    <a href="tel:9100805905" className="block text-sm font-extrabold text-slate-800 hover:text-blue-600 transition-colors">
                      +91 9100805905
                    </a>
                    <span className="block text-xs text-slate-500">Call to place orders or ask queries directly</span>
                  </div>
                </div>

                {/* Contact item 3 */}
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg shadow-blue-100/10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">Official iCloud Mailbox</span>
                    <a href="mailto:upendravarma@icloud.com" className="block text-sm font-extrabold text-slate-800 hover:text-blue-600 transition-colors">
                      upendravarma@icloud.com
                    </a>
                    <span className="block text-xs text-slate-500">Wholesale quotations & business requests</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Local range eligibility checker widget */}
            <div className="lg:col-span-7">
              <div className="bg-white/80 backdrop-blur-md border border-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-blue-100/20 space-y-6">
                <div>
                  <h4 className="text-xl font-black text-blue-900">Alluru Local Delivery Range Check</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Type your street, ward, or temple landmark in Alluru to check instant free delivery qualification.
                  </p>
                </div>

                <form onSubmit={handleCheckDelivery} className="flex gap-2">
                  <input
                    type="text"
                    value={deliveryQuery}
                    onChange={(e) => {
                      setDeliveryQuery(e.target.value);
                      setDeliveryStatus('idle');
                    }}
                    placeholder="e.g. Ramalayam Street, Alluru"
                    className="flex-1 h-12 px-4 rounded-xl border border-slate-200 text-sm focus:border-blue-500 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-blue-100/40"
                  >
                    Check Status
                  </button>
                </form>

                {/* Check feedback states */}
                {deliveryStatus === 'eligible' && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-800 flex gap-3 text-xs font-semibold items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-emerald-950">🎉 Yes! Free Doorstep Delivery is Eligible!</p>
                      <p className="opacity-95 font-medium mt-0.5">
                        Our express delivery truck serves your spot. Orders placed using Cash on Delivery will arrive within 2-4 hours.
                      </p>
                    </div>
                  </div>
                )}

                {deliveryStatus === 'not-eligible' && (
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-amber-800 flex gap-3 text-xs font-semibold items-start">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold text-amber-950">Deliverable Area Warning</p>
                      <p className="opacity-95 font-medium mt-0.5">
                        Landmark not automatically recognized. We only serve within Alluru region boundaries. Please verify or call +91 9100805905 to confirm.
                      </p>
                    </div>
                  </div>
                )}

                {deliveryStatus === 'idle' && (
                  <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/50 text-xs text-slate-600 font-medium space-y-1">
                    <p className="font-bold">⏰ Delivery Service Hours:</p>
                    <p>Everyday from 7:00 AM to 9:00 PM. No delivery charges are added for local addresses!</p>
                  </div>
                )}

                {/* Direct wholesale order assistance alert box */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                  <div className="flex items-center gap-2 font-medium text-slate-500">
                    <Info className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Distributors, please call for wholesale bulk pricing tiers.</span>
                  </div>
                  <a
                    href="tel:9100805905"
                    className="text-sky-600 font-bold hover:underline shrink-0"
                  >
                    Call Distributor Desk
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FOOTER SEGMENT */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* 9. SLIDE-OUT SHOPPING CART SIDEBAR DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay blur */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white/95 backdrop-blur-xl border-l border-slate-100 shadow-2xl flex flex-col relative">
              
              {/* Drawer header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-sky-600" />
                  <h3 className="text-base font-extrabold text-slate-900">Your Hydration Cart</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-full"
                >
                  Close
                </button>
              </div>

              {/* Cart item list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto text-sky-600">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-slate-900 font-extrabold text-sm">Your cart is currently empty</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Explore our premium mineral bottles, ionized alkaline tins, energy, or jelly water to supercharge your health!
                    </p>
                    <button
                      onClick={() => handleScrollToSection('products')}
                      className="mt-2 px-5 py-2.5 bg-sky-600 text-white font-extrabold rounded-xl text-xs shadow-md shadow-sky-100 hover:scale-102 transition-all cursor-pointer"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="bg-white/80 border border-slate-100 rounded-2xl p-4 flex gap-4 hover:border-sky-200 transition-all shadow-sm"
                    >
                      {/* Product Visual vector overlay inside cart */}
                      <div className="w-14 h-16 bg-sky-50/50 rounded-xl border border-sky-100/50 flex items-center justify-center shrink-0">
                        <ProductVisual imageKey={item.product.image} name={item.product.name} size={item.product.size} className="scale-90" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-extrabold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-extrabold text-slate-900 shrink-0 ml-2">
                            ₹{item.product.price * item.quantity}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold mb-2">
                          Size: {item.product.size} • Qty {item.quantity}
                        </p>

                        {/* Interactive incrementors */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-white rounded"
                            >
                              -
                            </button>
                            <span className="px-2 font-bold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-white rounded"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart calculation checkout desk */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
                  <div className="space-y-1.5 text-xs text-slate-600 font-semibold">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="text-slate-900 font-bold">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Delivery (Alluru):</span>
                      <span className="font-bold">FREE EXPRESS</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-black text-sm border-t border-slate-200/60 pt-2">
                      <span>Total Invoice:</span>
                      <span className="text-sky-600 text-base">₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Cash on delivery notification stamp */}
                  <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl text-[11px] font-medium text-sky-800 flex gap-2">
                    <span className="text-sm">💵</span>
                    <p>Orders are dispatched instantly via <strong>Cash on Delivery</strong> and forwarded directly to WhatsApp for rapid local shipment.</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckout(true);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4 stroke-[3px]" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 10. PRODUCT DETAIL DIALOG POPUP MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
          />

          <div className="relative bg-white rounded-[2.5rem] border border-sky-100 w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-all"
            >
              Close
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
              
              {/* Product Visual artwork left */}
              <div className="bg-gradient-to-br from-sky-50/50 to-emerald-50/20 border border-slate-100 rounded-[2rem] p-6 h-64 flex items-center justify-center relative overflow-hidden">
                <ProductVisual imageKey={selectedProduct.image} name={selectedProduct.name} size={selectedProduct.size} className="scale-110" />
                
                {selectedProduct.badge && (
                  <span className="absolute top-4 left-4 bg-yellow-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Product details description right */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest block mb-0.5">
                    {selectedProduct.category} Hydration
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-extrabold text-sky-600">₹{selectedProduct.price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{selectedProduct.size} • {selectedProduct.packaging}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedProduct.description}
                </p>

                {/* Wholesale alert */}
                {selectedProduct.minOrderQuantity && (
                  <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl text-[10px] font-bold text-amber-800">
                    ⚠️ Wholesale MOQ Alert: Please note this size is supplied in cases of minimum {selectedProduct.minOrderQuantity} units for retailers/distributors.
                  </div>
                )}

                {/* Full Specs List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Key Specifications:</span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    {selectedProduct.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700 font-semibold">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="w-full h-12 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Order Drawer
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 11. MULTI-STEP CHECKOUT OVERLAY MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setShowCheckout(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          />

          <div className="relative z-10 w-full max-w-lg">
            <CheckoutFlow 
              cart={cart} 
              total={cartTotal} 
              onClearCart={handleClearCart} 
              onClose={() => setShowCheckout(false)} 
            />
          </div>
        </div>
      )}

    </div>
  );
}
