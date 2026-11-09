import React, { useRef, useState } from 'react';
import { MessageCircle, Check, ArrowUpRight } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const waUrl = createWhatsAppLink(
    SHOP_CONFIG.whatsapp, 
    WA_MESSAGES.productInquiry(product.name)
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl border border-line shadow-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden will-change-transform"
    >
      {/* 21st.dev Dynamic Cursor Spotlight Sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-30"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(20, 33, 61, 0.06), transparent 75%)`,
        }}
      />

      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-cream overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge Produk (Aturan 35: Isi #F2B705, teks #14213D) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-accent text-navy text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-20 group-hover:scale-105 transition-transform">
            {product.badge}
          </div>
        )}

        {/* Price Tag Pill */}
        <div className="absolute bottom-3 right-3 bg-navy/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-white/10 z-20">
          {product.priceLabel}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-navy group-hover:text-navy transition-colors">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-mute line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specs Badges */}
          <div className="mt-4 pt-3 border-t border-line space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-mute">
              <Check className="w-3.5 h-3.5 text-navy shrink-0" />
              <span>Bahan: <strong className="font-semibold text-navy">{product.material}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-mute">
              <Check className="w-3.5 h-3.5 text-navy shrink-0" />
              <span>Area: <span className="text-navy font-medium">{product.printArea}</span></span>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Order CTA Button */}
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Pesan ${product.name} via WhatsApp`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-wa hover:bg-wa-hover text-white text-sm font-bold shadow-sm transition-all duration-200 group/btn active:scale-95 hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Pesan via WA</span>
            <ArrowUpRight className="w-4 h-4 opacity-75 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
