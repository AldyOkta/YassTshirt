import React, { useRef, useState } from 'react';
import { MessageCircle, Check, ArrowUpRight, ZoomIn } from 'lucide-react';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';

export default function ProductCard({ product, onImageClick }) {
  const cardRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y, opacity: 1 });

    // 21st.dev 3D Tilt Physics (Halus 3-4 derajat)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Number((-(y - centerY) / centerY * 3.5).toFixed(2));
    const rotateY = Number(((x - centerX) / centerX * 3.5).toFixed(2));
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
      }}
      className="group relative bg-white rounded-2xl border border-line shadow-card hover:shadow-xl flex flex-col overflow-hidden will-change-transform"
    >
      {/* 21st.dev Dynamic Cursor Spotlight Sheen */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-30"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(320px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(20, 33, 61, 0.06), transparent 75%)`,
        }}
      />

      {/* Product Image Container (1:1 Square Pixel-Perfect untuk Aset Asli YassTshirt & Click to Zoom) */}
      <div 
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onImageClick && onImageClick(product);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            onImageClick && onImageClick(product);
          }
        }}
        aria-label={`Perbesar gambar detail ${product.name}`}
        title={`Klik untuk memperbesar gambar detail ${product.name}`}
        className="relative aspect-square bg-cream/40 overflow-hidden cursor-zoom-in group/img focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset"
      >
        <img
          src={product.image}
          alt={product.name}
          width="600"
          height="600"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Hover Zoom Prompt Overlay */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/90 text-white text-[11px] font-bold shadow-md backdrop-blur-sm transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
            <ZoomIn className="w-3.5 h-3.5 text-accent" />
            <span>Klik untuk Zoom</span>
          </span>
        </div>

        {/* Badge Produk (Hierarki 60-30-10: Amber #F59E0B khusus Best Seller, netral untuk lainnya) */}
        {product.badge && (
          <div className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs z-20 group-hover:scale-105 transition-transform pointer-events-none ${
            product.isHighlight
              ? 'bg-accent text-navy shadow-sm'
              : 'bg-white/95 text-slate-700 border border-slate-200/90 backdrop-blur-xs'
          }`}>
            {product.badge}
          </div>
        )}

        {/* Price Tag Pill with Tabular Nums */}
        <div className="absolute bottom-3 right-3 bg-navy/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-white/10 z-20 pointer-events-none tabular-nums">
          {product.priceLabel}
        </div>

        {/* Mobile Zoom Affordance Pill (Memberi tahu pengguna layar sentuh bahwa gambar bisa di-zoom) */}
        <div className="absolute bottom-3 left-3 sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy/80 backdrop-blur-sm text-white text-[10px] font-bold z-20 pointer-events-none shadow-sm border border-white/10">
          <ZoomIn className="w-3 h-3 text-accent" />
          <span>Zoom</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10">
        <div>
          {/* Fit Model Pill if applicable */}
          {product.fit && ['reguler', 'oversize', 'boxy', 'package'].includes(product.fit) && (
            <div className="mb-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy/5 text-navy border border-line">
                {product.fit === 'reguler'
                  ? 'Pola: Reguler'
                  : product.fit === 'oversize'
                  ? 'Pola: Oversize (Rib 3cm)'
                  : product.fit === 'boxy'
                  ? 'Pola: Boxy Cut'
                  : 'Paket: Brand Package'}
              </span>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-navy group-hover:text-navy transition-colors">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-mute leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specs Badges */}
          <div className="mt-4 pt-3 border-t border-line space-y-1.5">
            {product.cut && (
              <div className="flex items-center gap-1.5 text-xs text-mute">
                <Check className="w-3.5 h-3.5 text-navy shrink-0" />
                <span>Fitting: <strong className="font-semibold text-navy">{product.cut}</strong></span>
              </div>
            )}
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

        {/* Direct WhatsApp Order CTA Button (Aturan Hierarki 60-30-10: Tinted Green #F0FDF4, Solid saat Hover) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => openWhatsApp(WA_MESSAGES.productInquiry(product.name))}
            aria-label={`Pesan ${product.name} via WhatsApp`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D] hover:bg-wa hover:text-white text-sm font-bold transition-colors duration-200 group/btn active:scale-95 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pesan via WA</span>
            <ArrowUpRight className="w-4 h-4 opacity-75 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
