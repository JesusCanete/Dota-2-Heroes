// src/types/Hero.ts

export type HeroAttribute = 'Strength' | 'Agility' | 'Intellect';
export type HeroAttackType = 'Melee' | 'Ranged';
export type HeroRole = 'Carry' | 'Support' | 'Nuker' | 'Disabler' | 'Jungler' | 'Durable' | 'Escape' | 'Pusher' | 'Initiator';

export interface Hero {
  id: number;
  name: string;
  image: string;
  roles: HeroRole[];
  difficulty: number; // 1 a 3
  attackType: HeroAttackType;
  mainAttribute: HeroAttribute;
}
