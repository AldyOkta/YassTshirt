/**
 * Single Source of Truth untuk Konfigurasi Toko & Katalog Produk YassTshirt
 * Pemilik toko cukup mengedit file ini untuk mengubah nomor WA, harga, produk, dan info lainnya.
 */

export const SHOP_CONFIG = {
  name: 'YassTshirt',
  tagline: 'Custom Kaos Sablon DTF Satuan & Partai',
  // Nomor WhatsApp resmi YassTshirt (Terproteksi Anti-Scraper)
  // Obfuscated XOR Token. Jika ingin ganti, bisa isi string nomor biasa atau array token.
  whatsappToken: [20, 24, 30, 23, 20, 22, 27, 21, 24, 26, 26, 22, 23],
  instagram: 'yasstshirts_',
  instagramUrl: 'https://www.instagram.com/yasstshirts_',
  tiktok: 'yasstshirtcustom',
  tiktokUrl: 'https://www.tiktok.com/@yasstshirtcustom',
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
    title: 'Chat di WhatsApp',
    description: 'Hubungi kami via WhatsApp untuk memulai pesanan atau konsultasi custom kaos.',
    icon: 'MessageCircle'
  },
  {
    step: '02',
    title: 'Kirim Mockup & Desain Mentahan',
    description: 'Kirimkan file desain kamu (baru setelah ini admin kami bisa memberikan estimasi harga pasti).',
    icon: 'UploadCloud'
  },
  {
    step: '03',
    title: 'Konsultasi Desain (Opsional)',
    description: 'Diskusikan ide, kombinasi warna, atau posisi titik sablon sebelum lanjut ke proses order.',
    icon: 'Lightbulb'
  },
  {
    step: '04',
    title: 'Isi Format Order',
    description: 'Lengkapi detail pesanan seperti jenis bahan/fitting, ukuran, warna kaos, dan kuantitas pcs.',
    icon: 'ClipboardList'
  },
  {
    step: '05',
    title: 'CS Mengirim Rincian Harga + Ongkir',
    description: 'Tim kami mengirimkan rincian total biaya pesanan secara lengkap, transparan, beserta ongkir.',
    icon: 'Receipt'
  },
  {
    step: '06',
    title: 'Pembayaran & Proses Produksi',
    description: 'Setelah pembayaran diterima, pesanan langsung diproses dalam 3 - 5 hari kerja (maksimal).',
    icon: 'CheckCircle2'
  }
];

export const FITTING_GUIDE = [
  {
    id: 'reguler',
    name: 'Reguler Fit',
    tagline: 'Straight Cut & Pas di Badan',
    description: 'Cutting lurus standar yang tidak terlalu longgar dan tidak ketat. Menggunakan model leher O-neck yang simpel, rapi, dan nyaman untuk berbagai aktivitas.',
    features: ['Cutting lurus pas di badan (O-Neck)', 'Panjang kaos pas di pinggang', 'Pilihan gramasi: 30s, 24s, 20s']
  },
  {
    id: 'oversize',
    name: 'Oversize Fit',
    tagline: 'Drop Shoulder & Rib 3 cm',
    description: 'Cuttingan oversize yang longgar namun tetap proporsional dengan bahu jatuh (drop shoulder) dan rib kerah leher tebal 3 cm ala streetwear modern.',
    features: ['Bahu turun (drop shoulder)', 'Rib kerah leher tebal 3 cm', 'Pilihan gramasi: 24s & 20s']
  },
  {
    id: 'boxy',
    name: 'Boxy Fit',
    tagline: 'Lebar Dada, Crop & Size S-XL',
    description: 'Siluet kotak streetwear: ekstra lebar di bagian dada dan badan namun panjang kaos pas di garis pinggang (tidak gombrang ke bawah).',
    features: ['Lebar dada ekstra lebar (boxy)', 'Panjang proporsional crop', 'Pilihan bahan 20s & 16s Heavyweight']
  }
];

export const PRODUCTS = [
  {
    id: 'dtf-reguler-combed',
    name: 'Kaos Reguler Fit DTF (20s / 24s / 30s)',
    category: 'satuan',
    fit: 'reguler',
    badge: 'Paling Populer',
    price: 80000,
    priceLabel: 'Mulai Rp 80.000',
    description: 'Pola standar lurus (straight cut) pas di badan, O-neck, dan nyaman untuk pemakaian harian. Pilihan bahan 100% cotton combed adem dan halus.',
    cut: 'Straight Cut (Pas di Badan, O-Neck)',
    material: '100% Cotton Combed 20s / 24s / 30s',
    printArea: 'Depan / Belakang (A5 s/d A2 Bebas Warna)',
    turnaround: '1 - 2 Hari Kerja',
    image: '/detail-reguler.webp'
  },
  {
    id: 'dtf-oversize-heavyweight',
    name: 'Kaos Oversize Fit DTF (Drop Shoulder)',
    category: 'satuan',
    fit: 'oversize',
    badge: 'Rib Kerah 3 cm',
    price: 92000,
    priceLabel: 'Mulai Rp 92.000',
    description: 'Cuttingan oversize longgar proporsional dengan bahu turun (drop shoulder) dan rib kerah leher tebal 3 cm. Tampil effortless ala clothing brand kekinian.',
    cut: 'Drop Shoulder (Rib Leher Tebal 3 cm)',
    material: '100% Cotton Combed 20s / 24s (170-210 gsm)',
    printArea: 'Depan / Belakang (A5 s/d A2 Bebas Warna)',
    turnaround: '1 - 2 Hari Kerja',
    image: '/detail-oversize.webp'
  },
  {
    id: 'dtf-boxy-20s',
    name: 'Kaos Boxy Fit DTF 20s',
    category: 'satuan',
    fit: 'boxy',
    badge: 'New Trend Boxy',
    price: 90000,
    priceLabel: 'Mulai Rp 90.000',
    description: 'Siluet kotak streetwear modern: lebar proporsional namun panjang pas di garis pinggang (tidak gombrang). Size chart lengkap S s/d XL.',
    cut: 'Boxy Cut (Crop Silhouette & Lebar Dada)',
    material: '100% Cotton Combed 20s (190-210 gsm)',
    printArea: 'Depan / Belakang (A5 s/d A2)',
    turnaround: '1 - 2 Hari Kerja',
    image: '/sizechart-boxy.webp'
  },
  {
    id: 'dtf-boxy-16s',
    name: 'Kaos Boxy Heavyweight 16s DTF',
    category: 'satuan',
    fit: 'boxy',
    badge: 'Heavyweight 16s',
    price: 105000,
    priceLabel: 'Mulai Rp 105.000',
    description: 'Bahan katun ekstra tebal 16s yang kokoh dengan potongan boxy crop silhouette. Memberikan bentuk jatuh tegas khas high-end streetwear brand.',
    cut: 'Boxy Heavyweight (Tebal, Kokoh & Kaku)',
    material: '100% Cotton Heavyweight 16s Super Premium',
    printArea: 'Depan / Belakang (A5 s/d A2)',
    turnaround: '2 - 3 Hari Kerja',
    image: '/pricelist-boxy-16s.webp'
  },
  {
    id: 'dtf-brand-package-30s',
    name: 'Brand Package DTF 30s (Bisa Satuan)',
    category: 'satuan',
    fit: 'package',
    badge: 'Include Custom Box',
    price: 85000,
    priceLabel: 'Mulai Rp 85.000',
    description: 'Paket komplit siap jual untuk brand clothing kamu! Sudah termasuk Kaos 30s + Sablon DTF + Tag Brand Leher + Ziplock + Custom Box Logo Brand + Stiker Cutting Vinyl + Thank You Card.',
    cut: 'Reguler Fit (Lengkap Packaging Kit)',
    material: '100% Cotton Combed 30s + Kit Kemasan',
    printArea: 'Sablon Kaos + Tag Leher + Sablon Box',
    turnaround: '2 - 3 Hari Kerja',
    image: '/brand-package.webp'
  },
  {
    id: 'dtf-polo-shirt',
    name: 'Kaos Polo Berkerah Combed 24s DTF',
    category: 'seragam',
    fit: 'other',
    badge: 'Semi Formal',
    price: 85000,
    priceLabel: 'Mulai Rp 85.000',
    description: 'Kaos polo berkerah dari 100% katun combed 24s alami yang halus, lembut, dan rapi. Pilihan tepat untuk seragam staf, kepanitiaan, atau komunitas.',
    cut: 'Polo Kerah Reguler Fit',
    material: '100% Cotton Combed 24s Premium',
    printArea: 'Logo Dada Kiri + Punggung',
    turnaround: '2 - 4 Hari Kerja',
    image: '/detail-polo.webp'
  },
  {
    id: 'dtf-hoodie-sweatshirt',
    name: 'Hoodie Fleece Custom DTF',
    category: 'outerwear',
    fit: 'other',
    badge: 'Tebal & Hangat',
    price: 133000,
    priceLabel: 'Mulai Rp 133.000',
    description: 'Hoodie jumper katun fleece tebal dan lembut dengan sablon DTF tahan cuci. Pilihan sablon 1 sisi (A6 s/d A3) maupun 2 sisi depan-belakang.',
    cut: 'Relaxed Comfort Fit',
    material: 'Cotton Fleece 280 - 300 gsm',
    printArea: '1 Sisi / 2 Sisi (A6 s/d A3)',
    turnaround: '2 - 4 Hari Kerja',
    image: '/pricelist-hoodie.webp'
  },
  {
    id: 'dtf-partai-combed-24s',
    name: 'Kaos Partai & Komunitas (Grosir DTF)',
    category: 'partai',
    fit: 'partai',
    badge: 'Best Value Partai',
    price: 52000,
    priceLabel: 'Mulai Rp 52.000 / pcs',
    description: 'Pemesanan jumlah banyak untuk seragam angkatan, gathering kantor, event, & merchandise brand. Bebas pilih pola Reguler, Oversize, atau Boxy dengan harga grosir.',
    cut: 'Bebas Pilih: Reguler, Oversize, atau Boxy',
    material: 'Cotton Combed 24s / 30s Tebal & Awet',
    printArea: 'Bebas request titik sablon (Depan/Belakang)',
    turnaround: '3 - 5 Hari Kerja (tergantung qty)',
    image: '/contoh-dtf-vector.webp'
  },
  {
    id: 'dtf-print-lembaran',
    name: 'Print DTF Meteran / Lembaran',
    category: 'partai',
    fit: 'other',
    badge: 'Khusus Vendor',
    price: 45000,
    priceLabel: 'Mulai Rp 45.000 / meter',
    description: 'Punya kaos sendiri di rumah? Cetak film DTF-nya saja di kami! Tinggal kamu press sendiri pakai setrika atau mesin heat press.',
    cut: 'PET Film Roll Lebar 58cm',
    material: 'PET Film Premium + Tinta Dupont/DTF',
    printArea: 'Lebar 58cm x Panjang bebas',
    turnaround: 'Bisa Ditunggu / Same Day',
    image: '/contoh-dtf-raster.webp'
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
