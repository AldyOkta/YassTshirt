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

  // Lock body scroll dan tangani tombol Escape secara stabil (tanpa konflik browser history)
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
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
        
        {/* Modal Top Bar (shrink-0) - Navy tua & 2-baris di mobile agar judul tidak terpotong */}
        <header className="flex shrink-0 items-center justify-between gap-2 sm:gap-3 border-b border-white/10 px-4 sm:px-6 py-3 bg-[#0F1A33] text-white z-20">
          <div className="min-w-0 flex-1 pr-1 sm:pr-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug sm:leading-normal sm:truncate">
                {product.name}
              </h3>
              {product.badge && (
                <span className="self-start sm:self-auto shrink-0 bg-accent text-navy text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Action Toolbar: Zoom Control (Desktop) & Close Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Zoom Toolbar (Hidden on Mobile) */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 1}
                aria-label="Perkecil zoom"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs font-bold text-white px-2 py-1 rounded-md bg-white/10 min-w-[50px] text-center select-none tabular-nums border border-white/10">
                {Math.round(scale * 100)}%
              </div>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 3.5}
                aria-label="Perbesar zoom"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {scale > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset zoom ke 100%"
                  aria-label="Kembalikan zoom ke 100%"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent text-navy hover:brightness-110 transition-all cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}

              <div className="h-4 w-px bg-white/20 mx-1" />
            </div>

            {/* Close Button (Terlihat di semua ukuran layar) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Modal Body / Free Pan & Zoom Image Viewer (flex-1 min-h-0 latar gelap galeri kontras tinggi) */}
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
          className={`relative min-h-0 flex-1 overflow-hidden bg-[#0B1326] touch-none flex items-center justify-center p-2 sm:p-4 select-none ${
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
              className="max-h-[calc(100dvh-12rem)] max-w-full w-auto h-auto select-none object-contain rounded-xl pointer-events-none shadow-[0_12px_40px_-10px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Pan Hint Overlay Badge when Zoomed In */}
          {scale > 1 && (
            <div className="absolute top-3 left-3 bg-[#0F1A33]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md pointer-events-none animate-fade-in z-10 border border-white/10">
              <Move className="w-3 h-3 text-accent" />
              <span>Klik &amp; geser untuk melihat detail</span>
            </div>
          )}

          {/* Mobile Floating Zoom Controls (Hanya tampil di mobile - sm:hidden) */}
          <div className="absolute bottom-3 right-3 sm:hidden z-20 flex items-center gap-1 rounded-full bg-[#0F1A33]/90 p-1 text-white shadow-xl backdrop-blur-md border border-white/15 animate-fade-in">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              aria-label="Perkecil zoom"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-bold min-w-[38px] text-center tabular-nums select-none px-0.5">
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 3.5}
              aria-label="Perbesar zoom"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {scale > 1 && (
              <button
                type="button"
                onClick={handleReset}
                aria-label="Kembalikan zoom ke 100%"
                title="Reset zoom"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-accent text-navy hover:brightness-110 active:scale-95 transition-all cursor-pointer ml-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Bottom Bar / Order CTA (shrink-0 selalu terlihat utuh) */}
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-4 sm:px-6 py-3 bg-white z-20 shadow-[0_-8px_20px_-12px_rgba(20,33,61,0.12)]">
          <p className="hidden text-xs text-mute sm:block">
            Gunakan scroll mouse / tombol +/- untuk zoom, drag untuk geser
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
