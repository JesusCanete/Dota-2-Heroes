import type { NextApiRequest, NextApiResponse } from 'next';
import { Hero, HeroRole } from '../../../types/Hero';
import { heroes as rawHeroes } from '../../../data/heroes';
import { filterHeroes } from '../../../utils/filterHeroes';

const validRoles: HeroRole[] = [
  'Carry',
  'Support',
  'Nuker',
  'Disabler',
  'Jungler',
  'Durable',
  'Escape',
  'Pusher',
  'Initiator',
];

function castRoles(roles: string[]): HeroRole[] {
  return roles.filter((role) => validRoles.includes(role as HeroRole)) as HeroRole[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role, mainAttribute, attackType, difficulty } = req.query;

  const heroes: Hero[] = rawHeroes.map((hero) => ({
    ...hero,
    roles: castRoles(hero.roles),
  }));

  const filtered = filterHeroes(heroes, {
    role: role as string,
    mainAttribute: mainAttribute as string,
    attackType: attackType as string,
    difficulty: difficulty ? parseInt(difficulty as string) : undefined,
  });

  res.status(200).json(filtered);
}
