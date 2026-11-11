import { useEffect, useRef, useState } from 'react';

/**
 * Hook ringan untuk mendeteksi saat elemen masuk viewport menggunakan IntersectionObserver native
 * Tidak memakai library eksternal, hemat memori, dan hanya terpicu 1 kali
 * @param {Object} options
 * @param {number} options.threshold - Persentase elemen masuk layar (default: 0.15)
 * @param {string} options.rootMargin - Margin offset sebelum trigger (default: '0px 0px -30px 0px')
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -30px 0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback jika browser tidak mendukung IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Lepas observer setelah terpicu 1 kali
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
