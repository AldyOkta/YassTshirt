import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility helper standar shadcn & Tailwind untuk menggabungkan class conditionally
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
