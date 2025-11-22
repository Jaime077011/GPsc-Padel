import React from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---------------------------------------------------------------- //

interface Player {
  id: string;
  name: string;
  role?: string;
}

interface Team {
  id: string;
  name: string;
  players: Player[];
  logo?: string;
  color: string;
}

type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';

interface SetScore {
  team1: number;
  team2: number;
}

interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  startTime: string;
  court: string;
  status: MatchStatus;
  scores: SetScore[];
  winnerId?: string;
  round: string;
}

type TabView = 'SCHEDULE' | 'STANDINGS';

// Declare global window variables
declare global {
  interface Window {
    TEAMS: Team[];
    MATCHES: Match[];
  }
}

// --- COMPONENTS ----------------------------------------------------------- //

// 1. NAVBAR
const Navbar = ({ currentTab, onTabChange }: { currentTab: TabView; onTabChange: (tab: TabView) => void }) => {
  const tabs = [
    { id: 'SCHEDULE' as TabView, label: 'Matches', icon: '📅' },
    { id: 'STANDINGS' as TabView, label: 'Standings', icon: '🏆' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-padel-accent rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden xs:block">
              Ragab<span className="text-padel-accent">Padel</span>
            </span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${currentTab === tab.id 
                    ? 'bg-slate-800 text-padel-accent shadow-sm ring-1 ring-slate-700' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// 2. MATCH CARD
const MatchCard = ({ match, team1, team2 }: { match: Match; team1: Team; team2: Team }) => {
  if (!team1 || !team2) return null;

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const t1Winner = match.winnerId === team1.id;
  const t2Winner = match.winnerId === team2.id;

  const StatusBadge = () => {
    switch (match.status) {
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
            {match.status}
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-padel-accent/50 transition-colors duration-300 group">
      <div className="bg-slate-800/80 px-4 py-2 flex justify-between items-center text-xs text-slate-400 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
            <span className="font-semibold text-padel-accent/80">{match.round}</span>
            <span>•</span>
            <span>{match.court}</span>
        </div>
        <div className="flex items-center gap-2">
            <span>{new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <StatusBadge />
        </div>
      </div>

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
      
      {isLive && (
        <div className="px-4 py-2 bg-slate-900/30 text-center">
            <p className="text-xs text-padel-accent animate-pulse">Current Set in Progress</p>
        </div>
      )}
    </div>
  );
};

// 3. SCHEDULE VIEW
const ScheduleView = ({ matches, teams }: { matches: Match[]; teams: Team[] }) => {
  const liveMatches = React.useMemo(() => matches.filter(m => m.status === 'LIVE'), [matches]);
  const scheduledMatches = React.useMemo(() => matches.filter(m => m.status === 'SCHEDULED'), [matches]);
  const finishedMatches = React.useMemo(() => matches.filter(m => m.status === 'FINISHED'), [matches]);

  const getTeam = (id: string) => teams.find(t => t.id === id) || teams[0];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
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

      <section>
        <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-padel-accent pl-3">
            Upcoming
        </h2>
        {scheduledMatches.length === 0 ? (
             <div className="bg-slate-800/30 rounded-lg p-8 text-center text-slate-400">
                No upcoming matches scheduled.
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

// 4. STANDINGS VIEW
const StandingsView = ({ teams, matches }: { teams: Team[]; matches: Match[] }) => {
  const standings = React.useMemo(() => {
    return teams.map(team => {
      const teamMatches = matches.filter(m => (m.team1Id === team.id || m.team2Id === team.id) && m.status === 'FINISHED');
      const wins = teamMatches.filter(m => m.winnerId === team.id).length;
      const losses = teamMatches.length - wins;
      const points = (wins * 3) + (losses * 1);

      return { ...team, played: teamMatches.length, wins, losses, points };
    }).sort((a, b) => b.points - a.points);
  }, [teams, matches]);

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

// --- APP & MOUNT ---------------------------------------------------------- //

const App = () => {
  const [currentTab, setCurrentTab] = React.useState<TabView>('SCHEDULE');
  
  // Read data from window object
  const teams = window.TEAMS || [];
  const matches = window.MATCHES || [];

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white pb-10">
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        {currentTab === 'SCHEDULE' && (
          <ScheduleView matches={matches} teams={teams} />
        )}
        {currentTab === 'STANDINGS' && (
          <StandingsView matches={matches} teams={teams} />
        )}
      </main>

      <footer className="border-t border-slate-800 mt-auto py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Ragab Padel Tournament.</p>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}