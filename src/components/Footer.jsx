import React from 'react';
import { Instagram, MessageCircle, MapPin, Clock, Truck } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

export default function Footer() {
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.general);

  return (
    <footer className="bg-white border-t border-line pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-line">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm p-1.5 border border-line flex items-center justify-center">
                <img
                  src="/YassTshirt-Logo.png"
                  alt="YassTshirt Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-extrabold text-navy">
                {SHOP_CONFIG.name}
              </span>
            </div>
            
            <p className="text-sm text-mute leading-relaxed max-w-sm">
              Workshop sablon digital DTF (Direct to Film) berkualitas tinggi. Solusi cetak kaos custom 
              desain bebas warna untuk kebutuhan personal, komunitas, brand apparel, dan event.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SHOP_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream hover:bg-navy hover:text-white text-navy border border-line flex items-center justify-center transition-colors"
                aria-label="Instagram YassTshirt"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SHOP_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream hover:bg-navy hover:text-white text-navy border border-line flex items-center justify-center transition-colors"
                aria-label="TikTok YassTshirt"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cream hover:bg-wa hover:text-white text-navy border border-line flex items-center justify-center transition-colors"
                aria-label="WhatsApp YassTshirt"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigasi Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              NAVIGASI CEPAT
            </h4>
            <ul className="space-y-2 text-sm text-mute">
              <li>
                <a href="#katalog" className="hover:text-navy transition-colors">
                  Katalog Kaos Satuan & Partai
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-navy transition-colors">
                  Keunggulan Sablon DTF
                </a>
              </li>
              <li>
                <a href="#cara-pesan" className="hover:text-navy transition-colors">
                  4 Langkah Pemesanan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-navy transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Operational & Shipping Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              INFORMASI LAYANAN
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-mute">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                <span>{SHOP_CONFIG.operatingHours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                <span>{SHOP_CONFIG.addressDescription}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                <span>Pengiriman dari workshop ke seluruh wilayah Indonesia.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mute">
          <p>© {new Date().getFullYear()} {SHOP_CONFIG.name}. Seluruh hak cipta dilindungi.</p>
          <p>Ditenagai teknologi sablon DTF & Cotton Combed Premium.</p>
        </div>
      </div>
    </footer>
  );
}
