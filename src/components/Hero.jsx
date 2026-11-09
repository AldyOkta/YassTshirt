import React from 'react';
import { MessageCircle, ArrowRight, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

export default function Hero() {
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.general);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-line text-mute text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>SABLON DTF FULL COLOR & HIGH DETAIL</span>
            </div>

            {/* Main Headline (Aturan 36: Kata penekanan di judul tebal navy saja) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.12]">
              Bikin Kaos Custom <br className="hidden sm:inline" />
              <span className="text-navy font-black">Satuan & Partai</span> Bebas Warna
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-mute max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Wujudkan kaos impianmu dengan teknologi cetak sablon DTF terbaik. Hasil cetak lentur, 
              tajam hingga gradasi foto, dan awet dicuci berkali-kali. Bisa pesan 1 kaos saja atau ratusan pcs untuk komunitas.
            </p>

            {/* Dual CTAs: Primary WA (Hijau) & Secondary Catalog (Garis Navy 1.5px) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-base shadow-wa transition-transform active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Pesan via WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-navy text-navy hover:bg-navy/5 font-bold text-base transition-colors"
              >
                <span>Lihat Katalog</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-line grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-navy shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy">Bisa Satuan (No MOQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-navy shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy">Bahan 100% Combed</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-navy shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy">Cepat 1-2 Hari</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Mockup Card */}
              <div className="relative z-10 bg-white rounded-3xl p-3 shadow-card border border-line overflow-hidden">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream">
                  <img
                    src="/sample-kaos-1.jpg"
                    alt="Contoh Hasil Sablon DTF YassTshirt"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Floating Price Tag inside image */}
                  <div className="absolute bottom-4 left-4 bg-navy/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-white/10">
                    <span className="text-accent font-black">Mulai</span> Rp 52.000 / pcs
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Card */}
              <div className="absolute -bottom-6 -left-6 z-20 hidden sm:block w-48 bg-white p-3 rounded-2xl shadow-card border border-line">
                <div className="aspect-square rounded-xl overflow-hidden bg-cream mb-2">
                  <img
                    src="/sample-kaos-2.jpg"
                    alt="Detail Hasil Sablon DTF"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-xs font-bold text-navy">Cotton Combed 24s</div>
                <div className="text-[10px] text-mute">Sablon DTF Tahan Cuci</div>
              </div>

              {/* Decorative Quality Stamp (Aksen Kuning #F2B705 teks Navy #14213D) */}
              <div className="absolute -top-4 -right-4 z-20 bg-accent text-navy p-4 rounded-2xl shadow-card flex flex-col items-center justify-center rotate-6 border border-navy/10">
                <span className="text-xs font-bold tracking-wider uppercase">Sablon</span>
                <span className="text-lg font-black leading-none">100%</span>
                <span className="text-[10px] font-bold">Presisi</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
