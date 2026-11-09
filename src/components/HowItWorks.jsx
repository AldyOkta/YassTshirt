import React from 'react';
import { MessageSquareText, UploadCloud, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { ORDER_STEPS, SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

const stepIcons = {
  MessageSquareText,
  UploadCloud,
  CheckCircle2,
  Truck
};

export default function HowItWorks() {
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.general);

  return (
    <section id="cara-pesan" className="py-16 sm:py-24 bg-white border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-mute">
            MUDAH & CEPAT
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Cara Pesan Kaos Custom di YassTshirt
          </h2>
          <p className="mt-3 text-sm sm:text-base text-mute leading-relaxed">
            Hanya 4 langkah praktis dari chat sampai kaos sampai di rumahmu. Tanpa ribet registrasi akun.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {ORDER_STEPS.map((step, idx) => {
            const IconComponent = stepIcons[step.icon] || MessageSquareText;
            return (
              <div key={step.step} className="relative flex flex-col items-start bg-cream/50 p-6 rounded-2xl border border-line group">
                
                {/* Step Number & Icon Header */}
                <div className="w-full flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#14213D14] text-navy flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-navy/20">
                    {step.step}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-mute leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow indicator for desktop layout between steps */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-navy/25">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* CTA prompt below steps (Aturan 11 & 30: Tombol utama Hijau WA) */}
        <div className="mt-14 text-center">
          <p className="text-sm text-mute mb-4 font-medium">
            Sudah siap mencetak kaos custom atau mau tanya-tanya dulu?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-sm shadow-wa transition-transform active:scale-95"
          >
            <span>Mulai Chat Sekarang via WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
