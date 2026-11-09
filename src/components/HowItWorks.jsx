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
    <section id="cara-pesan" className="py-16 sm:py-24 bg-white border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-mute">
            MUDAH & CEPAT
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Cara Pesan Kaos Custom di YassTshirt
          </h2>
          <p className="mt-3 text-sm sm:text-base text-mute leading-relaxed">
            Hanya 4 langkah praktis dari chat sampai kaos sampai di tanganmu. Tanpa proses registrasi yang membingungkan.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="relative">
          
          {/* 21st.dev Connected Rail (Desktop Dashed Connector) */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute top-[45px] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-navy/20 -z-0 pointer-events-none" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {ORDER_STEPS.map((step, idx) => {
              const IconComponent = stepIcons[step.icon] || MessageSquareText;
              return (
                <div 
                  key={step.step} 
                  className="group relative flex flex-col items-start bg-cream/40 hover:bg-white p-7 rounded-2xl border border-line hover:border-navy/30 hover:shadow-card hover:-translate-y-1.5 transition-all duration-300"
                >
                  
                  {/* Step Number & Icon Header */}
                  <div className="w-full flex items-center justify-between mb-6">
                    {/* Animated Icon Node */}
                    <div className="w-13 h-13 rounded-2xl bg-[#14213D14] text-navy p-3 flex items-center justify-center shadow-sm group-hover:bg-navy group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <IconComponent className="w-6 h-6 transition-transform duration-300" />
                    </div>

                    {/* Step Number with Active Accent */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-navy/20 group-hover:bg-accent transition-colors duration-300" />
                      <span className="text-2xl font-black text-navy/30 group-hover:text-navy transition-colors duration-300">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-navy transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">
                    {step.description}
                  </p>

                  {/* Desktop Step Flow Arrow Indicator */}
                  {idx < 3 && (
                    <div 
                      aria-hidden="true"
                      className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-line shadow-sm items-center justify-center text-navy/40 group-hover:text-navy group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                  {/* Mobile Indicator connecting pill */}
                  <div className="mt-5 pt-3 border-t border-line/60 w-full flex items-center justify-between text-[11px] font-semibold text-mute">
                    <span>Langkah {idx + 1} dari 4</span>
                    <span className="text-navy opacity-0 group-hover:opacity-100 transition-opacity">Siap ✓</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* CTA prompt below steps with Shimmer Button */}
        <div className="mt-16 text-center">
          <p className="text-sm text-mute mb-4 font-medium">
            Sudah siap mencetak kaos custom atau mau tanya-tanya dulu?
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 px-9 py-4 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-sm shadow-wa transition-transform active:scale-95 group"
          >
            {/* Shimmer Sheen Effect */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer motion-reduce:animate-none pointer-events-none" />
            
            <span className="relative z-10">Mulai Chat Sekarang via WhatsApp</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
