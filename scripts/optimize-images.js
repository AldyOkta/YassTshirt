import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

const imageMap = [
  { src: 'detail-produk-reguler-Cuttingan,Size,Warna.png', dest: 'detail-reguler.webp' },
  { src: 'detail-produk-oversize.png', dest: 'detail-oversize.webp' },
  { src: 'sizechart-boxy.png', dest: 'sizechart-boxy.webp' },
  { src: 'pricelist-boxy-16S.png', dest: 'pricelist-boxy-16s.webp' },
  { src: 'pricelist-boxy-20S.png', dest: 'pricelist-boxy-20s.webp' },
  { src: 'pricelist-oversize-20S.png', dest: 'pricelist-oversize-20s.webp' },
  { src: 'pricelist-reguler-20S.png', dest: 'pricelist-reguler-20s.webp' },
  { src: 'pricelist-hoodie.png', dest: 'pricelist-hoodie.webp' },
  { src: 'Detail-Produk-POLO-Cutting, Size,Warna.png', dest: 'detail-polo.webp' },
  { src: 'brand-package.png', dest: 'brand-package.webp' },
  { src: 'contoh-DT-raster.png', dest: 'contoh-dtf-raster.webp' },
  { src: 'contoh-DTF-desain-vector.png', dest: 'contoh-dtf-vector.webp' },
  { src: 'sistem-order.png', dest: 'sistem-order.webp' },
  { src: 'LOGO-2.png', dest: 'logo-2.webp' },
  { src: 'YassTshirt-Logo.png', dest: 'yasstshirt-logo.webp' }
];

async function run() {
  console.log('--- Mulai Optimasi Gambar PNG ke WebP High-Quality ---');
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const item of imageMap) {
    const srcPath = path.join(publicDir, item.src);
    const destPath = path.join(publicDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.warn(`File tidak ditemukan: ${item.src}`);
      continue;
    }

    const origStats = fs.statSync(srcPath);
    totalOriginal += origStats.size;

    await sharp(srcPath)
      .webp({ quality: 86, effort: 6 })
      .toFile(destPath);

    const optStats = fs.statSync(destPath);
    totalOptimized += optStats.size;

    const savedPercent = ((1 - optStats.size / origStats.size) * 100).toFixed(1);
    console.log(`✓ ${item.dest.padEnd(25)} : ${(origStats.size / 1024).toFixed(0)} KB -> ${(optStats.size / 1024).toFixed(0)} KB (Hemat ${savedPercent}%)`);
  }

  const overallPercent = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log('---------------------------------------------------------');
  console.log(`TOTAL SEBELUM : ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`TOTAL SESUDAH : ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`TOTAL HEMAT   : ${overallPercent}%`);
}

run().catch((err) => {
  console.error('Error saat optimasi gambar:', err);
  process.exit(1);
});
