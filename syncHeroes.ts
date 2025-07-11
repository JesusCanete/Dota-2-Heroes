import fs from "fs/promises";
import path from "path";

async function contarHeroes() {
  const jsonPath = path.join(process.cwd(), "src/data/heroes.json");
  const data = await fs.readFile(jsonPath, "utf-8");
  const heroes = JSON.parse(data);
  console.log(`El JSON tiene ${heroes.length} héroes.`);
}

contarHeroes().catch(console.error);
