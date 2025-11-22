import React from 'react';
import { TabView } from '../types';

interface NavbarProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabView; label: string; icon: string }[] = [
    { id: 'SCHEDULE', label: 'Matches', icon: '📅' },
    { id: 'STANDINGS', label: 'Standings', icon: '🏆' },
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
          
          <div className="flex items-center gap-2">
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

export default Navbar;