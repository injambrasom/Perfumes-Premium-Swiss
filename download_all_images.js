import fs from 'fs';
import path from 'path';
import https from 'https';

const postImageLinks = [
  'https://i.postimg.cc/CBX4ML6h/1-MILLIOM-PRIVATE.png',
  'https://i.postimg.cc/ZB2LYKDZ/1-MILLION.png',
  'https://i.postimg.cc/ZvNxWt1z/212-sexy.png',
  'https://i.postimg.cc/wyZkxTbv/212-VIP-BLACK-I-LOVE-NYC.png',
  'https://i.postimg.cc/62gh651t/2i2-Mens-NYC.png',
  'https://i.postimg.cc/DJHcfyY2/2I2-VIP-ROSE.png',
  'https://i.postimg.cc/MMNYZKrp/2I2-VIPs-MENS.png',
  'https://i.postimg.cc/ZvNxWt1m/AL-NOBRE-WEEZAR.png',
  'https://i.postimg.cc/hQm1XWHg/AMBER-ROUGE.png',
  'https://i.postimg.cc/Cn8sRTWS/ANIMALS.png',
  'https://i.postimg.cc/JHX5sV91/AQUA-DE-DIO.png',
  'https://i.postimg.cc/n9mGXb6c/ASAD-BOURBON.jpg',
  'https://i.postimg.cc/p5jJmbgL/ASSAD.png',
  'https://i.postimg.cc/sGW4Mdtx/ATRACION-(COM-FEROMONIOS).png',
  'https://i.postimg.cc/MfBmn2hM/AZARO-WANTED.png',
  'https://i.postimg.cc/T5bJKMZg/BACCARAT.png',
  'https://i.postimg.cc/jnf4D0G7/BAREEQ.png',
  'https://i.postimg.cc/WqZwdLQM/BLEU-DE-CHANEL.png',
  'https://i.postimg.cc/64Zf8JDL/CLUB-DE-NUIT.png',
  'https://i.postimg.cc/XB5krSTK/CREED-AVENTUS.png',
  'https://i.postimg.cc/V0tWJQ3W/DELINNA.png',
  'https://i.postimg.cc/5jQ37LjG/ENGEL.png',
  'https://i.postimg.cc/t7n5SWY0/EUFHORIA.png',
  'https://i.postimg.cc/nM9kRBCb/FAKAR-ROSE.png',
  'https://i.postimg.cc/3W0BSmdh/FANTASY.png',
  'https://i.postimg.cc/grLDS8nG/FERRATI-BLACK.png',
  'https://i.postimg.cc/LhgTCLnH/FERRATI-SILVER.png',
  'https://i.postimg.cc/0rKfWDbb/GOLD-GIRL.png',
  'https://i.postimg.cc/RqJRsKNV/GOLD-GIRL-BLUSH.png',
  'https://i.postimg.cc/CdnNPkzf/HARMANY-CODE.png',
  'https://i.postimg.cc/VdyF3vCX/HUGO-BOOS-BOTTLED.png',
  'https://i.postimg.cc/ZCkL1nd8/HYPNOTIC-PORTION.png',
  'https://i.postimg.cc/gn9KfjZv/INITIO-OUD-FOR-GREATNESS.png',
  'https://i.postimg.cc/mtxS0kH8/INITIO-PSYCHEDELIC-LOVE.png',
  'https://i.postimg.cc/svpJyzYt/INVIKTUS.png',
  'https://i.postimg.cc/jLzhKTH9/INVIKTUS-VICTORY.png',
  'https://i.postimg.cc/w7hkHz59/JACK-DANIELS.png',
  'https://i.postimg.cc/0bpCxvGP/JADORE.png',
  'https://i.postimg.cc/Bj4BnzNs/LA-VIE-BELLE.png',
  'https://i.postimg.cc/LJ238Wv6/lady-woman.png',
  'https://i.postimg.cc/K1xD8WQz/LILI.png',
  'https://i.postimg.cc/bZp9w5LQ/MY-SELF.png',
  'https://i.postimg.cc/v4hLgvST/MY-WAY.png',
  'https://i.postimg.cc/3k1C4Zbd/OLIMPIA.png',
  'https://i.postimg.cc/18BcnKY8/POLO-BLUE.png',
  'https://i.postimg.cc/tsktZzmW/ROYAL-AMBER.png',
  'https://i.postimg.cc/QFmk9qng/SABAH-AL-WARD.png',
  'https://i.postimg.cc/TK0qLcHc/SABATINE.png',
  'https://i.postimg.cc/NKD79xPk/SALVAGE.png',
  'https://i.postimg.cc/TK0qLcHt/SCANDAL-FEMININO.png',
  'https://i.postimg.cc/cvhMgc5D/SI.png',
  'https://i.postimg.cc/RWdQ6Tbb/skandal-men.png',
  'https://i.postimg.cc/PCyzpMF9/SPIRIT-DUBAI-OUD.png',
  'https://i.postimg.cc/CZKCjfWJ/STRONGER-WITHOUT-YOU.png',
  'https://i.postimg.cc/v1m7W6ph/SULTAN.png',
  'https://i.postimg.cc/QBMgpWR4/TOM-FORD-TUSCAN-LEATHER.png',
  'https://i.postimg.cc/2q5d4BPK/YARA-ROSE.png',
  'https://i.postimg.cc/TyPjrWZs/YARA-TOUS.png',
  'https://i.postimg.cc/JG3Hhcpf/2i2-MEN-PARTY-FEVER.png',
  'https://i.postimg.cc/pmq9fVbY/ALLURE.png',
  'https://i.postimg.cc/DWN8NCzW/BLACK-OPIUM.png',
  'https://i.postimg.cc/2LQyVr7K/CHLOE.png',
  'https://i.postimg.cc/XpWXtBVb/COURUS.png',
  'https://i.postimg.cc/TK7wykgk/DOLCE-GABBANA-TRAD.png',
  'https://i.postimg.cc/R32ZdNs5/FAME.png',
  'https://i.postimg.cc/YLz2t8ts/IMAGINATION.png',
  'https://i.postimg.cc/bsLYM6CQ/LE-MALE-LE-PARFUM.png',
  'https://i.postimg.cc/jLvq98gy/LIGHT-BLUE1.png',
  'https://i.postimg.cc/CRQhMRVD/LINTERDITE.png',
  'https://i.postimg.cc/hzgP6HB3/Aliem-Swiss-(2).png',
  'https://i.postimg.cc/KR64GgW1/2I2-VIPs-WOMAN.png',
  'https://i.postimg.cc/t15gNvCw/COCO-MADAMME.jpg',
  'https://i.postimg.cc/rzzp5JXw/LIBRE.png'
];

const targetDirs = [
  path.join(process.cwd(), 'public', 'images'),
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'dist', 'images'),
  path.join(process.cwd(), 'dist')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Starting download of', postImageLinks.length, 'images...');
  const map = {};

  for (const url of postImageLinks) {
    const rawFileName = path.basename(url);
    const cleanFileName = rawFileName.replace(/\(%20\)/g, '').replace(/\(2\)/g, '2');
    map[rawFileName] = url;
    map[cleanFileName] = url;

    for (const dir of targetDirs) {
      const p1 = path.join(dir, rawFileName);
      const p2 = path.join(dir, cleanFileName);
      try {
        await downloadFile(url, p1);
        if (p1 !== p2) {
          fs.copyFileSync(p1, p2);
        }
      } catch (e) {
        console.error('Failed to download', url, 'to', p1, e.message);
      }
    }
    console.log('Downloaded:', rawFileName);
  }

  // Also write map to a file
  fs.writeFileSync('src/data/postImagesMap.json', JSON.stringify(map, null, 2));
  console.log('Successfully saved mapping to src/data/postImagesMap.json!');
}

run();
