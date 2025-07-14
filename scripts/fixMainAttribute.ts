import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '../src/data/heroes.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

for (const hero of data) {
  if (hero.mainAttribute === "Intellect") {
    hero.mainAttribute = "Intelligence";
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("✅ Corrección completa: Intellect → Intelligence");
