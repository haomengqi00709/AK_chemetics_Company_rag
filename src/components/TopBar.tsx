import React from 'react';
import { Bell, History, Search } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/20 shadow-sm">
      <div className="flex justify-between items-center h-16 px-8">
        <div className="flex items-center gap-6">
          <h1 className="font-headline text-xl font-extrabold tracking-tight text-slate-900">{title}</h1>
          {subtitle && (
            <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-mono font-bold tracking-wider text-on-surface-variant">
              {subtitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
            <button className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all">Overview</button>
            <button className="text-slate-900 font-semibold border-b-2 border-slate-900 pb-1 text-sm">Compliance Logs</button>
            <button className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all">Verification</button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search technical chunks..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs w-64 focus:ring-1 focus:ring-secondary focus:bg-white transition-all outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              <Bell className="w-5 h-5 cursor-pointer hover:text-slate-900 transition-colors" />
              <History className="w-5 h-5 cursor-pointer hover:text-slate-900 transition-colors" />
              <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
