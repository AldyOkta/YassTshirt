import React from 'react';
import { MessageCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

export default function CallToAction() {
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.consultation);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-navy text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-line">
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase border border-white/10">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>KONSULTASI & CEK DESAIN GRATIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Punya Ide Desain Sendiri? <br />
            <span>Wujudkan Jadi Kaos Nyata Sekarang!</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Belum yakin dengan resolusi gambar atau format desainmu? Kirimkan saja ke admin kami lewat WhatsApp. 
            Kami bantu periksa dan buatkan simulasi mockup-nya secara cuma-cuma.
          </p>

          {/* CTA Button (Aturan 11 & 30: Hijau WA) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-wa hover:bg-wa-hover text-white font-extrabold text-base shadow-wa transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Konsultasi Gratis via WhatsApp</span>
            </a>
          </div>

          {/* Response time indicator */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Admin Fast Response (09.00 - 21.00 WIB)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garansi Cetak Ulang Jika Cacat Sablon</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
