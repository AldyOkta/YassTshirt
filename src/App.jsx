import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import Features from './components/Features';
import ProductCatalog from './components/ProductCatalog';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-navy selection:bg-navy selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <MarqueeTicker />
        <Features />
        <ProductCatalog />
        <HowItWorks />
        <FAQ />
        <CallToAction />
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Floating Action Button (WhatsApp - Only Green Element) */}
      <FloatingWA />
    </div>
  );
}
