import path from "path";
import fs from "fs/promises";
import fetch from "node-fetch";

const IMG_PNG_PATH = path.join(process.cwd(), "public/images/heroes/png");

// Lista completa de nombres oficiales de héroes para descargar
const heroesNames = [
  "antimage",
  "axe",
  "bane",
  "bloodseeker",
  "crystal_maiden",
  "drow_ranger",
  "earthshaker",
  "juggernaut",
  "mirana",
  "morphling",
  "nevermore",
  "phantom_lancer",
  "puck",
  "pudge",
  "razor",
  "sand_king",
  "storm_spirit",
  "sven",
  "tiny",
  "vengefulspirit",
  "windrunner",
  "zuus",
  "kunkka",
  "lina",
  "lion",
  "shadow_shaman",
  "slardar",
  "tidehunter",
  "witch_doctor",
  "lich",
  "riki",
  "enigma",
  "tinker",
  "sniper",
  "necrolyte",
  "warlock",
  "beastmaster",
  "queenofpain",
  "venomancer",
  "faceless_void",
  "skeleton_king",
  "death_prophet",
  "phantom_assassin",
  "pugna",
  "templar_assassin",
  "viper",
  "luna",
  "dragon_knight",
  "dazzle",
  "rattletrap",
  "leshrac",
  "furion",
  "life_stealer",
  "dark_seer",
  "clinkz",
  "omniknight",
  "enchantress",
  "huskar",
  "night_stalker",
  "broodmother",
  "bounty_hunter",
  "weaver",
  "jakiro",
  "batrider",
  "chen",
  "spectre",
  "ancient_apparition",
  "doom_bringer",
  "ursa",
  "spirit_breaker",
  "gyrocopter",
  "alchemist",
  "invoker",
  "silencer",
  "obsidian_destroyer",
  "lycan",
  "brewmaster",
  "shadow_demon",
  "lone_druid",
  "chaos_knight",
  "meepo",
  "treant",
  "ogre_magi",
  "undying",
  "rubick",
  "disruptor",
  "nyx_assassin",
  "naga_siren",
  "keeper_of_the_light",
  "wisp",
  "visage",
  "slark",
  "medusa",
  "troll_warlord",
  "centaur",
  "magnataur",
  "shredder",
  "bristleback",
  "tusk",
  "skywrath_mage",
  "abaddon",
  "elder_titan",
  "legion_commander",
  "techies",
  "ember_spirit",
  "earth_spirit",
  "abyssal_underlord",
  "terrorblade",
  "phoenix",
  "oracle",
  "winter_wyvern",
  "arc_warden",
  "monkey_king",
  "dark_willow",
  "pangolier",
  "grimstroke",
  "hoodwink",
  "void_spirit",
  "snapfire",
  "mars",
  "ringmaster",
  "dawnbreaker",
  "marci",
  "primal_beast",
  "muerta",
  "kez"
];

async function downloadImage(url: string, destPath: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`⚠️ No se pudo descargar ${url}: Status ${res.status}`);
      return;
    }
    const buffer = await res.buffer();
    await fs.writeFile(destPath, buffer);
    console.log(`✅ Imagen guardada: ${destPath}`);
  } catch (err) {
    console.error(`❌ Error descargando ${url}`, err);
  }
}

(async () => {
  await fs.mkdir(IMG_PNG_PATH, { recursive: true });

  for (const heroName of heroesNames) {
    const url = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/icons/${heroName}.png`;
    const dest = path.join(IMG_PNG_PATH, `${heroName}.png`);
    await downloadImage(url, dest);
    await new Promise((r) => setTimeout(r, 300)); // espera 300ms para evitar bloqueos
  }

  console.log("✅ Descarga de todas las imágenes completada.");
})();
