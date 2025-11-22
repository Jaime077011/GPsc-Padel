
import { Team, Match } from './types';

/*
  ===================================================================
  🏆 RAGAB PADEL TOURNAMENT - DATA FILE
  ===================================================================
  
  HOW TO EDIT THIS FILE:
  This file acts as your database. When you change this code and deploy,
  the website updates.

  1. TEAMS:
     - Edit the list below to change team names or player names.
     - Keep 'id' unique (t1, t2, t3...).
  
  2. MATCHES:
     - To add a match, copy an existing block and paste it.
     - Ensure 'team1Id' and 'team2Id' match the IDs in the TEAMS list.
     - Status options: 'SCHEDULED', 'LIVE', 'FINISHED'.
     - Scores: [{ team1: 6, team2: 4 }] means Team 1 won the set 6-4.
  
  ===================================================================
*/

export const TEAMS: Team[] = [
  {
    id: 't1',
    name: 'The Smasher Bros',
    color: 'bg-blue-500',
    players: [
      { id: 'p1', name: 'Alex R.', role: 'Main' }, 
      { id: 'p2', name: 'Mike T.', role: 'Main' },
      { id: 'p1_sub', name: 'John D.', role: 'Sub' }
    ]
  },
  {
    id: 't2',
    name: 'Net Assets',
    color: 'bg-red-500',
    players: [
      { id: 'p3', name: 'Sarah L.', role: 'Main' }, 
      { id: 'p4', name: 'Jenny K.', role: 'Main' },
      { id: 'p2_sub', name: 'Lisa M.', role: 'Sub' }
    ]
  },
  {
    id: 't3',
    name: 'Court Jesters',
    color: 'bg-green-500',
    players: [
      { id: 'p5', name: 'David B.', role: 'Main' }, 
      { id: 'p6', name: 'Tom H.', role: 'Main' },
      { id: 'p3_sub', name: 'Sam W.', role: 'Sub' }
    ]
  },
  {
    id: 't4',
    name: 'Top Spinners',
    color: 'bg-purple-500',
    players: [
      { id: 'p7', name: 'Emily W.', role: 'Main' }, 
      { id: 'p8', name: 'Chris M.', role: 'Main' },
      { id: 'p4_sub', name: 'Anna K.', role: 'Sub' }
    ]
  },
  {
    id: 't5',
    name: 'Padel Pop',
    color: 'bg-yellow-500',
    players: [
      { id: 'p9', name: 'Oli P.', role: 'Main' }, 
      { id: 'p10', name: 'Harry S.', role: 'Main' },
      { id: 'p5_sub', name: 'George R.', role: 'Sub' }
    ]
  },
  {
    id: 't6',
    name: 'Volley Vipers',
    color: 'bg-pink-500',
    players: [
      { id: 'p11', name: 'Tina F.', role: 'Main' }, 
      { id: 'p12', name: 'Mark D.', role: 'Main' },
      { id: 'p6_sub', name: 'Emma S.', role: 'Sub' }
    ]
  }
];

// Helper to create dates easily. 
// Usage: setTime('2024-10-25', '14:00')
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
    round: 'Group Stage - A'
  },
  {
    id: 'm2',
    team1Id: 't3',
    team2Id: 't4',
    startTime: setTime('2024-11-01', '09:00'),
    court: 'Court 2',
    status: 'LIVE', 
    scores: [{ team1: 4, team2: 6 }, { team1: 2, team2: 1 }],
    round: 'Group Stage - B'
  },
  {
    id: 'm3',
    team1Id: 't5',
    team2Id: 't6',
    startTime: setTime('2024-11-01', '10:00'),
    court: 'Center Court',
    status: 'SCHEDULED',
    scores: [],
    round: 'Group Stage - A'
  },
  {
    id: 'm4',
    team1Id: 't1',
    team2Id: 't3',
    startTime: setTime('2024-11-01', '11:00'),
    court: 'Center Court',
    status: 'SCHEDULED',
    scores: [],
    round: 'Group Stage - A'
  },
  {
    id: 'm5',
    team1Id: 't2',
    team2Id: 't4',
    startTime: setTime('2024-11-01', '11:00'),
    court: 'Court 2',
    status: 'SCHEDULED',
    scores: [],
    round: 'Group Stage - B'
  },
  {
    id: 'm6',
    team1Id: 't5',
    team2Id: 't1',
    startTime: setTime('2024-11-02', '14:00'),
    court: 'Center Court',
    status: 'SCHEDULED',
    scores: [],
    round: 'Semi Final'
  }
];
