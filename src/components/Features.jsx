import React from 'react';
import { Palette, Sparkles, Focus, ShieldCheck } from 'lucide-react';
import { FEATURES } from '../data/products';

const iconMap = {
  Palette,
  Sparkles,
  Focus,
  ShieldCheck,
};

export default function Features() {
  return (
    <section id="keunggulan" className="py-16 sm:py-24 bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-mute">
            KENAPA PILIH SABLON DTF?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Kelebihan Sablon DTF di YassTshirt
          </h2>
          <p className="mt-3 text-base text-mute leading-relaxed">
            Direct to Film (DTF) adalah teknologi sablon digital modern yang menggabungkan ketajaman warna foto 
            dengan kelenturan dan daya tahan sablon manual kelas atas.
          </p>
        </div>

        {/* Features 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="bg-cream/40 p-7 rounded-2xl border border-line shadow-sm hover:shadow-card hover:border-navy/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Badge (Aturan 34: Ikon #14213D di atas kotak #14213D14) */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#14213D14] text-navy flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-mute bg-white px-2.5 py-1 rounded-md border border-line">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-navy mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center text-xs font-semibold text-mute">
                  <span>Standar Cetak HD</span>
                  <span className="ml-auto text-navy">✓</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
