import { useEffect, useState } from 'react';

/**
 * Hook animasi hitung angka naik (Viewport Count-Up) tanpa library eksternal
 * Memakai requestAnimationFrame dengan kurva easeOut halus
 * @param {number} target - Nilai target akhir
 * @param {number} duration - Durasi animasi dalam milidetik (default: 1200ms)
 * @param {boolean} start - Trigger mulai (biasanya dihubungkan dengan useScrollReveal)
 * @returns {number}
 */
export function useCountUp(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing formula: easeOutExpo untuk akselerasi cepat lalu mendarat halus
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}
