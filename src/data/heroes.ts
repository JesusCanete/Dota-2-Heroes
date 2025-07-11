// // src/data/heroes.ts

// import { getHeroes } from 'dota2-info';
// import { Hero } from '../types/Hero';

// const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// export const heroes: Hero[] = getHeroes().map(h => ({
//   id: h.id,
//   name: h.name,
//   image: h.url, // usa 'url' o construye una local si prefieres
//   roles: Object.keys(h.roles) as Hero['roles'],
//   difficulty: h.complexity,
//   attackType: capitalize(h.attack) as Hero['attackType'],
//   mainAttribute: capitalize(h.primaryAttribute) as Hero['mainAttribute'],
// }));



import heroes from './heroes.json';
export { heroes };
