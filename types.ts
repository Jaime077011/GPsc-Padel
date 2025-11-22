
export interface Player {
  id: string;
  name: string;
  role?: string; // e.g., "Main", "Sub"
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  logo?: string;
  color: string;
}

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';

export interface SetScore {
  team1: number;
  team2: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  startTime: string; // ISO string
  court: string;
  status: MatchStatus;
  scores: SetScore[];
  winnerId?: string;
  round: string; // e.g., "Group Stage", "Quarter Final"
}

export type TabView = 'SCHEDULE' | 'STANDINGS';
