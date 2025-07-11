const fs = require('fs');
const https = require('https');
const path = require('path');

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

(async () => {
  const data = await fetchJSON('https://api.opendota.com/api/heroStats');
  const portraitDir = 'heroes_portrait_png';
  const fullDir = 'heroes_full_jpg';
  fs.mkdirSync(portraitDir, { recursive: true });
  fs.mkdirSync(fullDir, { recursive: true });

  for (const hero of data) {
    const name = hero.name.replace('npc_dota_hero_', '');
    const portraitURL = `https://api.opendota.com${hero.icon}`;
    const fullURL = `https://api.opendota.com${hero.img}`;

    console.log(`Descargando ${name}...`);

    await downloadImage(portraitURL, path.join(portraitDir, `${name}.png`));
    await downloadImage(fullURL, path.join(fullDir, `${name}.jpg`));
  }

  console.log('\n✅ Descarga completa. Puedes comprimir las carpetas:');
  console.log('  heroes_portrait_png.zip y heroes_full_jpg.zip');
})();
