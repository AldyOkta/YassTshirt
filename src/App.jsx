import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import MarqueeTicker from './components/ui/MarqueeTicker';
import Features from './components/sections/Features';
import ProductCatalog from './components/sections/ProductCatalog';
import HowItWorks from './components/sections/HowItWorks';
import FAQ from './components/sections/FAQ';
import CallToAction from './components/sections/CallToAction';
import Footer from './components/sections/Footer';
import FloatingWA from './components/ui/FloatingWA';

// Lazy load ImageLightboxModal agar payload JavaScript awal ringan dan modal hanya diunduh saat dibutuhkan
const ImageLightboxModal = lazy(() => import('./components/ui/ImageLightboxModal'));

export default function App() {
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const handleCloseModal = () => {
    setActiveModalProduct(null);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-navy selection:bg-navy selection:text-white overflow-x-hidden relative">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <MarqueeTicker />
        <Features />
        <ProductCatalog onOpenModal={setActiveModalProduct} />
        <HowItWorks onOpenModal={setActiveModalProduct} />
        <FAQ />
        <CallToAction />
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Floating Action Button (WhatsApp - Only Green Element, disembunyikan saat modal terbuka) */}
      <FloatingWA isHidden={Boolean(activeModalProduct)} />

      {/* Centralized Lazy Loaded Lightbox Modal */}
      {activeModalProduct && (
        <Suspense fallback={null}>
          <ImageLightboxModal
            product={activeModalProduct}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </div>
  );
}
