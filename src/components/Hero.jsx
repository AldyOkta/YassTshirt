import React, { useRef } from 'react';
import { MessageCircle, ArrowRight, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { openWhatsApp, WA_MESSAGES } from '../lib/wa';
import SplitText from './SplitText';

export default function Hero() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax offsets (100% GPU composited translateY & rotate)
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 60]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 35]);
  const yStamp = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -35]);

  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-6, shouldReduceMotion ? -6 : -13]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [6, shouldReduceMotion ? 6 : 13]);
  const rotateStamp = useTransform(scrollYProgress, [0, 1], [6, shouldReduceMotion ? 6 : -4]);

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Main Headline with React Bits SplitText Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.12]">
              <SplitText
                text="KAOS CUSTOM SABLON SATUAN & PARTAI"
                tag="span"
                splitType="words"
                effect="rise"
                duration={0.7}
                delay={65}
                textAlign="inherit"
                className="text-navy font-extrabold tracking-tight"
              />
            </h1>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-mute max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Wujudkan kaos impianmu dengan teknologi cetak sablon DTF terbaik. Hasil cetak lentur,
              tajam hingga gradasi foto, dan awet dicuci berkali-kali. Bisa pesan 1 kaos saja atau ratusan pcs untuk komunitas.
            </p>

            {/* Dual CTAs: Primary WA (Hijau) & Secondary Catalog (Garis Navy 1.5px) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => openWhatsApp(WA_MESSAGES.general)}
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-base shadow-wa transition-transform active:scale-95 group cursor-pointer"
              >
                {/* Shimmer Sheen Sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer motion-reduce:animate-none pointer-events-none" />

                <MessageCircle className="w-5 h-5 fill-white/20 relative z-10" />
                <span className="relative z-10">Pesan via WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-navy text-navy hover:bg-navy/5 font-bold text-base transition-colors"
              >
                <span>Lihat Katalog</span>
              </a>
            </div>

            {/* Quick Trust Badges (Reflow 1 kolom di mobile agar teks tidak terjepit, 3 kolom di desktop) */}
            <div className="pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
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

          {/* Right Column: Hero Visual Showcase (21st.dev Fanned-Out Stack with Parallax Float) */}
          <div className="lg:col-span-5 relative group cursor-pointer select-none">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] flex items-center justify-center animate-float-gentle motion-reduce:animate-none">

              {/* Card 1 (Left Fan): Kaos Reguler with Parallax */}
              <motion.div
                style={{ y: yLeft, rotate: rotateLeft }}
                className="absolute inset-y-6 left-1 w-[76%] z-10 will-change-transform"
              >
                <div className="w-full h-full bg-white rounded-3xl p-2.5 shadow-md border border-line -translate-x-2 group-hover:-translate-x-8 group-hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-cream/40 flex items-center justify-center">
                    <img
                      src="/detail-reguler.webp"
                      alt="Kaos Reguler Fit DTF YassTshirt"
                      width="400"
                      height="500"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-navy/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Reguler Fit
                  </div>
                </div>
              </motion.div>

              {/* Card 2 (Right Fan): Kaos Oversize with Parallax */}
              <motion.div
                style={{ y: yRight, rotate: rotateRight }}
                className="absolute inset-y-6 right-1 w-[76%] z-10 will-change-transform"
              >
                <div className="w-full h-full bg-white rounded-3xl p-2.5 shadow-md border border-line translate-x-2 group-hover:translate-x-8 group-hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-cream/40 flex items-center justify-center">
                    <img
                      src="/detail-oversize.webp"
                      alt="Kaos Oversize Fit DTF YassTshirt"
                      width="400"
                      height="500"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-navy/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Oversize 24s
                  </div>
                </div>
              </motion.div>

              {/* Card 3 (Center / Front): Logo Brand YassTshirt with Parallax */}
              <motion.div
                style={{ y: yCenter }}
                className="relative w-[82%] z-20 will-change-transform"
              >
                <div className="w-full bg-white rounded-3xl p-3.5 shadow-card border border-line group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 ease-out overflow-hidden">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream flex items-center justify-center">
                    <img
                      src="/logo-2.webp"
                      alt="Logo YassTshirt Custom Sablon DTF"
                      width="400"
                      height="400"
                      className="w-full h-full object-contain p-4"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="pt-2 text-center">
                    <span className="text-[11px] font-extrabold text-navy tracking-wider">YASSTSHIRT</span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Quality Stamp with Parallax Counter-Float */}
              <motion.div
                style={{ y: yStamp, rotate: rotateStamp }}
                className="absolute -top-3 -right-3 z-30 will-change-transform"
              >
                <div className="bg-accent text-navy p-3.5 sm:p-4 rounded-2xl shadow-card flex flex-col items-center justify-center border border-navy/10 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">Sablon</span>
                  <span className="text-base sm:text-lg font-black leading-none tabular-nums">100%</span>
                  <span className="text-[9px] sm:text-[10px] font-bold">Presisi</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
