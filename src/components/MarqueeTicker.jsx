import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

const TICKER_ITEMS = [
  { text: 'SABLON DTF SATUAN (NO MOQ)', icon: 'flame' },
  { text: '100% COTTON COMBED REAKTIF', icon: 'sparkle' },
  { text: 'BEBAS WARNA & GRADASI FOTO HD', icon: 'flame' },
  { text: 'PROSES CEPAT 1 - 2 HARI', icon: 'sparkle' },
  { text: 'KONSULTASI & MOCKUP GRATIS', icon: 'flame' },
  { text: 'HARGA HEMAT UNTUK PARTAI', icon: 'sparkle' },
  { text: 'PENGIRIMAN KE SELURUH INDONESIA', icon: 'flame' },
];

export default function MarqueeTicker() {
  // Gandakan item untuk menciptakan efek looping mulus tanpa patah
  const repeatedItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div 
      aria-hidden="true"
      className="w-full bg-navy text-white py-3.5 border-y border-line overflow-hidden select-none flex items-center relative"
    >
      {/* Subtle fade edges on sides for smooth in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee motion-reduce:animate-none flex items-center gap-8 whitespace-nowrap">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            {item.icon === 'flame' ? (
              <Flame className="w-4 h-4 text-accent fill-accent" />
            ) : (
              <Sparkles className="w-4 h-4 text-accent" />
            )}
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-white/95 uppercase">
              {item.text}
            </span>
            <span className="text-accent font-bold opacity-60 ml-3">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
