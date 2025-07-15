import { HeroRole } from "./Hero";

export interface HeroCard {
  id: number;
  name: string;
  image: string;
  difficulty: number;
  attackType: string;
  mainAttribute: "Strength" | "Agility" | "Intelligence";
  roles: HeroRole[];
  activeRole: HeroRole;
  points: number;
}
