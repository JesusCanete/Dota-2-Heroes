// src/utils/deck.ts
import rawHeroes from "@/data/heroes.json";
import { HeroCard, MainAttribute } from "@/models/heroCard";

type RawHero = {
  id: number;
  name: string;
  image: string;
  roles: string[];
  difficulty: number;
  attackType: string;
  mainAttribute: string; // Viene como string genérico
};

const validAttributes: MainAttribute[] = ["Strength", "Agility", "Intelligence"];

function normalizeHero(raw: RawHero): Omit<HeroCard, "activeRole" | "points"> {
  if (!validAttributes.includes(raw.mainAttribute as MainAttribute)) {
    throw new Error(`Atributo principal inválido para héroe ${raw.name}: ${raw.mainAttribute}`);
  }
  return {
    id: raw.id,
    name: raw.name,
    image: raw.image,
    roles: raw.roles,
    difficulty: raw.difficulty,
    attackType: raw.attackType,
    mainAttribute: raw.mainAttribute as MainAttribute,
  };
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createInitialDeck(): HeroCard[] {
  const heroes: RawHero[] = rawHeroes;
  // Normalizamos primero todos los héroes
  const normalizedHeroes = heroes.map(normalizeHero);

  const difficulty1Heroes = normalizedHeroes.filter(h => h.difficulty === 1);

  const deck: HeroCard[] = [];

  for (let i = 0; i < 20; i++) {
    const hero = difficulty1Heroes[Math.floor(Math.random() * difficulty1Heroes.length)];

    const points = getRandomInt(1, 4);
    const activeRole = hero.roles[Math.floor(Math.random() * hero.roles.length)];

    deck.push({
      ...hero,
      activeRole,
      points,
    });
  }

  return deck;
}
