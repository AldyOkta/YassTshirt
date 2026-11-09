/**
 * WhatsApp Helper Utility
 * Menghasilkan link wa.me yang aman dan terformat
 */

/**
 * Membersihkan format nomor telepon dan mengonversi format lokal (08xx) ke format internasional (628xx)
 * @param {string} phone 
 * @returns {string}
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '6281234567890';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Membuat URL wa.me dengan teks otomatis
 * @param {string} phone Nomor tujuan (misal: '6281234567890')
 * @param {string} text Pesan otomatis yang akan langsung terisi
 * @returns {string}
 */
export function createWhatsAppLink(phone, text = '') {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
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
