/**
 * Single Source of Truth untuk Konfigurasi Toko & Katalog Produk YassTshirt
 * Pemilik toko cukup mengedit file ini untuk mengubah nomor WA, harga, produk, dan info lainnya.
 */

export const SHOP_CONFIG = {
  name: 'YassTshirt',
  tagline: 'Custom Kaos Sablon DTF Satuan & Partai',
  // Ubah nomor WhatsApp di sini (format diawali dengan 62 atau 08)
  whatsapp: '6281234567890',
  instagram: 'yasstshirt_custom',
  instagramUrl: 'https://instagram.com/yasstshirt_custom',
  tiktok: 'yasstshirt.official',
  tiktokUrl: 'https://tiktok.com/@yasstshirt.official',
  location: 'Indonesia',
  operatingHours: 'Senin - Sabtu: 09.00 - 21.00 WIB',
  addressDescription: 'Siap kirim ke seluruh kota di Indonesia melalui JNE, J&T, SiCepat, dan Cargo untuk pesanan partai.'
};

export const FEATURES = [
  {
    id: 1,
    title: 'Full Color & Gradasi Bebas',
    description: 'Sablon DTF mampu mencetak jutaan warna, gradasi halus, hingga foto tanpa batasan jumlah warna screen.',
    icon: 'Palette',
    badge: 'Kualitas HD'
  },
  {
    id: 2,
    title: 'Bisa Pesan Satuan (No MOQ)',
    description: 'Tanpa minimum order. Mau bikin 1 kaos untuk hadiah, sampel brand, atau koleksi pribadi tetap kami layani sepenuh hati.',
    icon: 'Sparkles',
    badge: 'Fleksibel'
  },
  {
    id: 3,
    title: 'Detail Tajam & Presisi',
    description: 'Huruf kecil, raster halus, dan garis super tipis tetap tercetak presisi berkat resolusi cetak printer DTF modern.',
    icon: 'Focus',
    badge: 'Presisi Tinggi'
  },
  {
    id: 4,
    title: 'Tahan Cuci & Elastis',
    description: 'Menggunakan powder hotmelt premium dan tinta berkualitas. Sablon lentur mengikuti serat kain dan tidak mudah pecah.',
    icon: 'ShieldCheck',
    badge: 'Awet & Tahan Lama'
  }
];

export const ORDER_STEPS = [
  {
    step: '01',
    title: 'Konsultasi & Pilih Model',
    description: 'Pilih model kaos, warna, dan ukuran yang kamu inginkan lewat katalog atau langsung chat WhatsApp kami.',
    icon: 'MessageSquareText'
  },
  {
    step: '02',
    title: 'Kirim Desain / Request',
    description: 'Kirim file desain siap cetak (PNG transparan/PDF/CDR). Belum punya desain? Tim kami siap bantu buatkan konsep.',
    icon: 'UploadCloud'
  },
  {
    step: '03',
    title: 'Konfirmasi Mockup & Harga',
    description: 'Kami buatkan pratinjau (digital mockup) kaos terlebih dahulu agar kamu yakin sebelum proses sablon dimulai.',
    icon: 'CheckCircle2'
  },
  {
    step: '04',
    title: 'Produksi & Siap Kirim',
    description: 'Kaos dicetak dengan teliti, dipress panas, di-quality check, dipacking rapi, dan langsung dikirim ke alamatmu.',
    icon: 'Truck'
  }
];

export const PRODUCTS = [
  {
    id: 'dtf-combed-30s',
    name: 'Kaos DTF Satuan Combed 30s',
    category: 'satuan',
    badge: 'Paling Populer',
    price: 65000,
    priceLabel: 'Mulai Rp 65.000',
    description: 'Bahan Cotton Combed 30s adem dan lembut. Cocok untuk kaos santai harian dengan sablon ukuran A4/A3 bebas warna.',
    material: '100% Cotton Combed 30s Reaktif',
    printArea: 'Depan / Belakang (A4/A3)',
    turnaround: '1 - 2 Hari Kerja',
    image: '/sample-kaos-1.jpg'
  },
  {
    id: 'dtf-partai-combed-24s',
    name: 'Kaos Partai & Komunitas Combed 24s',
    category: 'partai',
    badge: 'Best Value Partai',
    price: 52000,
    priceLabel: 'Mulai Rp 52.000 / pcs',
    description: 'Bahan Cotton Combed 24s sedikit lebih tebal, kokoh, dan awet. Ideal untuk seragam angkatan, gathering kantor, & merchandise.',
    material: '100% Cotton Combed 24s Tebal & Kokoh',
    printArea: 'Bebas request titik sablon',
    turnaround: '3 - 5 Hari Kerja (tergantung qty)',
    image: '/sample-kaos-2.jpg'
  },
  {
    id: 'dtf-oversize-heavyweight',
    name: 'Kaos Streetwear Oversize DTF',
    category: 'satuan',
    badge: 'Streetwear Trend',
    price: 85000,
    priceLabel: 'Mulai Rp 85.000',
    description: 'Pola boxy oversize modern dengan rib leher tebal. Memberikan nuansa clothing brand streetwear lokal premium.',
    material: 'Cotton Heavyweight 20s / 16s',
    printArea: 'Sablon Full Back Jumbo A3+',
    turnaround: '2 - 3 Hari Kerja',
    image: '/sample-kaos-1.jpg'
  },
  {
    id: 'dtf-polo-shirt',
    name: 'Kaos Polo Kerah Sablon DTF',
    category: 'seragam',
    badge: 'Semi Formal',
    price: 78000,
    priceLabel: 'Mulai Rp 78.000',
    description: 'Bahan lacoste pique berkerah elegan. Cocok untuk seragam staf, kepanitiaan event formal, atau club motor/hobi.',
    material: 'Lacoste Pique CVC Premium',
    printArea: 'Logo Dada Kiri + Punggung',
    turnaround: '2 - 4 Hari Kerja',
    image: '/sample-kaos-2.jpg'
  },
  {
    id: 'dtf-hoodie-sweatshirt',
    name: 'Hoodie & Crewneck Custom DTF',
    category: 'outerwear',
    badge: 'Hangat & Tebal',
    price: 135000,
    priceLabel: 'Mulai Rp 135.000',
    description: 'Hoodie jumper fleece gramasi tebal dan lembut di dalam. Sablon DTF menempel sempurna tanpa khawatir luntur.',
    material: 'Cotton Fleece 280 - 300 gsm',
    printArea: 'Dada Tengah / Punggung Full',
    turnaround: '2 - 4 Hari Kerja',
    image: '/sample-kaos-1.jpg'
  },
  {
    id: 'dtf-print-lembaran',
    name: 'Print DTF Meteran / Lembaran',
    category: 'partai',
    badge: 'Khusus Vendor',
    price: 45000,
    priceLabel: 'Mulai Rp 45.000 / meter',
    description: 'Punya kaos sendiri di rumah? Cetak film DTF-nya saja di kami! Tinggal kamu press sendiri pakai setrika atau mesin heat press.',
    material: 'PET Film Premium + Tinta Dupont/DTF',
    printArea: 'Lebar 58cm x Panjang bebas',
    turnaround: 'Bisa Ditunggu / Same Day',
    image: '/sample-kaos-2.jpg'
  }
];

export const FAQS = [
  {
    question: 'Berapa minimal order di YassTshirt?',
    answer: 'Tidak ada minimal order! Kamu bisa pesan 1 kaos saja (satuan) untuk keperluan pribadi atau kado. Kami juga melayani pesanan partai puluhan hingga ratusan pcs dengan harga grosir yang jauh lebih hemat.'
  },
  {
    question: 'Format file desain apa yang paling bagus?',
    answer: 'Format terbaik adalah file PNG dengan latar belakang transparan beresolusi minimal 300 DPI, atau file vektor (PDF, Adobe Illustrator, CorelDraw). Belum punya format ini? Kirim saja gambar yang kamu punya ke admin, kami bantu cek.'
  },
  {
    question: 'Berapa lama proses pengerjaannya?',
    answer: 'Untuk pesanan satuan biasanya selesai dalam 1 - 2 hari kerja setelah desain disetujui. Untuk pesanan partai biasanya 3 - 7 hari kerja tergantung antrean dan kuantitas.'
  },
  {
    question: 'Apakah sablon DTF awet saat dicuci berkali-kali?',
    answer: 'Sangat awet! Sablon DTF kami menggunakan lem serbuk hotmelt elastis dan tinta berstandar tinggi. Tips perawatan: cuci dengan membalik kaos (gambar di dalam), hindari menyetrika langsung di atas permukaan sablon.'
  }
];
