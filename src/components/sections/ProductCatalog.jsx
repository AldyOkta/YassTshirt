import React, { useState, useCallback } from 'react';
import ProductCard from '../ui/ProductCard';
import { PRODUCTS, FITTING_GUIDE } from '@/data/products';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';
import { HelpCircle, MessageSquare, Shirt, Check } from 'lucide-react';
import BlurText from '../ui/BlurText';

export default function ProductCatalog({ onOpenModal, onModalStateChange }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleOpenModal = useCallback((product) => {
    if (onOpenModal) onOpenModal(product);
    if (onModalStateChange) onModalStateChange(true);
  }, [onOpenModal, onModalStateChange]);

  const filters = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'reguler', label: 'Reguler Fit' },
    { id: 'oversize', label: 'Oversize' },
    { id: 'boxy', label: 'Boxy Fit' },
    { id: 'package', label: 'Brand Package' },
    { id: 'partai', label: 'Partai & Vendor' },
  ];

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'reguler') return item.fit === 'reguler';
    if (selectedFilter === 'oversize') return item.fit === 'oversize';
    if (selectedFilter === 'boxy') return item.fit === 'boxy';
    if (selectedFilter === 'package') return item.fit === 'package';
    if (selectedFilter === 'partai') {
      return item.category === 'partai' || item.category === 'seragam' || item.category === 'outerwear' || item.fit === 'partai';
    }
    return true;
  });

  return (
    <section id="katalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="mb-8 sm:mb-10">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-mute">
            KATALOG SABLON DTF
          </span>
          <BlurText
            text="Pilihan Pola Kaos & Paket Sablon"
            delay={60}
            animateBy="words"
            direction="top"
            as="h2"
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight"
          />
          <p className="mt-2 text-sm sm:text-base text-mute max-w-2xl leading-relaxed">
            Tersedia pola potongan Reguler, Oversize, hingga Boxy cut dengan bahan cotton combed premium dan jaminan sablon DTF tajam beresolusi tinggi.
          </p>
        </div>

        {/* Filter Tabs Bar (Layout stabil, tanpa border-jump dan pergeseran teks) */}
        <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {filters.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-navy text-white border-navy shadow-sm'
                    : 'bg-white hover:bg-cream text-mute border-line hover:text-navy hover:border-mute/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fitting Guide Overview Card (Edukasi Pola Kaos) */}
      <div className="mb-10 bg-white rounded-2xl p-5 sm:p-7 border border-line shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-line pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-mute flex items-center gap-1.5">
              <Shirt className="w-4 h-4 text-navy" />
              Panduan Fitting Kaos YassTshirt
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-navy mt-1">
              Kenali Perbedaan 3 Pola Kaos Kami
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-mute max-w-md">
            Pilih potongan yang paling pas dengan karakter brand kamu. Klik kartu pola untuk menyaring katalog (klik lagi untuk menampilkan semua).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FITTING_GUIDE.map((guide) => {
            const isSelected = selectedFilter === guide.id;
            return (
              <div
                key={guide.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedFilter(isSelected ? 'all' : guide.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedFilter(isSelected ? 'all' : guide.id);
                  }
                }}
                className={`text-left p-4 rounded-xl border transition-colors duration-200 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-cream/70 border-navy shadow-sm'
                    : 'bg-white hover:bg-cream/40 border-line hover:border-mute/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                      isSelected ? 'bg-navy text-white' : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {guide.name}
                  </span>
                  <span className="text-[11px] font-semibold text-mute">
                    {guide.tagline}
                  </span>
                </div>
                <p className="text-xs text-mute mt-2.5 leading-relaxed">
                  {guide.description}
                </p>
                <ul className="mt-3 space-y-1.5 text-[11px] text-navy font-medium">
                  {guide.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-navy shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Grid (Dengan min-height agar tidak collapse dan memicu scrollbar shift) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[480px] content-start">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={handleOpenModal}
          />
        ))}
      </div>

      {/* Bottom Info Banner: Custom Request Outside Catalog */}
      <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-line flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center shrink-0 text-navy hidden sm:flex">
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

        <button
          type="button"
          onClick={() => openWhatsApp(WA_MESSAGES.consultation)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-navy text-navy hover:bg-navy/5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-navy" />
          <span>Tanya Model Lain via WA</span>
        </button>
      </div>

    </section>
  );
}
