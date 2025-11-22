export interface Player {
  id: string;
  name: string;
  role?: string; // e.g., "Main", "Sub"
}

export interface Team {
  id: string;
  name: string;
  group: 'A' | 'B' | 'C' | 'D';
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
  startTime: string; // ISO string like '2023-10-25T14:30:00'
  court: string;
  status: MatchStatus;
  scores: SetScore[];
  winnerId?: string;
  round: string; // e.g., "Group A - Round 1"
}

export type TabView = 'SCHEDULE' | 'STANDINGS';
