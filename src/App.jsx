import React, { useState, Suspense, lazy } from 'react';
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

// Lazy load ImageLightboxModal agar payload JavaScript awal ringan dan modal hanya diunduh saat dibutuhkan
const ImageLightboxModal = lazy(() => import('./components/ImageLightboxModal'));

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
