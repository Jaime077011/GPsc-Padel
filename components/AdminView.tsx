
import React, { useState } from 'react';
import { Team, Match, MatchStatus, Player } from '../types';

interface AdminViewProps {
  teams: Team[];
  matches: Match[];
  setTeams: (teams: Team[]) => void;
  setMatches: (matches: Match[]) => void;
  onReset: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ teams, matches, setTeams, setMatches, onReset }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ---------------------------------------------------------
  // AUTHENTICATION
  // ---------------------------------------------------------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // SIMPLE PASSWORD PROTECTION
    if (password === 'admin@123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🏆 Admin Dashboard</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-padel-accent focus:ring-1 focus:ring-padel-accent"
                placeholder="Enter password..."
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-padel-accent text-slate-900 font-bold py-3 rounded-lg hover:bg-lime-400 transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // DATA HELPERS
  // ---------------------------------------------------------
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500'];
  
  // ---------------------------------------------------------
  // TEAM MANAGAMENT
  // ---------------------------------------------------------
  const handleAddTeam = () => {
    const newTeam: Team = {
      id: generateId(),
      name: 'New Team',
      color: colors[Math.floor(Math.random() * colors.length)],
      players: [
        { id: generateId(), name: 'Player 1', role: 'Main' }, 
        { id: generateId(), name: 'Player 2', role: 'Main' },
        { id: generateId(), name: 'Sub Player', role: 'Sub' }
      ]
    };
    setTeams([...teams, newTeam]);
  };

  const handleRemoveTeam = (id: string) => {
    if (window.confirm('Are you sure? This will remove the team from all schedules.')) {
      setTeams(teams.filter(t => t.id !== id));
    }
  };

  const handleTeamUpdate = (id: string, field: string, value: string, playerIndex?: number) => {
    const updatedTeams = teams.map(team => {
      if (team.id !== id) return team;
      
      if (playerIndex !== undefined) {
        const newPlayers = [...team.players];
        // Ensure player object exists if adding to an index that didn't exist before (safety check)
        if (!newPlayers[playerIndex]) {
             newPlayers[playerIndex] = { id: generateId(), name: value, role: playerIndex === 2 ? 'Sub' : 'Main' };
        } else {
             newPlayers[playerIndex] = { ...newPlayers[playerIndex], name: value };
        }
        return { ...team, players: newPlayers };
      } else {
        return { ...team, [field]: value };
      }
    });
    setTeams(updatedTeams);
  };

  // ---------------------------------------------------------
  // MATCH MANAGEMENT
  // ---------------------------------------------------------
  const handleAddMatch = () => {
    if (teams.length < 2) {
      alert("You need at least 2 teams to create a match.");
      return;
    }
    
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0); // Default to next hour

    const newMatch: Match = {
      id: generateId(),
      team1Id: teams[0].id,
      team2Id: teams[1].id,
      startTime: now.toISOString(),
      court: 'Center Court',
      status: 'SCHEDULED',
      scores: [],
      round: 'Group Stage'
    };
    setMatches([...matches, newMatch]);
  };

  const handleRemoveMatch = (id: string) => {
     if (window.confirm('Delete this match?')) {
        setMatches(matches.filter(m => m.id !== id));
     }
  };

  const handleMatchUpdate = (id: string, field: keyof Match, value: any) => {
    const updatedMatches = matches.map(match => {
      if (match.id !== id) return match;
      if (field === 'startTime') {
        return { ...match, startTime: new Date(value).toISOString() };
      }
      return { ...match, [field]: value };
    });
    setMatches(updatedMatches);
  };

  const handleScoreUpdate = (matchId: string, setIndex: number, teamIdx: 'team1' | 'team2', value: string) => {
    const numValue = parseInt(value) || 0;
    const updatedMatches = matches.map(match => {
      if (match.id !== matchId) return match;
      const newScores = [...match.scores];
      if (!newScores[setIndex]) newScores[setIndex] = { team1: 0, team2: 0 };
      newScores[setIndex] = { ...newScores[setIndex], [teamIdx]: numValue };
      return { ...match, scores: newScores };
    });
    setMatches(updatedMatches);
  };

  const adjustSets = (matchId: string, action: 'add' | 'remove') => {
      const updatedMatches = matches.map(match => {
          if (match.id !== matchId) return match;
          const newScores = [...match.scores];
          if (action === 'add') newScores.push({ team1: 0, team2: 0 });
          if (action === 'remove') newScores.pop();
          return { ...match, scores: newScores };
      });
      setMatches(updatedMatches);
  }

  const updateWinner = (matchId: string, winnerId: string) => {
    const updatedMatches = matches.map(m => m.id === matchId ? { ...m, winnerId: winnerId === 'none' ? undefined : winnerId } : m);
    setMatches(updatedMatches);
  }

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                ⚙️ Tournament Configuration
            </h2>
            <div className="flex gap-2">
                <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="px-3 py-2 text-xs bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
                >
                    Lock Admin
                </button>
                <button 
                    onClick={() => { if(window.confirm("Reset all data to defaults? This cannot be undone.")) onReset(); }}
                    className="px-3 py-2 text-xs bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500 hover:text-white transition-colors"
                >
                    Reset Data
                </button>
            </div>
        </div>
        
        {/* TEAMS EDITING */}
        <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-padel-accent">Participating Teams</h3>
                <button 
                    onClick={handleAddTeam}
                    className="flex items-center gap-1 bg-padel-accent text-slate-900 px-3 py-1.5 rounded-md text-sm font-bold hover:bg-lime-400 transition-colors"
                >
                    <span>+</span> Add Team
                </button>
            </div>
            
            <div className="grid gap-4">
                {teams.map(team => (
                    <div key={team.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 relative group">
                        <button 
                            onClick={() => handleRemoveTeam(team.id)}
                            className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove Team"
                        >
                            ❌
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                            <div>
                                <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Team Name</label>
                                <input 
                                    type="text" 
                                    value={team.name}
                                    onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:border-padel-accent focus:outline-none"
                                />
                            </div>
                            <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Player 1</label>
                                <input 
                                    type="text" 
                                    value={team.players[0]?.name || ''}
                                    onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value, 0)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-slate-300 focus:border-padel-accent focus:outline-none"
                                />
                            </div>
                            <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Player 2</label>
                                 <input 
                                    type="text" 
                                    value={team.players[1]?.name || ''}
                                    onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value, 1)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-slate-300 focus:border-padel-accent focus:outline-none"
                                />
                            </div>
                             <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1 text-padel-accent">Player 3 (Sub)</label>
                                 <input 
                                    type="text" 
                                    value={team.players[2]?.name || ''}
                                    onChange={(e) => handleTeamUpdate(team.id, 'name', e.target.value, 2)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-slate-300 focus:border-padel-accent focus:outline-none"
                                    placeholder="Substitute..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* MATCHES EDITING */}
        <div>
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold text-padel-accent">Match Schedule</h3>
                 <button 
                    onClick={handleAddMatch}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-blue-500 transition-colors"
                >
                    <span>+</span> Add Match
                </button>
             </div>

             <div className="space-y-6">
                 {matches.length === 0 && (
                     <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                         No matches scheduled yet. Click "Add Match" to begin.
                     </div>
                 )}
                 
                 {matches.map(match => (
                     <div key={match.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 relative group">
                         <button 
                            onClick={() => handleRemoveMatch(match.id)}
                            className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            title="Remove Match"
                        >
                            🗑️
                        </button>

                         {/* Match Header Details */}
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-b border-slate-700/50 pb-4">
                             <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Round</label>
                                 <input 
                                    type="text" 
                                    value={match.round} 
                                    onChange={(e) => handleMatchUpdate(match.id, 'round', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
                                 />
                             </div>
                             <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Time</label>
                                 <input 
                                    type="datetime-local" 
                                    value={new Date(match.startTime).toISOString().slice(0, 16)} 
                                    onChange={(e) => handleMatchUpdate(match.id, 'startTime', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
                                 />
                             </div>
                             <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Court</label>
                                 <input 
                                    type="text" 
                                    value={match.court} 
                                    onChange={(e) => handleMatchUpdate(match.id, 'court', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
                                 />
                             </div>
                             <div>
                                 <label className="text-[10px] uppercase text-slate-500 font-bold block mb-1">Status</label>
                                 <select 
                                    value={match.status}
                                    onChange={(e) => handleMatchUpdate(match.id, 'status', e.target.value as MatchStatus)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white"
                                 >
                                     <option value="SCHEDULED">SCHEDULED</option>
                                     <option value="LIVE">LIVE</option>
                                     <option value="FINISHED">FINISHED</option>
                                 </select>
                             </div>
                         </div>

                         {/* Teams Selection & Scoring */}
                         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                             {/* Team 1 Config */}
                             <div className="flex-1 w-full">
                                 <select 
                                    value={match.team1Id}
                                    onChange={(e) => handleMatchUpdate(match.id, 'team1Id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-2 text-sm font-bold text-white mb-2"
                                 >
                                     {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                 </select>
                                 <div className="flex gap-1 justify-center md:justify-start">
                                     {match.scores.map((score, idx) => (
                                         <input 
                                            key={idx}
                                            type="number" 
                                            value={score.team1}
                                            onChange={(e) => handleScoreUpdate(match.id, idx, 'team1', e.target.value)}
                                            className="w-10 text-center bg-slate-900 border border-slate-600 rounded text-sm py-1"
                                            placeholder="0"
                                         />
                                     ))}
                                 </div>
                             </div>

                             <div className="text-slate-500 font-bold">VS</div>

                             {/* Team 2 Config */}
                             <div className="flex-1 w-full text-right">
                                 <select 
                                    value={match.team2Id}
                                    onChange={(e) => handleMatchUpdate(match.id, 'team2Id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-2 text-sm font-bold text-white mb-2 text-right"
                                 >
                                     {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                 </select>
                                 <div className="flex gap-1 justify-center md:justify-end">
                                     {match.scores.map((score, idx) => (
                                         <input 
                                            key={idx}
                                            type="number" 
                                            value={score.team2}
                                            onChange={(e) => handleScoreUpdate(match.id, idx, 'team2', e.target.value)}
                                            className="w-10 text-center bg-slate-900 border border-slate-600 rounded text-sm py-1"
                                            placeholder="0"
                                         />
                                     ))}
                                 </div>
                             </div>
                         </div>
                         
                         {/* Score Actions */}
                         <div className="mt-4 flex items-center justify-between border-t border-slate-700/50 pt-2">
                             <div className="flex gap-2">
                                 <button onClick={() => adjustSets(match.id, 'add')} className="text-[10px] bg-slate-700 px-2 py-1 rounded text-white hover:bg-slate-600">+ Add Set</button>
                                 {match.scores.length > 0 && (
                                     <button onClick={() => adjustSets(match.id, 'remove')} className="text-[10px] bg-slate-700 px-2 py-1 rounded text-white hover:bg-red-900">- Remove Set</button>
                                 )}
                             </div>
                             <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Winner:</span>
                                <select 
                                    value={match.winnerId || 'none'}
                                    onChange={(e) => updateWinner(match.id, e.target.value)}
                                    className="bg-slate-800 border border-slate-600 rounded text-xs py-1 px-2 text-white"
                                >
                                    <option value="none">-- Select --</option>
                                    <option value={match.team1Id}>{teams.find(t => t.id === match.team1Id)?.name}</option>
                                    <option value={match.team2Id}>{teams.find(t => t.id === match.team2Id)?.name}</option>
                                </select>
                             </div>
                         </div>

                     </div>
                 ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
