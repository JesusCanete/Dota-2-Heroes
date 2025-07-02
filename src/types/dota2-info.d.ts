// src/types/dota2-info.d.ts

declare module 'dota2-info' {
  interface HeroRaw {
    id: number;
    name: string;
    url: string;
    attack: string; // 'melee' | 'ranged'
    primaryAttribute: string; // 'fuerza' | 'agilidad' | etc.
    complexity: number;
    roles: {
      [role: string]: boolean;
    };
  }

  export function getHeroes(): HeroRaw[];
}
