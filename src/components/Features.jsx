import React from 'react';
import { Palette, Sparkles, Focus, ShieldCheck } from 'lucide-react';
import { FEATURES } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

const iconMap = {
  Palette,
  Sparkles,
  Focus,
  ShieldCheck,
};

function StatCounterItem({ value, suffix, label, desc, isVisible }) {
  const count = useCountUp(value, 1200, isVisible);

  return (
    <div className="text-center sm:text-left p-5 rounded-2xl bg-white border border-line shadow-xs hover:shadow-card transition-shadow">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy tracking-tight flex items-center justify-center sm:justify-start tabular-nums">
        <span>{count.toLocaleString('id-ID')}</span>
        <span className="text-[#16A34A] ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-bold text-navy mt-1.5">{label}</div>
      <div className="text-xs text-mute mt-0.5 leading-relaxed">{desc}</div>
    </div>
  );
}

export default function Features() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="keunggulan" className="py-16 sm:py-24 bg-[#F8FAFC] border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-mute">
            KENAPA PILIH SABLON DTF?
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Kelebihan Sablon DTF di YassTshirt
          </h2>
          <p className="mt-3 text-base text-mute leading-relaxed max-w-2xl mx-auto">
            Direct to Film (DTF) adalah teknologi sablon digital modern yang menggabungkan ketajaman warna foto 
            dengan kelenturan dan daya tahan sablon manual kelas atas.
          </p>
        </div>

        {/* Features 4-Column Grid with 21st.dev Staggered Scroll Reveal */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                style={{
                  transitionDelay: `${idx * 80}ms`,
                }}
                className={`bg-white p-7 rounded-2xl border border-line shadow-xs hover:shadow-card hover:border-slate-300 transition-all duration-500 ease-out flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
                }`}
              >
                <div>
                  {/* Top Icon (Soft Emerald Box) & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
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
                  <span className="ml-auto text-[#15803D] font-bold">✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 21st.dev Viewport Number Count-Up Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCounterItem
            value={1440}
            suffix=" DPI"
            label="Resolusi Cetak Ultra-HD"
            desc="Gradasi foto tajam & presisi"
            isVisible={isVisible}
          />
          <StatCounterItem
            value={50}
            suffix="+ Kali"
            label="Ketahanan Cuci Sablon"
            desc="Lentur & tidak gampang pecah"
            isVisible={isVisible}
          />
          <StatCounterItem
            value={100}
            suffix="%"
            label="Cotton Combed Asli"
            desc="Adem, halus, gramasi 16s-30s"
            isVisible={isVisible}
          />
          <StatCounterItem
            value={1}
            suffix=" Pcs"
            label="Bisa Pesan Satuan"
            desc="Tanpa minimum order (No MOQ)"
            isVisible={isVisible}
          />
        </div>

      </div>
    </section>
  );
}
