import React from 'react';
import { Droplet, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900 text-slate-400 pt-16 pb-8 overflow-hidden z-10">
      {/* Dynamic light wave highlight at the top of the footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600" />
      
      {/* Background soft ambient lights */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-500/5 filter blur-3xl" />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-sky-500/5 filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Brand philosophy */}
          <div className="space-y-4">
            <button onClick={() => onScrollToSection('hero')} className="flex items-center gap-2 text-left focus:outline-none">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Droplet className="text-white w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tighter text-white block">
                  CU <span className="text-sky-400">WATER</span>
                </span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block -mt-1.5">
                  Smart Hydration
                </span>
              </div>
            </button>
            
            <p className="text-xs leading-relaxed text-slate-400">
              Redefining purity with advanced eco-friendly packaging and mineral-rich smart water in Alluru. Hydrating your health, preserving our planet.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10.5px] text-slate-500 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>IS 14543 Certified Purity</span>
            </div>
          </div>

          {/* Column 2: Water Products Navigation */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-white transition-colors">
                  Premium Mineral Water (500ml / 1L / 2L)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-white transition-colors">
                  CU Reusable Home Can (20 Liter)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-white transition-colors">
                  CU Alkaline Water (300ml Tins)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-white transition-colors">
                  CU Energy Water (300ml Tins)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-white transition-colors">
                  CU Jelly Water (500ml Fruit Pearls)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-white transition-colors">
                  Home / Welcome
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('why-us')} className="hover:text-white transition-colors">
                  Our Purity Process
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('eco-vision')} className="hover:text-white transition-colors">
                  Sustainability Initiative
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('contact')} className="hover:text-white transition-colors">
                  Locate Us in Alluru
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact and Address Details */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Official Helpline
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Alluru Local Office,<br />
                  Nellore District, Andhra Pradesh,<br />
                  India - 524315
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:9100805905" className="hover:text-white transition-colors">+91 9100805905</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:upendravarma@icloud.com" className="hover:text-white transition-colors">upendravarma@icloud.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Delivery: 7:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>
            &copy; {year} <span className="text-slate-400 font-bold">CU WATER (SMART HYDRATION)</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted for premium purity in Alluru</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>

          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-1.5 rounded-full transition-all focus:outline-none border border-slate-700"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
