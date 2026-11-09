import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

export default function FloatingWA() {
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.general);

  return (
    <aside 
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center group"
    >
      {/* Tooltip on Hover (Desktop) */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-line/20">
        Tanya admin via WhatsApp
      </span>

      {/* Floating Button (Aturan 11 & 30: Hijau WA #15803D) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Admin YassTshirt via WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-wa hover:bg-wa-hover text-white shadow-wa transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Subtle Ping Animation with Motion-Reduce Support */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping motion-reduce:animate-none opacity-75" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />

        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </aside>
  );
}
