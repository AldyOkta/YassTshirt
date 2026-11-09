import React, { useState } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import { SHOP_CONFIG } from '../data/products';
import { createWhatsAppLink, WA_MESSAGES } from '../lib/wa';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waUrl = createWhatsAppLink(SHOP_CONFIG.whatsapp, WA_MESSAGES.general);

  const navLinks = [
    { name: 'Katalog Produk', href: '#katalog' },
    { name: 'Keunggulan DTF', href: '#keunggulan' },
    { name: 'Cara Pesan', href: '#cara-pesan' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-cream/90 border-b border-line transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl bg-white shadow-sm p-1.5 border border-line flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img 
                src="/YassTshirt-Logo.png" 
                alt="Logo YassTshirt" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-navy block">
                YassTshirt
              </span>
              <span className="text-xs font-medium text-mute block -mt-1 tracking-wider uppercase">
                Custom Kaos DTF
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-mute hover:text-navy transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button (WhatsApp CTA - Only green element) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-wa hover:bg-wa-hover text-white text-sm font-bold shadow-wa transition-transform active:scale-95 group"
            >
              {/* Shimmer Sheen Sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer motion-reduce:animate-none pointer-events-none" />
              
              <MessageCircle className="w-4 h-4 fill-white/20 relative z-10" />
              <span className="relative z-10">Chat WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-wa text-white shadow-sm"
              aria-label="Chat WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy hover:bg-white border border-line focus:outline-none focus:ring-2 focus:ring-navy"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream border-b border-line px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-navy hover:bg-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-wa hover:bg-wa-hover text-white font-bold text-center shadow-wa"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
