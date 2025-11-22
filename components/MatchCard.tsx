import React from 'react';
import { Match, Team, MatchStatus } from '../types';

interface MatchCardProps {
  match: Match;
  team1: Team;
  team2: Team;
}

const StatusBadge: React.FC<{ status: MatchStatus }> = ({ status }) => {
  switch (status) {
    case 'LIVE':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 animate-pulse border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
          LIVE
        </span>
      );
    case 'FINISHED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
          FT
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-padel-blue/30 text-blue-200 border border-blue-500/20">
          {status}
        </span>
      );
  }
};

const MatchCard: React.FC<MatchCardProps> = ({ match, team1, team2 }) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  
  // Calculate winner styling
  const t1Winner = match.winnerId === team1.id;
  const t2Winner = match.winnerId === team2.id;

  // Format date to show Day (e.g., Tue 17:00)
  const matchDate = new Date(match.startTime);
  const dateString = matchDate.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-padel-accent/50 transition-colors duration-300 group">
      {/* Header Info */}
      <div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center text-xs text-slate-400 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
            <span className="font-semibold text-padel-accent/80">{match.round}</span>
            <span>•</span>
            <span>{match.court}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="font-mono text-white">{dateString}</span>
            <StatusBadge status={match.status} />
        </div>
      </div>

      {/* Teams & Scores */}
      <div className="p-4">
        {/* Team 1 */}
        <div className={`flex justify-between items-center mb-3 ${t1Winner ? 'font-bold text-white' : 'text-slate-300'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${team1.color}`}>
                {team1.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
                <span className="text-base leading-tight">{team1.name}</span>
                <span className="text-xs text-slate-500 font-normal">{team1.players.map(p => p.name).join(' / ')}</span>
            </div>
          </div>
          { (isLive || isFinished) && (
             <div className="flex gap-2 text-lg font-mono">
                {match.scores.map((set, idx) => (
                    <span key={idx} className={`w-6 text-center ${set.team1 > set.team2 ? 'text-padel-accent' : 'text-slate-400'}`}>
                        {set.team1}
                    </span>
                ))}
             </div>
          )}
        </div>

        {/* Team 2 */}
        <div className={`flex justify-between items-center ${t2Winner ? 'font-bold text-white' : 'text-slate-300'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${team2.color}`}>
                {team2.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
                <span className="text-base leading-tight">{team2.name}</span>
                <span className="text-xs text-slate-500 font-normal">{team2.players.map(p => p.name).join(' / ')}</span>
            </div>
          </div>
          { (isLive || isFinished) && (
             <div className="flex gap-2 text-lg font-mono">
                {match.scores.map((set, idx) => (
                    <span key={idx} className={`w-6 text-center ${set.team2 > set.team1 ? 'text-padel-accent' : 'text-slate-400'}`}>
                        {set.team2}
                    </span>
                ))}
             </div>
          )}
        </div>
      </div>
      
      {/* Footer/CTA */}
      {isLive && (
        <div className="px-4 py-2 bg-slate-900/30 text-center">
            <p className="text-xs text-padel-accent animate-pulse">Current Set in Progress</p>
        </div>
      )}
    </div>
  );
};

export default MatchCard;