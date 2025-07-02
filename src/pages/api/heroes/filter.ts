// src/pages/api/heroes/filter.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { heroes } from '../../../data/heroes';
import { filterHeroes } from '../../../utils/filterHeroes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { role, mainAttribute, attackType, difficulty } = req.query;

  const filtered = filterHeroes(heroes, {
    role: role as string,
    mainAttribute: mainAttribute as string,
    attackType: attackType as string,
    difficulty: difficulty ? parseInt(difficulty as string) : undefined,
  });

  res.status(200).json(filtered);
}
