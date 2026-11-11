/**
 * WhatsApp Helper Utility dengan Proteksi Anti-Scraper (Obfuscation)
 * Mencegah bot scraper membaca nomor telepon atau domain pesan instan dari kode statis.
 */
import { SHOP_CONFIG } from '../data/products';

// XOR decryption key
const CIPHER_KEY = 42;

// Byte sequence untuk domain pesan instan terenkripsi XOR 42
const WA_DOMAIN_BYTES = [74, 86, 86, 82, 81, 16, 85, 85, 85, 75, 4, 79, 71, 85];

/**
 * Mendekode token nomor telepon yang terenkripsi
 * @param {number[] | string} token 
 * @returns {string}
 */
export function decodePhoneToken(token) {
  if (Array.isArray(token)) {
    return token.map((c) => String.fromCharCode(c ^ CIPHER_KEY)).join('');
  }
  if (typeof token === 'string') {
    const cleaned = token.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      return '62' + cleaned.slice(1);
    }
    return cleaned;
  }
  // Default fallback (terenkripsi)
  return [20, 24, 30, 23, 20, 22, 27, 21, 24, 26, 26, 22, 23]
    .map((c) => String.fromCharCode(c ^ CIPHER_KEY))
    .join('');
}

/**
 * Menghasilkan domain pesan instan secara dinamis di runtime memori
 * @returns {string}
 */
function getDecodedDomain() {
  return WA_DOMAIN_BYTES.map((c) => String.fromCharCode(c ^ CIPHER_KEY)).join('');
}

/**
 * Menghasilkan tautan WhatsApp lengkap hanya saat dibutuhkan di memori
 * @param {string} text Pesan otomatis
 * @param {number[] | string} [customToken] Token nomor kustom jika ada
 * @returns {string}
 */
export function getWhatsAppUrl(text = '', customToken = null) {
  const domain = getDecodedDomain();
  const phone = decodePhoneToken(customToken || SHOP_CONFIG.whatsappToken);
  const encodedText = encodeURIComponent(text);
  return `${domain}${phone}?text=${encodedText}`;
}

/**
 * Membuka WhatsApp di tab baru saat diklik oleh user nyata.
 * Tidak meninggalkan jejak atribut href di DOM HTML sebelum interaksi manusia.
 * @param {string} text Pesan otomatis
 */
export function openWhatsApp(text = '') {
  const url = getWhatsAppUrl(text);
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
