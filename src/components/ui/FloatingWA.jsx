import React from 'react';
import { openWhatsApp, WA_MESSAGES } from '@/lib/wa';

function WhatsAppIcon({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingWA({ isHidden = false }) {
  return (
    <aside 
      aria-label="Kontak Cepat WhatsApp"
      aria-hidden={isHidden}
      className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 sm:bottom-6 sm:right-6 z-40 flex items-center group transition-all duration-300 ${
        isHidden 
          ? 'opacity-0 pointer-events-none scale-75' 
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Tooltip on Hover (Desktop) */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-navy text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-line/20">
        Tanya admin via WhatsApp
      </span>

      {/* Floating Button dengan Proteksi Anti-Bot (onClick dinamis tanpa link href polos) */}
      <button
        type="button"
        onClick={() => openWhatsApp(WA_MESSAGES.general)}
        aria-label="Hubungi Admin YassTshirt via WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-wa hover:bg-wa-hover text-white shadow-wa transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
      >
        {/* Subtle Ping Animation with Motion-Reduce Support */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping motion-reduce:animate-none opacity-75" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />

        <WhatsAppIcon className="w-7 h-7 text-white" />
      </button>
    </aside>
  );
}
