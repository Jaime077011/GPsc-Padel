import React, { useMemo } from 'react';
import MatchCard from './MatchCard';
import { Match, Team } from '../types';

interface ScheduleViewProps {
  matches: Match[];
  teams: Team[];
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ matches, teams }) => {
  // Separate matches by status
  const liveMatches = useMemo(() => matches.filter(m => m.status === 'LIVE'), [matches]);
  const scheduledMatches = useMemo(() => matches.filter(m => m.status === 'SCHEDULED'), [matches]);
  const finishedMatches = useMemo(() => matches.filter(m => m.status === 'FINISHED'), [matches]);

  const getTeam = (id: string) => teams.find(t => t.id === id) || teams[0];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Live Matches Section */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Happening Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                team1={getTeam(match.team1Id)} 
                team2={getTeam(match.team2Id)} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-padel-accent pl-3">
            Upcoming
        </h2>
        {scheduledMatches.length === 0 ? (
             <div className="bg-slate-800/30 rounded-lg p-8 text-center text-slate-400">
                No upcoming matches scheduled at the moment.
             </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledMatches.map(match => (
                <MatchCard 
                key={match.id} 
                match={match} 
                team1={getTeam(match.team1Id)} 
                team2={getTeam(match.team2Id)} 
                />
            ))}
            </div>
        )}
      </section>

      {/* Finished Results */}
      {finishedMatches.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-400 mb-4 uppercase tracking-wider">Completed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-80 hover:opacity-100 transition-opacity">
            {finishedMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                team1={getTeam(match.team1Id)} 
                team2={getTeam(match.team2Id)} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ScheduleView;