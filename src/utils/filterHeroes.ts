// src/utils/filterHeroes.ts
import { Hero } from '../types/Hero';

interface FilterOptions {
  role?: string;
  mainAttribute?: string;
  attackType?: string;
  difficulty?: number;
}

export const filterHeroes = (heroes: Hero[], options: FilterOptions): Hero[] => {
  return heroes.filter((hero) => {
    const matchRole = options.role ? hero.roles.includes(options.role as any) : true;
    const matchAttribute = options.mainAttribute ? hero.mainAttribute === options.mainAttribute : true;
    const matchAttack = options.attackType ? hero.attackType === options.attackType : true;
    const matchDifficulty = options.difficulty ? hero.difficulty === options.difficulty : true;

    return matchRole && matchAttribute && matchAttack && matchDifficulty;
  });
};
