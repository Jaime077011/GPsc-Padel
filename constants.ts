
import { Team, Match } from './types';

/*
  ===================================================================
  🏆 MANUAL DATABASE
  ===================================================================
  
  HOW TO UPDATE YOUR SITE:
  1. Edit the TEAMS list to change team names/players.
  2. Edit the MATCHES list to add games or update scores.
  3. Commit and push your code to GitHub to publish changes.
  
  -------------------------------------------------------------------
  TEAMS CONFIGURATION
  -------------------------------------------------------------------
*/

export const TEAMS: Team[] = [
  {
    id: 't1',
    name: 'The Smasher Bros',
    color: 'bg-blue-500',
    players: [
      { id: 'p1', name: 'Alex R.', role: 'Main' }, 
      { id: 'p2', name: 'Mike T.', role: 'Main' }
    ]
  },
  {
    id: 't2',
    name: 'Net Assets',
    color: 'bg-red-500',
    players: [
      { id: 'p3', name: 'Sarah L.', role: 'Main' }, 
      { id: 'p4', name: 'Jenny K.', role: 'Main' }
    ]
  },
  {
    id: 't3',
    name: 'Court Jesters',
    color: 'bg-green-500',
    players: [
      { id: 'p5', name: 'David B.', role: 'Main' }, 
      { id: 'p6', name: 'Tom H.', role: 'Main' }
    ]
  },
  {
    id: 't4',
    name: 'Top Spinners',
    color: 'bg-purple-500',
    players: [
      { id: 'p7', name: 'Emily W.', role: 'Main' }, 
      { id: 'p8', name: 'Chris M.', role: 'Main' }
    ]
  }
];

/*
  -------------------------------------------------------------------
  MATCH SCHEDULE & SCORES
  -------------------------------------------------------------------
  
  Status Options: 'SCHEDULED' | 'LIVE' | 'FINISHED'
  
  Example of a finished game:
  {
    id: 'm1',
    team1Id: 't1',
    team2Id: 't2',
    startTime: setTime('2024-11-01', '09:00'),
    court: 'Center Court',
    status: 'FINISHED',
    scores: [{ team1: 6, team2: 4 }, { team1: 6, team2: 2 }], // Team 1 won 6-4, 6-2
    winnerId: 't1',
    round: 'Group Stage'
  }
*/

// Helper to set dates (Year-Month-Day, Hour:Minute)
const setTime = (dateStr: string, timeStr: string) => {
  return new Date(`${dateStr}T${timeStr}:00`).toISOString();
};

export const MATCHES: Match[] = [
  {
    id: 'm1',
    team1Id: 't1',
    team2Id: 't2',
    startTime: setTime('2024-11-01', '09:00'),
    court: 'Center Court',
    status: 'FINISHED', 
    scores: [{ team1: 6, team2: 4 }, { team1: 6, team2: 2 }],
    winnerId: 't1',
    round: 'Group Stage'
  },
  {
    id: 'm2',
    team1Id: 't3',
    team2Id: 't4',
    startTime: setTime('2024-11-01', '10:00'),
    court: 'Court 2',
    status: 'LIVE', 
    scores: [{ team1: 4, team2: 6 }, { team1: 2, team2: 1 }], // Set 2 in progress
    round: 'Group Stage'
  },
  {
    id: 'm3',
    team1Id: 't1',
    team2Id: 't3',
    startTime: setTime('2024-11-02', '14:00'),
    court: 'Center Court',
    status: 'SCHEDULED',
    scores: [],
    round: 'Group Stage'
  }
];
