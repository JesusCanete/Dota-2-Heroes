// src/models/heroCard.ts

export type HeroRole = "Carry" | "Support" | "Nuker" | "Disabler" | "Jungler" | "Durable" | "Escape" | "Pusher" | "Initiator";

export type MainAttribute = "Strength" | "Agility" | "Intelligence";

export type HeroCard = {
  id: number;
  name: string;
  image: string;
  roles: HeroRole[];  // importante: no string[]
  difficulty: number;
  attackType: string;
  mainAttribute: MainAttribute;
  activeRole: HeroRole;
  points: number;
};
