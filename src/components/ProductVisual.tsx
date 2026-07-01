import React from 'react';

interface ProductVisualProps {
  imageKey: string;
  name: string;
  size: string;
  className?: string;
}

export default function ProductVisual({ imageKey, name, size, className = '' }: ProductVisualProps) {
  // Return tailored SVG drawings for each product packaging
  switch (imageKey) {
    case 'mineral-500':
    case 'mineral-1l':
    case 'mineral-2l': {
      // Plastic water bottles, scaled according to volume
      const is500ml = imageKey === 'mineral-500';
      const is2l = imageKey === 'mineral-2l';
      const bottleColor = '#0ea5e9'; // sky-500
      const capColor = '#0369a1'; // sky-700
      
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 220" className="w-full h-full max-h-[180px] drop-shadow-lg transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bottle Outline */}
            <path
              d="M48 20 C48 16, 72 16, 72 20 L72 35 C72 35, 78 45, 84 55 C90 65, 92 75, 92 85 L92 195 C92 205, 86 210, 75 210 L45 210 C34 210, 28 205, 28 195 L28 85 C28 75, 30 65, 36 55 C42 45, 48 35, 48 35 Z"
              fill="rgba(14, 165, 233, 0.08)"
              stroke="rgba(14, 165, 233, 0.35)"
              strokeWidth="2"
            />
            
            {/* Bottle Cap */}
            <rect x="46" y="8" width="28" height="10" rx="1.5" fill={capColor} />
            <line x1="50" y1="8" x2="50" y2="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="55" y1="8" x2="55" y2="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="60" y1="8" x2="60" y2="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="65" y1="8" x2="65" y2="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="70" y1="8" x2="70" y2="18" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

            {/* Neck Ring */}
            <rect x="44" y="18" width="32" height="3" fill="#0284c7" />

            {/* Liquid Level */}
            <path
              d="M30 90 Q40 88, 60 92 T90 90 L90 195 C90 202, 85 208, 75 208 L45 208 C35 208, 30 202, 30 195 Z"
              fill="url(#water-grad)"
              fillOpacity="0.35"
            />

            {/* Bottle Ribs / Ridges (gives plastic premium texture) */}
            <path d="M32 110 Q60 112, 88 110" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1.5" />
            <path d="M30 140 Q60 142, 90 140" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1.5" />
            <path d="M32 170 Q60 172, 88 170" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1.5" />

            {/* Eco Label Wrapper */}
            <rect x="29" y="112" width="62" height="46" fill="#ffffff" rx="1" stroke="rgba(14, 165, 233, 0.15)" strokeWidth="1" />
            <rect x="29" y="114" width="62" height="6" fill="#0284c7" />
            <rect x="29" y="148" width="62" height="6" fill="#16a34a" />
            
            {/* Label Branding */}
            <text x="60" y="132" fill="#0369a1" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">CU WATER</text>
            <text x="60" y="142" fill="#15803d" fontSize="6" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">MINERAL • {size}</text>

            {/* Inner Glare / Reflection */}
            <path d="M35 85 C35 85, 38 65, 42 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
            <path d="M33 195 L33 160" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="water-grad" x1="60" y1="90" x2="60" y2="208" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    case 'mineral-20l': {
      // Heavy duty blue home can (bubble shape)
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 130 190" className="w-full h-full max-h-[180px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Big Can Body */}
            <path
              d="M48 20 L82 20 L82 30 L88 34 L102 46 C110 52, 114 62, 114 74 L114 170 C114 180, 106 186, 96 186 L34 186 C24 186, 16 180, 16 170 L16 74 C16 62, 20 52, 28 46 L42 34 L48 30 Z"
              fill="rgba(2, 132, 199, 0.1)"
              stroke="rgba(2, 132, 199, 0.4)"
              strokeWidth="3"
            />
            {/* Blue Tint Cover for Can */}
            <path
              d="M18 78 C18 78, 65 72, 112 78 L112 170 C112 178, 104 184, 96 184 L34 184 C26 184, 18 178, 18 170 Z"
              fill="url(#can-blue-grad)"
              fillOpacity="0.4"
            />

            {/* Reusable Handle */}
            <path
              d="M45 74 L85 74 L85 96 L77 96 L77 82 L53 82 L53 96 L45 96 Z"
              fill="#01579b"
              stroke="#01579b"
              strokeWidth="1"
            />

            {/* Heavy-duty ridges */}
            <path d="M22 100 L108 100" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 124 L108 124" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 148 L108 148" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="3" strokeLinecap="round" />

            {/* Top Cap */}
            <rect x="52" y="6" width="26" height="14" rx="2" fill="#0284c7" />
            <rect x="49" y="14" width="32" height="4" fill="#01579b" />

            {/* Logo label on dispenser can */}
            <rect x="36" y="112" width="58" height="28" fill="#ffffff" rx="2" shadow="sm" stroke="rgba(2, 132, 199, 0.2)" strokeWidth="1" />
            <text x="65" y="125" fill="#0284c7" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">CU SMART</text>
            <text x="65" y="134" fill="#16a34a" fontSize="6" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">REUSABLE CAN</text>

            <defs>
              <linearGradient id="can-blue-grad" x1="65" y1="78" x2="65" y2="184" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    case 'alkaline-tin': {
      // Premium aluminium sleek tin
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 110 200" className="w-full h-full max-h-[170px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sleek Tin Outline */}
            <path
              d="M34 16 L76 16 C81 16, 86 20, 86 25 L86 185 C86 191, 81 194, 76 194 L34 194 C29 194, 24 191, 24 185 L24 25 C24 20, 29 16, 34 16 Z"
              fill="url(#alkaline-metallic)"
              stroke="rgba(30, 41, 59, 0.15)"
              strokeWidth="2"
            />
            {/* Silver metallic collar */}
            <path d="M24 26 L86 26" stroke="#94a3b8" strokeWidth="2" />
            <path d="M24 184 L86 184" stroke="#64748b" strokeWidth="3" />

            {/* Premium Wave Branding Artwork */}
            <path
              d="M24 70 Q35 80, 55 70 T86 70 L86 184 L24 184 Z"
              fill="url(#alkaline-glow)"
              fillOpacity="0.85"
            />

            {/* Text details for Alkaline */}
            <text x="55" y="50" fill="#0f172a" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">CU</text>
            <text x="55" y="62" fill="#0f172a" fontSize="8" fontWeight="500" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2">ALKALINE</text>
            
            {/* Premium pH Circle */}
            <circle cx="55" cy="115" r="22" fill="#0f172a" stroke="#22c55e" strokeWidth="2.5" />
            <text x="55" y="111" fill="#ffffff" fontSize="6" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">pH LEVEL</text>
            <text x="55" y="123" fill="#22c55e" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">8.5+</text>

            <text x="55" y="162" fill="#ffffff" fontSize="7" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">SMART HYDRATION</text>
            <text x="55" y="172" fill="#dcfce7" fontSize="5.5" fontWeight="400" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">300ML ECO TIN</text>

            {/* Specular lighting effect on aluminum */}
            <rect x="28" y="18" width="8" height="174" fill="url(#metal-highlight)" fillOpacity="0.4" />

            <defs>
              <linearGradient id="alkaline-metallic" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="30%" stopColor="#f1f5f9" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="alkaline-glow" x1="55" y1="70" x2="55" y2="184" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
              <linearGradient id="metal-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    case 'energy-tin': {
      // Dynamic energy sleek tin
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 110 200" className="w-full h-full max-h-[170px] drop-shadow-xl transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sleek Tin Outline */}
            <path
              d="M34 16 L76 16 C81 16, 86 20, 86 25 L86 185 C86 191, 81 194, 76 194 L34 194 C29 194, 24 191, 24 185 L24 25 C24 20, 29 16, 34 16 Z"
              fill="url(#energy-metallic)"
              stroke="rgba(30, 41, 59, 0.15)"
              strokeWidth="2"
            />
            {/* Silver metallic collar */}
            <path d="M24 26 L86 26" stroke="#94a3b8" strokeWidth="2" />
            <path d="M24 184 L86 184" stroke="#64748b" strokeWidth="3" />

            {/* Premium Energy Dynamic Diagonal Artwork */}
            <path
              d="M24 85 L86 65 L86 184 L24 184 Z"
              fill="url(#energy-grad)"
              fillOpacity="0.9"
            />

            {/* Lightning bolt vector icon */}
            <path
              d="M58 90 L46 112 L56 112 L52 135 L64 113 L54 113 Z"
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Brand text */}
            <text x="55" y="48" fill="#0f172a" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">CU</text>
            <text x="55" y="58" fill="#1e293b" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif" letterSpacing="2.5">ENERGY</text>
            <text x="55" y="152" fill="#ffffff" fontSize="7.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.8">ELECTROLYTES</text>
            <text x="55" y="166" fill="#fbbf24" fontSize="6.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">VITAMINS + RECOVERY</text>
            <text x="55" y="176" fill="#e2e8f0" fontSize="5" fontWeight="400" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">300ML SPORT TIN</text>

            {/* Specular lighting effect on aluminum */}
            <rect x="28" y="18" width="8" height="174" fill="url(#metal-highlight-2)" fillOpacity="0.4" />

            <defs>
              <linearGradient id="energy-metallic" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="30%" stopColor="#f1f5f9" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="energy-grad" x1="55" y1="65" x2="55" y2="184" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="metal-highlight-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    case 'jelly-bottle': {
      // Clear bottle showing visible fruity jelly spheres
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 120 220" className="w-full h-full max-h-[180px] drop-shadow-lg transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bottle Outline */}
            <path
              d="M48 20 C48 16, 72 16, 72 20 L72 35 C72 35, 78 45, 84 55 C90 65, 92 75, 92 85 L92 195 C92 205, 86 210, 75 210 L45 210 C34 210, 28 205, 28 195 L28 85 C28 75, 30 65, 36 55 C42 45, 48 35, 48 35 Z"
              fill="rgba(14, 165, 233, 0.05)"
              stroke="rgba(14, 165, 233, 0.3)"
              strokeWidth="2"
            />
            
            {/* Bright Orange/Pink cap representing the Jelly style */}
            <rect x="46" y="8" width="28" height="10" rx="1.5" fill="#f43f5e" /> {/* rose-500 */}

            {/* Liquid (Soft Rose tinted for fruit jelly vibe) */}
            <path
              d="M30 85 Q40 83, 60 87 T90 85 L90 195 C90 202, 85 208, 75 208 L45 208 C35 208, 30 202, 30 195 Z"
              fill="url(#jelly-liquid-grad)"
              fillOpacity="0.25"
            />

            {/* Floating Jelly Spheres / Pearls inside bottle */}
            <circle cx="45" cy="110" r="5" fill="#f43f5e" fillOpacity="0.7" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="75" cy="115" r="6" fill="#f43f5e" fillOpacity="0.75" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="58" cy="130" r="5" fill="#fb7185" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="38" cy="155" r="6" fill="#f43f5e" fillOpacity="0.7" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="78" cy="162" r="5" fill="#f43f5e" fillOpacity="0.75" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="55" cy="175" r="7" fill="#fb7185" fillOpacity="0.8" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="44" cy="195" r="5.5" fill="#f43f5e" fillOpacity="0.7" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="70" cy="192" r="6" fill="#f43f5e" fillOpacity="0.7" stroke="#ffffff" strokeWidth="0.8" />

            {/* Trendy Label */}
            <rect x="29" y="132" width="62" height="32" fill="#ffffff" rx="1" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" />
            <rect x="29" y="132" width="62" height="4" fill="#f43f5e" />
            <text x="60" y="145" fill="#e11d48" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">CU JELLY</text>
            <text x="60" y="153" fill="#1e293b" fontSize="5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">FRUIT PEARLS • 500ML</text>

            <defs>
              <linearGradient id="jelly-liquid-grad" x1="60" y1="85" x2="60" y2="208" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="100%" stopColor="#fda4af" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    default:
      return (
        <div className={`w-32 h-44 bg-sky-100 rounded-lg flex items-center justify-center text-sky-500 font-bold ${className}`}>
          {name}
        </div>
      );
  }
}
