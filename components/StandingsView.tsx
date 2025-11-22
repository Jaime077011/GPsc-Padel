import React from 'react';
import { Team, Match } from '../types';

interface StandingsViewProps {
  teams: Team[];
  matches: Match[];
}

const StandingsView: React.FC<StandingsViewProps> = ({ teams, matches }) => {
  // Simple logic to calculate mock standings
  const standings = teams.map(team => {
    const teamMatches = matches.filter(m => (m.team1Id === team.id || m.team2Id === team.id) && m.status === 'FINISHED');
    const wins = teamMatches.filter(m => m.winnerId === team.id).length;
    const losses = teamMatches.length - wins;
    
    // Simple point system: 3 pts for win, 1 pt for played
    const points = (wins * 3) + (losses * 1); // Simplified logic

    return {
      ...team,
      played: teamMatches.length,
      wins,
      losses,
      points
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="animate-fade-in">
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🏆</span> Tournament Standings
            </h2>
            <p className="text-slate-400 mt-1">Group Stage Leaderboard</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Team</th>
                <th className="p-4 font-semibold text-center">P</th>
                <th className="p-4 font-semibold text-center">W</th>
                <th className="p-4 font-semibold text-center">L</th>
                <th className="p-4 font-semibold text-right">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {standings.map((team, index) => (
                <tr key={team.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 text-slate-500 font-mono">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${team.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {team.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white">{team.name}</div>
                        <div className="text-xs text-slate-500">{team.players.map(p => p.name).join(' & ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center text-slate-300">{team.played}</td>
                  <td className="p-4 text-center text-green-400">{team.wins}</td>
                  <td className="p-4 text-center text-red-400">{team.losses}</td>
                  <td className="p-4 text-right font-bold text-padel-accent text-lg">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="text-padel-accent font-bold text-sm uppercase mb-2">Points Rule</h3>
            <p className="text-slate-400 text-xs">Win = 3 Points</p>
            <p className="text-slate-400 text-xs">Loss = 1 Point</p>
        </div>
         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="text-padel-accent font-bold text-sm uppercase mb-2">Tie Break</h3>
            <p className="text-slate-400 text-xs">1. Head-to-Head</p>
            <p className="text-slate-400 text-xs">2. Set Difference</p>
        </div>
         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="text-padel-accent font-bold text-sm uppercase mb-2">Format</h3>
            <p className="text-slate-400 text-xs">Golden Point Rule Active</p>
            <p className="text-slate-400 text-xs">Best of 3 Sets</p>
        </div>
      </div>
    </div>
  );
};

export default StandingsView;