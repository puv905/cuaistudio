import React from 'react';
import { Sparkles, Plus, Check, HelpCircle } from 'lucide-react';
import { Product, CartItem } from '../types';
import ProductVisual from './ProductVisual';

interface ProductCardProps {
  product: Product;
  cartItem?: CartItem;
  onAddToCart: (product: Product) => void;
  onRemoveOneFromCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  key?: any;
}

export default function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onRemoveOneFromCart,
  onOpenDetails
}: ProductCardProps) {
  
  // Category-specific styles
  const categoryStyles = {
    mineral: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200/50',
      gradient: 'from-blue-50/70 to-cyan-50/70',
      accentColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
    },
    alkaline: {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
      gradient: 'from-blue-50/70 to-indigo-50/70',
      accentColor: 'text-indigo-600',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
    },
    energy: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
      gradient: 'from-emerald-50/70 to-cyan-50/70',
      accentColor: 'text-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
    },
    jelly: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200/50',
      gradient: 'from-rose-50/70 to-orange-50/70',
      accentColor: 'text-rose-600',
      buttonBg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
    }
  }[product.category];

  return (
    <div
      id={`product-card-${product.id}`}
      className={`group relative flex flex-col bg-white/80 backdrop-blur-md border border-white p-5 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-100/40 hover:border-blue-300 transition-all duration-300`}
    >
      {/* Decorative colored glow bubble behind product container */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-br ${categoryStyles.gradient} filter blur-xl opacity-80 group-hover:scale-125 transition-transform duration-500`} />

      {/* Top badges bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${categoryStyles.bg}`}>
          {product.category}
        </span>
        
        {product.badge && (
          <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> {product.badge}
          </span>
        )}
        
        {product.isBestSeller && (
          <span className="bg-emerald-500 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
            Bestseller
          </span>
        )}
      </div>

      {/* Interactive Vector Render of the Product Container */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative z-10 h-48 w-full mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-blue-50/20 border border-white/20 flex items-center justify-center cursor-pointer"
      >
        <ProductVisual imageKey={product.image} name={product.name} size={product.size} className="w-full h-full p-4" />
        
        {/* Hover details overlay trigger indicator */}
        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-md border border-slate-100 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            View Details
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-extrabold text-blue-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="text-right">
            <span className="text-xl font-extrabold text-blue-950 block">
              ₹{product.price}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block">
              {product.size}
            </span>
          </div>
        </div>

        {/* Packing & Quantity Limit */}
        <p className="text-xs text-slate-500 font-medium mb-3">
          Packaging: {product.packaging}
          {product.minOrderQuantity && (
            <span className="block text-amber-600 font-bold text-[10px] mt-0.5">
              * Minimum wholesale order: {product.minOrderQuantity} units
            </span>
          )}
        </p>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Spec Bullet points */}
        <div className="space-y-1.5 mb-5 bg-white/30 rounded-xl p-2.5 border border-white/50">
          {product.specs.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[10.5px] text-slate-700 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        {/* Add to Cart Actions */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          {cartItem ? (
            <div className="flex items-center justify-between w-full bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button
                onClick={() => onRemoveOneFromCart(product)}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-rose-600 font-bold hover:bg-white rounded-lg transition-all focus:outline-none"
              >
                -
              </button>
              <span className="font-extrabold text-slate-900 text-sm">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => onAddToCart(product)}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-emerald-600 font-bold hover:bg-white rounded-lg transition-all focus:outline-none"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full py-3 px-4 ${categoryStyles.buttonBg} text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-[1.02]`}
            >
              <Plus className="w-4 h-4 stroke-[3px]" /> Add to Hydration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
