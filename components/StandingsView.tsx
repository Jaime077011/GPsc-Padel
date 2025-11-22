import React from 'react';
import { Team, Match } from '../types';

interface StandingsViewProps {
  teams: Team[];
  matches: Match[];
}

const StandingsView: React.FC<StandingsViewProps> = ({ teams, matches }) => {
  
  // Helper to calculate standings for a specific group of teams
  const calculateGroupStandings = (groupTeams: Team[]) => {
    return groupTeams.map(team => {
      const teamMatches = matches.filter(m => (m.team1Id === team.id || m.team2Id === team.id) && m.status === 'FINISHED');
      const wins = teamMatches.filter(m => m.winnerId === team.id).length;
      const losses = teamMatches.length - wins;
      
      // Points: 3 for Win, 1 for Loss (played but lost)
      const points = (wins * 3) + (losses * 1); 

      return {
        ...team,
        played: teamMatches.length,
        wins,
        losses,
        points
      };
    }).sort((a, b) => b.points - a.points); // Sort by points descending
  };

  const groups = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="animate-fade-in space-y-10 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Tournament Standings</h2>
        <p className="text-slate-400">Group Stage Leaderboards</p>
      </div>

      {groups.map(groupId => {
        // Filter teams belonging to this group
        const groupTeams = teams.filter(t => t.group === groupId);
        const standings = calculateGroupStandings(groupTeams);

        return (
          <div key={groupId} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
            <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="bg-padel-accent text-slate-900 w-8 h-8 rounded flex items-center justify-center text-sm">
                    {groupId}
                </span>
                Group {groupId}
              </h3>
              <span className="text-xs text-slate-500 font-mono">{groupTeams.length} Teams</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 text-[10px] uppercase tracking-wider">
                    <th className="p-3 font-semibold">Rank</th>
                    <th className="p-3 font-semibold">Team</th>
                    <th className="p-3 font-semibold text-center">P</th>
                    <th className="p-3 font-semibold text-center">W</th>
                    <th className="p-3 font-semibold text-center">L</th>
                    <th className="p-3 font-semibold text-right">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {standings.map((team, index) => (
                    <tr key={team.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-3 text-slate-500 font-mono text-sm">
                        {index + 1}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${team.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {team.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{team.name}</div>
                            <div className="text-[10px] text-slate-500 hidden sm:block">
                                {team.players.map(p => p.name).join(' / ')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center text-slate-300 text-sm">{team.played}</td>
                      <td className="p-3 text-center text-green-400 text-sm">{team.wins}</td>
                      <td className="p-3 text-center text-red-400 text-sm">{team.losses}</td>
                      <td className="p-3 text-right font-bold text-padel-accent text-base">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="text-padel-accent font-bold text-sm uppercase mb-1">Win</h3>
            <p className="text-white font-mono text-lg">3 Pts</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <h3 className="text-padel-accent font-bold text-sm uppercase mb-1">Loss</h3>
            <p className="text-white font-mono text-lg">1 Pt</p>
        </div>
      </div>
    </div>
  );
};

export default StandingsView;