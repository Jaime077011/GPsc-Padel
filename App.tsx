import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScheduleView from './components/ScheduleView';
import StandingsView from './components/StandingsView';
import { INITIAL_MATCHES, TEAMS } from './constants';
import { TabView } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabView>('SCHEDULE');
  
  // DATA SOURCE:
  // We strictly read from the 'constants.ts' file. 
  // There is no database. To update the site, edit the constants.ts file.
  const teams = TEAMS;
  const matches = INITIAL_MATCHES;

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
        <p className="text-xs mt-1 opacity-50">Updates managed via code configuration.</p>
      </footer>
    </div>
  );
};

export default App;