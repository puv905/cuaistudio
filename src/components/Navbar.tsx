import React from 'react';
import { Droplet, ShoppingCart, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ cart, onOpenCart, activeSection, onScrollToSection }: NavbarProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'why-us', label: 'Our Purity' },
    { id: 'products', label: 'Shop Hydration' },
    { id: 'eco-vision', label: 'Eco-Friendly' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/75 backdrop-blur-xl transition-all duration-300">
      {/* Top Banner with Location/Contact details */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Alluru, AP, India
            </span>
            <span className="hidden sm:inline-block">|</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +91 9100805905
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" /> Smart Hydration
            </span>
            <span className="hidden sm:inline-block">|</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> upendravarma@icloud.com
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button onClick={() => onScrollToSection('hero')} className="flex items-center gap-2 focus:outline-none group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-blue-200/50 group-hover:rotate-6 transition-transform">
            <Droplet className="text-white w-5 h-5 fill-current" />
          </div>
          <div className="text-left">
            <span className="text-xl font-black tracking-tighter text-blue-950 block">
              CU <span className="text-blue-600">WATER</span>
            </span>
            <span className="text-[9px] text-cyan-600 font-bold uppercase tracking-widest block -mt-1.5">
              Smart Hydration
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className={`hover:text-blue-600 transition-colors py-2 relative focus:outline-none ${
                activeSection === item.id ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Interactive Shopping Cart Trigger Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            id="cart-toggle-btn"
            className="relative p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-all flex items-center gap-2 border border-blue-100 hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline-block text-xs font-bold px-1 text-blue-800">
              ₹{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
            </span>
          </button>
          
          <button
            onClick={() => onScrollToSection('products')}
            className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm rounded-full shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] cursor-pointer"
          >
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
}
