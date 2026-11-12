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
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        // Tutup jika klik area latar belakang luar modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Dialog Card (border slate-700/70 memisahkan header gelap dari backdrop) */}
      <div className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-700/70 max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]">
        
        {/* Modal Top Bar (shrink-0) - Deep Navy Slate #0F172A & 2-baris di mobile agar judul tidak terpotong */}
        <header className="flex shrink-0 items-center justify-between gap-2 sm:gap-3 border-b border-[#1E293B] px-4 sm:px-6 py-3 bg-[#0F172A] text-white z-20">
          <div className="min-w-0 flex-1 pr-1 sm:pr-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug sm:leading-normal sm:truncate">
                {product.name}
              </h3>
              {product.badge && (
                <span className="self-start sm:self-auto shrink-0 bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] sm:text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full shadow-xs">
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
                className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-100 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="text-xs font-bold text-slate-100 px-2 py-1 rounded-md bg-[#1E293B] min-w-[50px] text-center select-none tabular-nums border border-[#334155]">
                {Math.round(scale * 100)}%
              </div>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 3.5}
                aria-label="Perbesar zoom"
                className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-100 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {scale > 1 && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset zoom ke 100%"
                  aria-label="Kembalikan zoom ke 100%"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1E293B] text-amber-400 border border-amber-500/30 hover:bg-slate-700 transition-all cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}

              <div className="h-4 w-px bg-[#334155] mx-1" />
            </div>

            {/* Close Button (Terlihat di semua ukuran layar) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="w-9 h-9 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-200 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Modal Body / Canvas (#090D16 - Deepest Slate untuk kontras maksimal gambar) */}
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
          className={`relative min-h-0 flex-1 overflow-hidden bg-[#090D16] touch-none flex items-center justify-center p-2 sm:p-4 select-none ${
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
              className="max-h-[calc(100dvh-12rem)] max-w-full w-auto h-auto select-none object-contain rounded-xl pointer-events-none shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Pan Hint Overlay Badge when Zoomed In */}
          {scale > 1 && (
            <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-md pointer-events-none animate-fade-in z-10 border border-slate-700/80">
              <Move className="w-3 h-3 text-amber-400" />
              <span>Klik &amp; geser untuk melihat detail</span>
            </div>
          )}

          {/* Mobile Floating Zoom Controls (Hanya tampil di mobile - sm:hidden) */}
          <div className="absolute bottom-3 right-3 sm:hidden z-20 flex items-center gap-1 rounded-full bg-[#0F172A]/90 p-1 text-slate-100 shadow-xl backdrop-blur-md border border-slate-700/80 animate-fade-in">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              aria-label="Perkecil zoom"
              className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-colors cursor-pointer"
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
              className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-slate-200 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {scale > 1 && (
              <button
                type="button"
                onClick={handleReset}
                aria-label="Kembalikan zoom ke 100%"
                title="Reset zoom"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer ml-0.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Bottom Bar / Order CTA (shrink-0 selalu terlihat utuh) */}
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E2E8F0] px-4 sm:px-6 py-3 bg-white z-20 shadow-[0_-8px_20px_-12px_rgba(15,23,42,0.08)]">
          <p className="hidden text-xs text-[#64748B] sm:block font-medium">
            Gunakan scroll mouse / tombol +/- untuk zoom, drag untuk geser
          </p>

          <div className="ml-auto flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right leading-tight">
              <div className="text-[11px] uppercase font-semibold text-[#64748B] tracking-wider">Harga Mulai</div>
              <div className="text-base sm:text-lg font-bold text-[#0F172A] tabular-nums">{product.priceLabel}</div>
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
