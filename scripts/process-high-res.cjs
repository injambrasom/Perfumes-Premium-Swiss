const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const map = JSON.parse(fs.readFileSync('full_res_images_map.json', 'utf-8'));
const outDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processAll() {
  console.log(`Processing ${Object.keys(map).length} high-resolution images...`);
  let successCount = 0;

  for (const [filename, url] of Object.entries(map)) {
    const baseName = filename.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const tmpFile = `/tmp/raw_${filename}`;
    const webpFile = path.join(outDir, `${baseName}.webp`);
    const pngFile = path.join(outDir, `${baseName}.png`);

    try {
      // Download direct full-res file
      execSync(`curl -s -L --max-time 15 "${url}" -o "${tmpFile}"`);
      if (!fs.existsSync(tmpFile) || fs.statSync(tmpFile).size < 1000) {
        console.warn(`[WARN] Download failed or empty for ${filename}`);
        continue;
      }

      const inputBuffer = fs.readFileSync(tmpFile);
      const metadata = await sharp(inputBuffer).metadata();
      console.log(`[DOWNLOADED] ${filename} original size: ${metadata.width}x${metadata.height} (${(inputBuffer.length / 1024).toFixed(0)} KB)`);

      // 1. Generate high-quality WebP (quality: 90, max width 1000px, no blur)
      const webpBuffer = await sharp(inputBuffer)
        .resize({ width: 1000, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 90, effort: 4 })
        .toBuffer();
      fs.writeFileSync(webpFile, webpBuffer);

      // 2. Generate fallback PNG/JPG
      let fallbackBuffer;
      if (metadata.format === 'png' || metadata.hasAlpha) {
        fallbackBuffer = await sharp(inputBuffer)
          .resize({ width: 1000, height: 1200, fit: 'inside', withoutEnlargement: true })
          .png({ quality: 85, compressionLevel: 8 })
          .toBuffer();
        fs.writeFileSync(pngFile, fallbackBuffer);
      } else {
        const jpgFile = path.join(outDir, `${baseName}.jpg`);
        fallbackBuffer = await sharp(inputBuffer)
          .resize({ width: 1000, height: 1200, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 88, progressive: true })
          .toBuffer();
        fs.writeFileSync(jpgFile, fallbackBuffer);
      }

      console.log(`  -> Saved ${baseName}.webp (${(webpBuffer.length / 1024).toFixed(0)} KB) & fallback (${(fallbackBuffer.length / 1024).toFixed(0)} KB)`);
      successCount++;
    } catch (err) {
      console.error(`[ERROR] Processing ${filename}:`, err.message);
    } finally {
      if (fs.existsSync(tmpFile)) {
        try { fs.unlinkSync(tmpFile); } catch {}
      }
    }
  }

  console.log(`\nAll done! Successfully processed ${successCount} high-resolution products!`);
}

processAll();
