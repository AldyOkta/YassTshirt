import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Plus, 
  Minus, 
  RotateCcw, 
  MessageCircle, 
  ArrowUpRight, 
  Check, 
  Move 
} from 'lucide-react';
import { openWhatsApp, WA_MESSAGES } from '../lib/wa';

export default function ImageLightboxModal({ product, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef(null);
  const viewerRef = useRef(null);

  // Reset scale and position when product changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, [product]);

  // Lock body scroll, tangani tombol Escape, dan integrasi tombol Back gesture di ponsel
  useEffect(() => {
    if (!product) return;

    // Push state sementara agar tombol Back ponsel menutup modal tanpa keluar dari website
    window.history.pushState({ lightboxOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Jika modal ditutup lewat tombol X atau klik luar (bukan tombol Back), rapikan history browser
      if (window.history.state?.lightboxOpen) {
        window.history.back();
      }
    };
  }, [product, onClose]);

  // Wheel zoom listener non-passive agar e.preventDefault() tidak memicu warning konsol browser
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !product) return;

    const onWheelNative = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setScale((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3.5));
      } else {
        setScale((prev) => {
          const next = Math.max(Number((prev - 0.35).toFixed(2)), 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      }
    };

    viewer.addEventListener('wheel', onWheelNative, { passive: false });
    return () => {
      viewer.removeEventListener('wheel', onWheelNative);
    };
  }, [product]);

  if (!product) return null;

  // Zoom control helpers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { ...position };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: initialPosRef.current.x + dx,
      y: initialPosRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Double click toggle
  const handleDoubleClick = () => {
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      initialPosRef.current = { ...position };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1 && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPosition({
        x: initialPosRef.current.x + dx,
        y: initialPosRef.current.y + dy,
      });
    } else if (e.touches.length === 2 && touchDistanceRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist - touchDistanceRef.current;
      if (Math.abs(delta) > 5) {
        setScale((prev) => {
          const next = delta > 0 ? Math.min(prev + 0.05, 3.5) : Math.max(prev - 0.05, 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return Number(next.toFixed(2));
        });
        touchDistanceRef.current = dist;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistanceRef.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau detail gambar ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-navy/85 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        // Tutup jika klik area latar belakang luar modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Card */}
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-line max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]">
        
        {/* Modal Top Bar (shrink-0) */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 sm:px-6 py-3 bg-white z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            {product.badge && (
              <span className="shrink-0 bg-accent text-navy text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {product.badge}
              </span>
            )}
            <h3 className="text-sm sm:text-base font-bold text-navy truncate max-w-[150px] xs:max-w-[200px] sm:max-w-none">
              {product.name}
            </h3>
          </div>

          {/* Action Toolbar: Zoom Control & Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom Out Button */}
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              aria-label="Perkecil zoom"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-line flex items-center justify-center text-navy hover:bg-cream disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Scale Percentage Indicator */}
            <div className="text-[11px] sm:text-xs font-bold text-navy px-2 py-1 rounded-md bg-navy/5 min-w-[48px] sm:min-w-[50px] text-center select-none tabular-nums">
              {Math.round(scale * 100)}%
            </div>

            {/* Zoom In Button */}
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 3.5}
              aria-label="Perbesar zoom"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-line flex items-center justify-center text-navy hover:bg-cream disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Reset Zoom Button */}
            {scale > 1 && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset zoom ke 100%"
                aria-label="Kembalikan zoom ke 100%"
                className="inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-full text-[11px] font-bold bg-navy text-white hover:bg-navy/90 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            <div className="h-5 w-px bg-line mx-1 hidden sm:block" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-line flex items-center justify-center text-mute hover:text-navy hover:bg-cream transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Modal Body / Free Pan & Zoom Image Viewer (flex-1 min-h-0 tanpa batas tinggi statis) */}
        <div
          ref={viewerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative min-h-0 flex-1 overflow-hidden bg-[#F5F2EC] touch-none flex items-center justify-center p-2 sm:p-4 select-none ${
            scale === 1
              ? 'cursor-zoom-in'
              : isDragging
              ? 'cursor-grabbing'
              : 'cursor-grab'
          }`}
        >
          {/* Draggable & Scalable Image Container */}
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="flex h-full w-full items-center justify-center will-change-transform"
          >
            <img
              src={product.image}
              alt={product.name}
              draggable={false}
              className="max-h-[calc(100dvh-11rem)] max-w-full w-auto h-auto select-none object-contain rounded-lg pointer-events-none shadow-sm"
            />
          </div>

          {/* Pan Hint Overlay Badge when Zoomed In */}
          {scale > 1 && (
            <div className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md pointer-events-none animate-fade-in z-10">
              <Move className="w-3 h-3 text-accent" />
              <span>Klik &amp; geser untuk melihat detail</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar / Order CTA (shrink-0 selalu terlihat utuh) */}
        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-line px-4 sm:px-6 py-3 bg-white z-20">
          <p className="hidden text-xs text-mute sm:block">
            Putar scroll mouse / tombol +/- untuk zoom, drag untuk geser
          </p>

          <div className="ml-auto flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right leading-tight">
              <div className="text-[10px] uppercase font-bold text-mute">Harga Mulai</div>
              <div className="text-sm sm:text-base font-extrabold text-navy tabular-nums">{product.priceLabel}</div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp(WA_MESSAGES.productInquiry(product.name))}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 min-h-[44px] rounded-full bg-wa hover:bg-wa-hover text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20 shrink-0" />
              <span>Pesan <span className="hidden sm:inline">Model Ini </span>via WA</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 shrink-0" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
