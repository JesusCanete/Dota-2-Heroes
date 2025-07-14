// src/models/heroCard.ts
export type MainAttribute = "Strength" | "Agility" | "Intelligence";

export interface HeroCard {
  id: number;
  name: string;
  image: string;
  roles: string[];
  difficulty: number;
  attackType: string;
  mainAttribute: MainAttribute;

  activeRole: string;
  points: number;
}
