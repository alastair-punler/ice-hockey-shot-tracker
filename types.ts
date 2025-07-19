
export type Team = 'home' | 'away';

export interface Shot {
  id: string;
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  team: Team;
  period: number;
}
