// src/pages/api/heroes/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { heroes } from '../../../data/heroes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(heroes);
}
