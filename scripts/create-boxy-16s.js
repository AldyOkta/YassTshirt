import sharp from 'sharp';

async function createBoxy16s() {
  const svgBadge = Buffer.from(`
    <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.25" flood-color="#0F172A" />
        </filter>
      </defs>
      <!-- Premium Heavyweight Badge Pill -->
      <g filter="url(#shadow)">
        <rect x="1060" y="260" width="370" height="80" rx="20" fill="#0F172A" stroke="#F59E0B" stroke-width="3" />
        <text x="1245" y="312" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="30" font-weight="900" fill="#F59E0B" text-anchor="middle" letter-spacing="2">HEAVYWEIGHT 16S</text>
      </g>
    </svg>
  `);

  // Modulate image to give it a darker, denser heavyweight charcoal look distinct from the 20s slate-blue
  await sharp('assets-raw/sizechart-boxy.png')
    .modulate({
      brightness: 0.88,
      saturation: 0.40
    })
    .composite([
      { input: svgBadge, top: 0, left: 0 }
    ])
    .webp({ quality: 86, effort: 6 })
    .toFile('public/detail-boxy-16s.webp');

  console.log('detail-boxy-16s.webp created successfully!');
}

createBoxy16s().catch(console.error);
