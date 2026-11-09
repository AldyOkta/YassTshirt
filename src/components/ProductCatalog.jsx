import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';
import { HelpCircle, MessageSquare } from 'lucide-react';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'satuan', label: 'Satuan (No Min. Order)' },
    { id: 'partai', label: 'Partai & Komunitas' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === selectedCategory || item.category === 'outerwear' || item.category === 'seragam');

  const customOrderWa = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.consultation);

  return (
    <section id="katalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header (Aturan 33: Label huruf kapital kecil #5B6577) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-mute">
            KATALOG SABLON DTF
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Pilih Model Kaos & Paket Sablon
          </h2>
          <p className="mt-2 text-sm sm:text-base text-mute max-w-xl">
            Semua produk menggunakan bahan cotton berkualitas tinggi dengan jaminan hasil sablon DTF tajam dan awet.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white hover:bg-cream text-mute border border-line hover:text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Info Banner: Custom Request Outside Catalog */}
      <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-line flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#14213D14] flex items-center justify-center shrink-0 text-navy hidden sm:flex">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-navy">
              Punya spesifikasi bahan atau model lain?
            </h4>
            <p className="text-xs sm:text-sm text-mute mt-0.5">
              Kami juga melayani raglan, jersey, totebag canvas, dan request model kustom khusus.
            </p>
          </div>
        </div>

        <a
          href={customOrderWa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-navy text-navy hover:bg-navy/5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4 text-navy" />
          <span>Tanya Model Lain via WA</span>
        </a>
      </div>

    </section>
  );
}
