import React from 'react';
import { MessageCircle, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';
import ScrollReveal from '../ui/ScrollReveal';

export default function CallToAction() {

  return (
    <section className="py-14 sm:py-24 bg-[#F0FDF4] border-t border-[#BBF7D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Direct Value & Confident Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Brand Identifier (Soft Emerald Tint) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] text-xs font-bold text-[#15803D]">
              <span>Spesialis Sablon Kaos DTF</span>
            </div>

            {/* Headline — satu warna percaya diri tanpa underline ornamen */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-[1.15]">
              Bawa Desainmu, Biar Kami yang Cetak.
            </h2>

            {/* Sub-headline with Apple-style Scroll Scrub */}
            <ScrollReveal
              as="p"
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={3}
              baseRotation={0}
              splitBy="words"
              wordAnimationStart="top 85%"
              wordAnimationEnd="bottom 55%"
              containerClassName="my-0 max-w-xl"
              textClassName="text-base sm:text-lg text-navy font-medium leading-relaxed"
            >
              Dari 1 kaos sampel pribadi sampai ratusan pcs untuk clothing brand dan komunitas. Kirim konsep atau file desainmu ke WhatsApp, langsung kami cek dan proses dengan standar distro.
            </ScrollReveal>

            {/* 3 Concrete Production Guarantees */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy text-sm sm:text-base">Tanpa Minimum Order</span>
                  <p className="text-xs sm:text-sm text-mute">
                    1 pcs sampel tetap dilayani dengan standar kualitas yang sama persis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy text-sm sm:text-base">100% Cotton Combed Reaktif</span>
                  <p className="text-xs sm:text-sm text-mute">
                    Pilihan gramasi 20s, 24s, 30s serta Heavyweight 16s yang tebal, adem, dan rib kerah rapi.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-navy text-sm sm:text-base">Presisi Cetak DTF 1440 DPI</span>
                  <p className="text-xs sm:text-sm text-mute">
                    Warna cerah, gradasi foto tajam, dan daya rekat kuat tahan 50+ kali cuci.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Button (Aturan Brand: Hijau Khusus WhatsApp) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => openWhatsApp(WA_MESSAGES.consultation)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-wa hover:bg-wa-hover text-white font-extrabold text-base sm:text-lg shadow-wa transition-transform active:scale-[0.98] group cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20 shrink-0" />
                <span>Mulai Order via WhatsApp</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Operating Hours & Guarantee */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-mute font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Buka Setiap Hari (09.00 - 21.00 WIB)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>100% Garansi Cetak Ulang Jika Cacat Sablon</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Studio Product Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-[#BBF7D0] space-y-5">

              {/* Card Header */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-navy tracking-wide">YASSTSHIRT</span>
                  <span className="text-mute ml-2 font-medium">Standar Produksi</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-[11px]">
                  Ready to Print
                </span>
              </div>

              {/* Product Image Canvas */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/brand-package.webp"
                  alt="Paket Brand YassTshirt Custom Kaos Sablon DTF"
                  width="600"
                  height="450"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* 2x2 Specs Grid */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 grid grid-cols-2 gap-3.5 text-xs border border-line">
                <div>
                  <span className="text-[10px] font-bold text-mute block">Bahan Kaos</span>
                  <span className="font-bold text-navy">Cotton Combed 100%</span>
                  <span className="text-mute text-[11px] block">16s / 20s / 24s / 30s</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-mute block">Teknologi Sablon</span>
                  <span className="font-bold text-navy">DTF Ultra-HD</span>
                  <span className="text-mute text-[11px] block">Resolusi 1440 DPI</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-mute block">Pilihan Fitting</span>
                  <span className="font-bold text-navy">Reguler &amp; Oversize</span>
                  <span className="text-mute text-[11px] block">Drop Shoulder / Boxy</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-mute block">Bonus Kemasan</span>
                  <span className="font-bold text-navy">Free Package Box</span>
                  <span className="text-mute text-[11px] block">Ziplock + Stiker + Tag</span>
                </div>
              </div>

              {/* Card Footer: Clear Assurance */}
              <div className="flex items-center justify-between text-xs text-mute pt-1">
                <span className="font-semibold text-navy">Pengerjaan 1–2 Hari Kerja</span>
                <span className="text-navy font-bold">Garansi Cetak Ulang 100%</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
