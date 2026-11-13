/**
 * WhatsApp Helper Utility
 * Menghasilkan tautan resmi WhatsApp https://wa.me/<nomor>?text=<pesan>
 * Mendukung format string nomor langsung (08xxx / 628xxx / +62xxx) maupun token array.
 */
import { SHOP_CONFIG } from '../data/config.js';

/**
 * Format nomor telepon agar valid untuk URL WhatsApp (wa.me)
 * Mengubah format lokal (08xxx) atau internasional (+62xxx) menjadi 628xxx tanpa simbol.
 * @param {string | number[] | null | undefined} rawPhone
 * @returns {string}
 */
export function formatPhoneNumber(rawPhone) {
  if (!rawPhone) {
    return '6281234567890';
  }

  // Jika berupa array token (kompatibilitas mundur)
  if (Array.isArray(rawPhone)) {
    const CIPHER_KEY = 42;
    try {
      const decoded = rawPhone.map((c) => String.fromCharCode(c ^ CIPHER_KEY)).join('');
      const digitsOnly = decoded.replace(/\D/g, '');
      if (digitsOnly.length >= 9) {
        if (digitsOnly.startsWith('0')) return '62' + digitsOnly.slice(1);
        if (digitsOnly.startsWith('62')) return digitsOnly;
        return '62' + digitsOnly;
      }
    } catch {
      // fallback jika gagal dekode
    }
    return '6281234567890';
  }

  // Jika berupa string nomor biasa
  if (typeof rawPhone === 'string') {
    let cleaned = rawPhone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    } else if (cleaned.startsWith('8')) {
      cleaned = '62' + cleaned;
    }
    return cleaned || '6281234567890';
  }

  return '6281234567890';
}

/**
 * Alias fungsi untuk kompatibilitas ke belakang
 */
export function decodePhoneToken(token) {
  return formatPhoneNumber(token);
}

/**
 * Mengambil nomor WhatsApp toko yang sudah diformat standar internasional
 * @param {string | number[]} [customPhone]
 * @returns {string}
 */
export function getStorePhoneNumber(customPhone = null) {
  return formatPhoneNumber(customPhone || SHOP_CONFIG.whatsapp || SHOP_CONFIG.whatsappToken);
}

/**
 * Menghasilkan tautan WhatsApp resmi lengkap
 * @param {string} text Pesan otomatis
 * @param {string} [customPhone] Nomor kustom opsional
 * @returns {string} Contoh: https://wa.me/6281234567890?text=Halo...
 */
export function getWhatsAppUrl(text = '', customPhone = null) {
  const phone = getStorePhoneNumber(customPhone);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}${encodedText ? `?text=${encodedText}` : ''}`;
}

/**
 * Membuka WhatsApp di tab baru saat diklik oleh user
 * @param {string} text Pesan otomatis
 * @param {string} [customPhone] Nomor kustom opsional
 */
export function openWhatsApp(text = '', customPhone = null) {
  const url = getWhatsAppUrl(text, customPhone);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Format pesan WhatsApp standar
 */
export const WA_MESSAGES = {
  general: 'Halo YassTshirt, saya mau tanya-tanya dan pesan kaos custom DTF.',
  consultation: 'Halo YassTshirt, saya punya ide desain kaos dan mau konsultasi gratis dulu.',
  productInquiry: (productName) => `Halo YassTshirt, saya tertarik pesan [${productName}]. Boleh tahu detail harga, ukuran, dan estimasi pengerjaannya?`,
  bulkOrder: 'Halo YassTshirt, saya mau pesan kaos DTF dalam jumlah banyak (partai/komunitas). Boleh minta info penawaran harga grosir?'
};
