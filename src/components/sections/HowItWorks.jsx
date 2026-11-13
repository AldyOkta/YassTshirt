import React from 'react';
import {
  MessageCircle,
  UploadCloud,
  Lightbulb,
  ClipboardList,
  Receipt,
  CheckCircle2,
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import { ORDER_STEPS } from '@/data/content';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import BlurText from '../ui/BlurText';

const stepIcons = {
  MessageCircle,
  UploadCloud,
  Lightbulb,
  ClipboardList,
  Receipt,
  CheckCircle2
};

export default function HowItWorks({ onOpenModal }) {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="cara-pesan" className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-mute">
            SISTEM ORDER RESMI
          </span>
          <BlurText
            text="Cara Pesan Kaos Custom di YassTshirt"
            delay={60}
            animateBy="words"
            direction="top"
            as="h2"
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight justify-center"
          />
          <p className="mt-3 text-sm sm:text-base text-mute leading-relaxed max-w-2xl mx-auto">
            6 langkah praktis dan transparan dari chat WhatsApp sampai kaos selesai diproduksi. Tanpa proses registrasi yang membingungkan.
          </p>
        </div>

        {/* 6 Steps Grid (3 Kolom x 2 Baris di Desktop with 21st.dev Staggered Scroll Reveal) */}
        <div ref={sectionRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 relative z-10">
            {ORDER_STEPS.map((step, idx) => {
              const IconComponent = stepIcons[step.icon] || MessageCircle;
              return (
                <div
                  key={step.step}
                  style={{
                    transitionDelay: `${idx * 75}ms`,
                  }}
                  className={`group relative flex flex-col justify-between items-start bg-white p-6 sm:p-7 rounded-2xl border border-line hover:border-slate-300 hover:shadow-card hover:-translate-y-1.5 transition-all duration-500 ease-out ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
                    }`}
                >

                  {/* Top: Step Number & Icon Header */}
                  <div className="w-full">
                    <div className="w-full flex items-center justify-between mb-5">
                      {/* Animated Icon Node (Soft Emerald Tint #DCFCE7 / #15803D) */}
                      <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#15803D] p-3 flex items-center justify-center shadow-xs group-hover:bg-[#16A34A] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <IconComponent className="w-5 h-5 transition-transform duration-300" />
                      </div>

                      {/* Step Number with Active Accent */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]/30 group-hover:bg-[#16A34A] transition-colors duration-300" />
                        <span className="text-xl sm:text-2xl font-black text-slate-300 group-hover:text-[#16A34A] transition-colors duration-300 tabular-nums">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold text-navy mb-2 group-hover:text-navy transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-mute leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Footer Indicator */}
                  <div className="mt-5 pt-3 border-t border-line/60 w-full flex items-center justify-between text-[11px] font-semibold text-mute">
                    <span>Langkah {idx + 1} dari 6</span>
                    <span className="text-[#15803D] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Siap ✓</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Official Order Diagram Banner (Klik untuk Zoom sistem-order.png) */}
        <div className="mt-12 bg-white rounded-2xl p-5 sm:p-7 border border-line flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0 hidden sm:flex">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-navy">
                Bagan Resmi Alur Pemesanan YassTshirt
              </h4>
              <p className="text-xs sm:text-sm text-mute mt-0.5">
                Lihat infografik bagan alur pemesanan lengkap dan nomor CS resmi toko kami.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenModal) {
                onOpenModal({
                  name: 'Bagan Resmi Alur Pemesanan Kaos Custom YassTshirt',
                  image: '/sistem-order.webp',
                  badge: 'Alur Resmi Toko',
                  cut: 'CS WhatsApp Resmi YassTshirt',

                });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 min-h-[44px] rounded-full border border-navy text-navy hover:bg-navy hover:text-white text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <ZoomIn className="w-4 h-4" />
            <span>Lihat Bagan Alur (Zoom)</span>
          </button>
        </div>

        {/* CTA prompt below steps with Shimmer Button */}
        <div className="mt-14 text-center">
          <p className="text-sm text-mute mb-4 font-medium">
            Sudah siap mencetak kaos custom atau mau konsultasi desain dulu?
          </p>
          <button
            type="button"
            onClick={() => openWhatsApp(WA_MESSAGES.general)}
            className="relative overflow-hidden inline-flex items-center gap-2 px-9 py-4 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-sm shadow-wa transition-transform active:scale-95 group cursor-pointer"
          >
            {/* Shimmer Sheen Effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer motion-reduce:animate-none pointer-events-none" />

            <span className="relative z-10">Mulai Chat Sekarang via WhatsApp</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
}
