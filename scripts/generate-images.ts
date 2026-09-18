import fs from 'fs';
import path from 'path';
import jpeg from 'jpeg-js';

// Ensure public directory exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function createRgbBuffer(width: number, height: number, drawFn: (x: number, y: number) => [number, number, number]): Buffer {
  const buffer = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b] = drawFn(x, y);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = 255;
    }
  }
  return buffer;
}

function saveJpeg(filename: string, width: number, height: number, drawFn: (x: number, y: number) => [number, number, number]) {
  const rawData = {
    data: createRgbBuffer(width, height, drawFn),
    width,
    height,
  };
  const jpegImageData = jpeg.encode(rawData, 90);
  const outPath = path.join(publicDir, filename);
  fs.writeFileSync(outPath, jpegImageData.data);
  console.log(`Generated ${filename} (${width}x${height})`);
}

// 1. profile.jpg (Hm Lutfhur Sadhi portrait theme)
// Warm outdoor background, green foliage accent, dark grey kurta, soft skin tone, white kufi
saveJpeg('profile.jpg', 600, 600, (x, y) => {
  const nx = x / 600;
  const ny = y / 600;
  const dx = nx - 0.5;
  const dy = ny - 0.45;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background: warm beige/stone wall with green garden foliage blur
  let r = 210 - ny * 35;
  let g = 195 - ny * 40;
  let b = 180 - ny * 45;

  if (nx < 0.28 && ny < 0.65) {
    // Green gate/foliage left
    r = Math.floor(r * 0.4 + 45);
    g = Math.floor(g * 0.6 + 95);
    b = Math.floor(b * 0.4 + 40);
  }

  // Kurta (lower body)
  if (ny > 0.55 && Math.abs(dx) < 0.45) {
    const kurtaR = 52 + Math.sin(x * 0.1) * 3;
    const kurtaG = 56 + Math.sin(x * 0.1) * 3;
    const kurtaB = 58 + Math.sin(x * 0.1) * 3;
    // Central button line
    if (Math.abs(dx) < 0.025) {
      return [90, 85, 75];
    }
    return [Math.floor(kurtaR), Math.floor(kurtaG), Math.floor(kurtaB)];
  }

  // Head/Beard silhouette
  // Beard: ny between 0.38 and 0.58, dx < 0.2
  if (ny >= 0.38 && ny <= 0.58 && Math.abs(dx) < 0.18 + (ny - 0.38) * 0.3) {
    return [30 + Math.random() * 8, 30 + Math.random() * 8, 32 + Math.random() * 8];
  }

  // Face: ny between 0.22 and 0.42, dx < 0.15
  if (ny >= 0.22 && ny <= 0.44 && Math.abs(dx) < 0.15) {
    // Mustache
    if (ny > 0.35 && ny < 0.39 && Math.abs(dx) < 0.09) {
      return [35, 35, 38];
    }
    // Eyes
    if (ny > 0.28 && ny < 0.31 && (Math.abs(dx - 0.055) < 0.02 || Math.abs(dx + 0.055) < 0.02)) {
      return [40, 35, 35];
    }
    // Skin tone
    return [195, 145, 115];
  }

  // Cap / Kufi: ny 0.12 to 0.24
  if (ny >= 0.12 && ny <= 0.24 && Math.abs(dx) < 0.16) {
    return [245, 246, 248];
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 2. graphic1.jpg - Bleu de Chanel Luxury Perfume
saveJpeg('graphic1.jpg', 600, 600, (x, y) => {
  const nx = x / 600;
  const ny = y / 600;
  // Deep elegant slate blue gradient
  const grad = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.4) ** 2);
  let r = Math.max(10, 30 - grad * 35);
  let g = Math.max(18, 48 - grad * 40);
  let b = Math.max(28, 70 - grad * 45);

  // Perfume bottle in center
  if (nx > 0.35 && nx < 0.65 && ny > 0.32 && ny < 0.72) {
    // Chanel glass bottle
    return [14, 25, 42];
  }
  // Cap
  if (nx > 0.44 && nx < 0.56 && ny > 0.24 && ny < 0.32) {
    return [10, 15, 25];
  }
  // Reflection on table
  if (ny > 0.73 && nx > 0.35 && nx < 0.65) {
    return [15, 30, 48];
  }

  // Smoke swirls (rings)
  const swirl = Math.sin(nx * 12 + ny * 8) * Math.cos(ny * 10);
  if (swirl > 0.6) {
    r += 30;
    g += 40;
    b += 55;
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 3. graphic2.jpg - Noise Buds N1 Pro (Dark/Chrome Green)
saveJpeg('graphic2.jpg', 600, 850, (x, y) => {
  const nx = x / 600;
  const ny = y / 850;
  // Dark tech aesthetic with green ambient lighting
  let r = 16 + ny * 15;
  let g = 24 + Math.sin(nx * Math.PI) * 25;
  let b = 20 + ny * 10;

  // Earbuds case in middle
  const cdx = nx - 0.6;
  const cdy = (ny - 0.45) * 1.3;
  if (cdx * cdx + cdy * cdy < 0.055) {
    // Metallic chrome green
    return [32, 75, 52];
  }
  // Earbud 1
  const b1dx = nx - 0.38;
  const b1dy = (ny - 0.62) * 1.5;
  if (b1dx * b1dx + b1dy * b1dy < 0.015) {
    return [38, 90, 60];
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 4. graphic3.jpg - Mint & Chocolate Ice Cream Special Flavour
saveJpeg('graphic3.jpg', 600, 800, (x, y) => {
  const nx = x / 600;
  const ny = y / 800;
  // Olive green top, cream beige bottom
  if (ny > 0.7) {
    return [235, 230, 210];
  }
  let r = 90 + ny * 30;
  let g = 105 + ny * 20;
  let b = 60 + ny * 10;

  // Ice cream cup center
  const cdx = nx - 0.5;
  const cdy = (ny - 0.55) * 1.2;
  if (cdx * cdx + cdy * cdy < 0.045) {
    // Mint swirl
    return [165, 210, 160];
  }
  // Whipped cream top
  const wdy = (ny - 0.44) * 1.2;
  if (cdx * cdx + wdy * wdy < 0.028) {
    return [250, 250, 240];
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 5. graphic4.jpg - Islamic Dawah Workshop (Blue banner mockup)
saveJpeg('graphic4.jpg', 800, 600, (x, y) => {
  const nx = x / 800;
  const ny = y / 600;
  // Studio backdrop
  if (ny > 0.65) {
    return [180 + Math.floor(ny * 30), 185 + Math.floor(ny * 30), 195 + Math.floor(ny * 30)];
  }
  // Angled desk display
  let r = 240;
  let g = 245;
  let b = 255;
  // Workshop banner center
  if (nx > 0.12 && nx < 0.88 && ny > 0.15 && ny < 0.65) {
    const bGrad = (nx + ny) * 0.5;
    r = 20 + bGrad * 20;
    g = 65 + bGrad * 50;
    b = 160 + bGrad * 70;
    // Central white banner curve
    if (ny > 0.3 && ny < 0.55 && nx > 0.25 && nx < 0.75) {
      return [255, 255, 255];
    }
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 6. graphic5.jpg - $10,000 AI YouTube Thumbnail
saveJpeg('graphic5.jpg', 800, 450, (x, y) => {
  const nx = x / 800;
  const ny = y / 450;
  // Dark navy grid backdrop
  const gridX = Math.floor(x / 30) % 2 === 0;
  const gridY = Math.floor(y / 30) % 2 === 0;
  let r = gridX || gridY ? 12 : 18;
  let g = gridX || gridY ? 22 : 30;
  let b = gridX || gridY ? 45 : 60;

  // Yellow $10,000 text at top
  if (ny > 0.1 && ny < 0.35 && nx > 0.2 && nx < 0.8) {
    // Golden gradient
    return [255, 210, 30];
  }

  // Host in middle burgundy shirt
  const hdx = nx - 0.5;
  const hdy = ny - 0.7;
  if (hdx * hdx + hdy * hdy < 0.08) {
    return [110, 20, 35]; // Burgundy shirt
  }

  // Host face
  const fdy = ny - 0.48;
  if (hdx * hdx + fdy * fdy < 0.02) {
    return [200, 150, 120];
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

// 7. graphic6.jpg - Bengali Quranic Typography Poster (Warm apricot road)
saveJpeg('graphic6.jpg', 600, 750, (x, y) => {
  const nx = x / 600;
  const ny = y / 750;
  // Warm peach / apricot gradient
  let r = 248 - ny * 35;
  let g = 215 - ny * 65;
  let b = 180 - ny * 90;

  // Road perspective at bottom
  if (ny > 0.72) {
    const roadWidth = (ny - 0.72) * 1.5;
    if (Math.abs(nx - 0.5) < roadWidth) {
      // Asphalt
      if (Math.abs(nx - 0.5) < 0.015 && Math.floor(y / 15) % 2 === 0) {
        return [250, 250, 250]; // road dashes
      }
      return [105, 100, 105];
    }
  }

  // Rising sun horizon
  const sunDx = nx - 0.5;
  const sunDy = ny - 0.7;
  if (sunDx * sunDx + sunDy * sunDy < 0.035) {
    return [255, 240, 210];
  }

  // Dark typography block in center
  if (ny > 0.18 && ny < 0.55 && nx > 0.32 && nx < 0.68) {
    // Navy typography strokes
    const wave = Math.sin(x * 0.2) + Math.cos(y * 0.15);
    if (wave > 0.3) {
      return [42, 54, 78];
    }
  }

  return [Math.min(255, Math.floor(r)), Math.min(255, Math.floor(g)), Math.min(255, Math.floor(b))];
});

console.log('All 7 images successfully generated in public/ folder!');
