// src/data/heroes.ts
import { Hero } from '../types/Hero';

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Axe',
    image: '/heroes/axe.png',
    roles: ['Initiator', 'Durable', 'Disabler'],
    difficulty: 1,
    attackType: 'Melee',
    mainAttribute: 'Fuerza',
  },
  {
    id: 2,
    name: 'Drow Ranger',
    image: '/heroes/drow_ranger.png',
    roles: ['Carry', 'Disabler', 'Pusher'],
    difficulty: 2,
    attackType: 'Ranged',
    mainAttribute: 'Agilidad',
  },
  // Agrega más héroes...
];