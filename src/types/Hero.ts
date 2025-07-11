export type HeroRole =
  | 'Carry'
  | 'Support'
  | 'Nuker'
  | 'Disabler'
  | 'Jungler'
  | 'Durable'
  | 'Escape'
  | 'Pusher'
  | 'Initiator';

export interface Hero {
  id: number;
  name: string;
  image: string;
  roles: HeroRole[];
  difficulty: number;
  attackType: string;
  mainAttribute: string;
}
