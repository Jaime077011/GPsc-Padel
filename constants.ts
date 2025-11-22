import { Team, Match } from './types';

// ==========================================
// TOURNAMENT CONFIGURATION FILE
// ==========================================
// This file controls everything on your website.
// You do NOT need a database. Just edit this file.

// ==========================================
// 1. TEAMS LIST
// ==========================================
// Edit team names and player names here.
// Groups: A (5 teams), B (5 teams), C (5 teams), D (4 teams)

export const TEAMS: Team[] = [
  // --- GROUP A (5 Teams) ---
  {
    id: 'a1', name: 'Team A1', group: 'A', color: 'bg-blue-600',
    players: [{ id: 'p1', name: 'Player 1' }, { id: 'p2', name: 'Player 2' }, { id: 'p3', name: 'Sub' }]
  },
  {
    id: 'a2', name: 'Team A2', group: 'A', color: 'bg-blue-600',
    players: [{ id: 'p4', name: 'Player 1' }, { id: 'p5', name: 'Player 2' }, { id: 'p6', name: 'Sub' }]
  },
  {
    id: 'a3', name: 'Team A3', group: 'A', color: 'bg-blue-600',
    players: [{ id: 'p7', name: 'Player 1' }, { id: 'p8', name: 'Player 2' }, { id: 'p9', name: 'Sub' }]
  },
  {
    id: 'a4', name: 'Team A4', group: 'A', color: 'bg-blue-600',
    players: [{ id: 'p10', name: 'Player 1' }, { id: 'p11', name: 'Player 2' }, { id: 'p12', name: 'Sub' }]
  },
  {
    id: 'a5', name: 'Team A5', group: 'A', color: 'bg-blue-600',
    players: [{ id: 'p13', name: 'Player 1' }, { id: 'p14', name: 'Player 2' }, { id: 'p15', name: 'Sub' }]
  },

  // --- GROUP B (5 Teams) ---
  {
    id: 'b1', name: 'Team B1', group: 'B', color: 'bg-red-600',
    players: [{ id: 'p16', name: 'Player 1' }, { id: 'p17', name: 'Player 2' }, { id: 'p18', name: 'Sub' }]
  },
  {
    id: 'b2', name: 'Team B2', group: 'B', color: 'bg-red-600',
    players: [{ id: 'p19', name: 'Player 1' }, { id: 'p20', name: 'Player 2' }, { id: 'p21', name: 'Sub' }]
  },
  {
    id: 'b3', name: 'Team B3', group: 'B', color: 'bg-red-600',
    players: [{ id: 'p22', name: 'Player 1' }, { id: 'p23', name: 'Player 2' }, { id: 'p24', name: 'Sub' }]
  },
  {
    id: 'b4', name: 'Team B4', group: 'B', color: 'bg-red-600',
    players: [{ id: 'p25', name: 'Player 1' }, { id: 'p26', name: 'Player 2' }, { id: 'p27', name: 'Sub' }]
  },
  {
    id: 'b5', name: 'Team B5', group: 'B', color: 'bg-red-600',
    players: [{ id: 'p28', name: 'Player 1' }, { id: 'p29', name: 'Player 2' }, { id: 'p30', name: 'Sub' }]
  },

  // --- GROUP C (5 Teams) ---
  {
    id: 'c1', name: 'Team C1', group: 'C', color: 'bg-green-600',
    players: [{ id: 'p31', name: 'Player 1' }, { id: 'p32', name: 'Player 2' }, { id: 'p33', name: 'Sub' }]
  },
  {
    id: 'c2', name: 'Team C2', group: 'C', color: 'bg-green-600',
    players: [{ id: 'p34', name: 'Player 1' }, { id: 'p35', name: 'Player 2' }, { id: 'p36', name: 'Sub' }]
  },
  {
    id: 'c3', name: 'Team C3', group: 'C', color: 'bg-green-600',
    players: [{ id: 'p37', name: 'Player 1' }, { id: 'p38', name: 'Player 2' }, { id: 'p39', name: 'Sub' }]
  },
  {
    id: 'c4', name: 'Team C4', group: 'C', color: 'bg-green-600',
    players: [{ id: 'p40', name: 'Player 1' }, { id: 'p41', name: 'Player 2' }, { id: 'p42', name: 'Sub' }]
  },
  {
    id: 'c5', name: 'Team C5', group: 'C', color: 'bg-green-600',
    players: [{ id: 'p43', name: 'Player 1' }, { id: 'p44', name: 'Player 2' }, { id: 'p45', name: 'Sub' }]
  },

  // --- GROUP D (4 Teams) ---
  {
    id: 'd1', name: 'Team D1', group: 'D', color: 'bg-purple-600',
    players: [{ id: 'p46', name: 'Player 1' }, { id: 'p47', name: 'Player 2' }, { id: 'p48', name: 'Sub' }]
  },
  {
    id: 'd2', name: 'Team D2', group: 'D', color: 'bg-purple-600',
    players: [{ id: 'p49', name: 'Player 1' }, { id: 'p50', name: 'Player 2' }, { id: 'p51', name: 'Sub' }]
  },
  {
    id: 'd3', name: 'Team D3', group: 'D', color: 'bg-purple-600',
    players: [{ id: 'p52', name: 'Player 1' }, { id: 'p53', name: 'Player 2' }, { id: 'p54', name: 'Sub' }]
  },
  {
    id: 'd4', name: 'Team D4', group: 'D', color: 'bg-purple-600',
    players: [{ id: 'p55', name: 'Player 1' }, { id: 'p56', name: 'Player 2' }, { id: 'p57', name: 'Sub' }]
  },
];

// ==========================================
// 2. MATCH SCHEDULE
// ==========================================
/* 
   HOW TO EDIT MATCHES:
   
   1. TO CHANGE TIME:
      Edit 'startTime'. Format is 'YYYY-MM-DDTHH:MM:SS'.
      - Tue Nov 19 at 5pm: '2024-11-19T17:00:00'
      - Wed Nov 20 at 6pm: '2024-11-20T18:00:00'

   2. TO ENTER SCORES (After a match):
      Step A: Change status: 'SCHEDULED'  --->  'FINISHED'
      Step B: Add scores inside []. Example: scores: [{ team1: 6, team2: 4 }, { team1: 6, team2: 2 }]
      Step C: Add winnerId. Example: winnerId: 'a1' (This updates the Standings table!)
*/

export const INITIAL_MATCHES: Match[] = [
  // ---------------------------------------
  // TUESDAY MATCHES (Nov 19, 2024)
  // ---------------------------------------
  
  // 17:00 PM SLOT
  {
    id: 'm1', team1Id: 'a1', team2Id: 'a2',
    startTime: '2024-11-19T17:00:00', court: 'Center Court', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm2', team1Id: 'b1', team2Id: 'b2',
    startTime: '2024-11-19T17:00:00', court: 'Court 2', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm3', team1Id: 'c1', team2Id: 'c2',
    startTime: '2024-11-19T17:00:00', court: 'Court 3', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },

  // 18:00 PM SLOT
  {
    id: 'm4', team1Id: 'd1', team2Id: 'd2',
    startTime: '2024-11-19T18:00:00', court: 'Center Court', round: 'Group D',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm5', team1Id: 'a3', team2Id: 'a4',
    startTime: '2024-11-19T18:00:00', court: 'Court 2', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm6', team1Id: 'b3', team2Id: 'b4',
    startTime: '2024-11-19T18:00:00', court: 'Court 3', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },

  // 19:00 PM SLOT
  {
    id: 'm7', team1Id: 'c3', team2Id: 'c4',
    startTime: '2024-11-19T19:00:00', court: 'Center Court', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm8', team1Id: 'd3', team2Id: 'd4',
    startTime: '2024-11-19T19:00:00', court: 'Court 2', round: 'Group D',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm9', team1Id: 'a5', team2Id: 'a1',
    startTime: '2024-11-19T19:00:00', court: 'Court 3', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },

  // 20:00 PM SLOT
  {
    id: 'm10', team1Id: 'b5', team2Id: 'b1',
    startTime: '2024-11-19T20:00:00', court: 'Center Court', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm11', team1Id: 'c5', team2Id: 'c1',
    startTime: '2024-11-19T20:00:00', court: 'Court 2', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },

  // ---------------------------------------
  // WEDNESDAY MATCHES (Nov 20, 2024)
  // ---------------------------------------

  // 17:00 PM SLOT
  {
    id: 'm12', team1Id: 'a2', team2Id: 'a3',
    startTime: '2024-11-20T17:00:00', court: 'Center Court', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm13', team1Id: 'b2', team2Id: 'b3',
    startTime: '2024-11-20T17:00:00', court: 'Court 2', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm14', team1Id: 'c2', team2Id: 'c3',
    startTime: '2024-11-20T17:00:00', court: 'Court 3', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },

  // 18:00 PM SLOT
  {
    id: 'm15', team1Id: 'd1', team2Id: 'd3',
    startTime: '2024-11-20T18:00:00', court: 'Center Court', round: 'Group D',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm16', team1Id: 'a4', team2Id: 'a5',
    startTime: '2024-11-20T18:00:00', court: 'Court 2', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm17', team1Id: 'b4', team2Id: 'b5',
    startTime: '2024-11-20T18:00:00', court: 'Court 3', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },

  // 19:00 PM SLOT
  {
    id: 'm18', team1Id: 'c4', team2Id: 'c5',
    startTime: '2024-11-20T19:00:00', court: 'Center Court', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm19', team1Id: 'd2', team2Id: 'd4',
    startTime: '2024-11-20T19:00:00', court: 'Court 2', round: 'Group D',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm20', team1Id: 'a1', team2Id: 'a3',
    startTime: '2024-11-20T19:00:00', court: 'Court 3', round: 'Group A',
    status: 'SCHEDULED', scores: []
  },

  // 20:00 PM SLOT
  {
    id: 'm21', team1Id: 'b1', team2Id: 'b3',
    startTime: '2024-11-20T20:00:00', court: 'Center Court', round: 'Group B',
    status: 'SCHEDULED', scores: []
  },
  {
    id: 'm22', team1Id: 'c1', team2Id: 'c3',
    startTime: '2024-11-20T20:00:00', court: 'Court 2', round: 'Group C',
    status: 'SCHEDULED', scores: []
  },
];
