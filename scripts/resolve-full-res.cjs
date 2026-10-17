const fs = require('fs');
const { execSync } = require('child_process');

const gallery = JSON.parse(fs.readFileSync('gallery_cwzbmV4_map.json', 'utf-8'));
const helperContent = fs.readFileSync('src/utils/imageHelper.ts', 'utf-8');

const postMap = {};
const regex = /'([^']+)':\s*'([^']+)'/g;
let match;
while ((match = regex.exec(helperContent)) !== null) {
  if (match[1].endsWith('.png') || match[1].endsWith('.jpg')) {
    postMap[match[1]] = match[2];
  }
}

const fullResMap = { ...gallery };

// Fix SALVAGE directly
fullResMap['SALVAGE.png'] = 'https://i.postimg.cc/4Xnrmjmf/SALVAGE.png';
fullResMap['HARMANY-CODE.png'] = 'https://i.postimg.cc/9Vh5Jxn3/HARMANY-CODE.png';
fullResMap['BACCARAT.png'] = 'https://i.postimg.cc/J7mf0nkL/BACCARAT.png';

const missing = Object.keys(postMap).filter(k => !fullResMap[k]);
console.log(`Resolving ${missing.length} missing full-res URLs...`);

for (const key of missing) {
  const thumbUrl = postMap[key];
  const codeMatch = thumbUrl.match(/postimg\.cc\/([A-Za-z0-9_-]+)\//);
  if (codeMatch) {
    const code = codeMatch[1];
    try {
      const pageHtml = execSync(`curl -s -L "https://postimg.cc/${code}"`, { timeout: 10000 }).toString();
      const allUrls = pageHtml.match(/https:\/\/i\.postimg\.cc\/[A-Za-z0-9_-]+\/[^"'\s<>]+/g) || [];
      const cleanUrls = [...new Set(allUrls.map(u => u.replace(/&#039;.*$/, '').replace(/\[.*$/, '')))];
      const direct = cleanUrls.find(u => u !== thumbUrl && !u.includes(code)) || cleanUrls[0];
      if (direct) {
        fullResMap[key] = direct;
        console.log(`[RESOLVED] ${key} -> ${direct}`);
      } else {
        fullResMap[key] = thumbUrl;
        console.log(`[FALLBACK] ${key} -> ${thumbUrl}`);
      }
    } catch (e) {
      console.warn(`[ERROR] ${key}:`, e.message);
      fullResMap[key] = thumbUrl;
    }
  }
}

// Add the other products from products.ts
const productsContent = fs.readFileSync('src/data/products.ts', 'utf-8');
const pRegex = /"image":\s*"(https:\/\/i\.postimg\.cc\/[^"]+)"/g;
let pMatch;
while ((pMatch = pRegex.exec(productsContent)) !== null) {
  const url = pMatch[1];
  const filename = url.split('/').pop();
  if (filename && !fullResMap[filename]) {
    fullResMap[filename] = url;
    console.log(`[FROM PRODUCTS] ${filename} -> ${url}`);
  }
}

fs.writeFileSync('full_res_images_map.json', JSON.stringify(fullResMap, null, 2));
console.log(`Done! Total high-res mapped: ${Object.keys(fullResMap).length}`);
