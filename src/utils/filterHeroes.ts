import { Hero, HeroRole } from '../types/Hero';

interface FilterOptions {
  role?: string;
  mainAttribute?: string;
  attackType?: string;
  difficulty?: number;
}

export function filterHeroes(heroes: Hero[], filters: FilterOptions): Hero[] {
  return heroes.filter((hero) => {
    if (filters.role) {
      // Chequea si el héroe tiene ese rol
      if (!hero.roles.includes(filters.role as HeroRole)) return false;
    }

    if (filters.mainAttribute) {
      if (hero.mainAttribute.toLowerCase() !== filters.mainAttribute.toLowerCase()) return false;
    }

    if (filters.attackType) {
      if (hero.attackType.toLowerCase() !== filters.attackType.toLowerCase()) return false;
    }

    if (filters.difficulty !== undefined) {
      if (hero.difficulty !== filters.difficulty) return false;
    }

    return true;
  });
}
