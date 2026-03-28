import React from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  Wrench, 
  Library as LibraryIcon, 
  Plus, 
  Settings, 
  HelpCircle,
  Shield,
  FileText
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'query', label: 'Query', icon: Terminal },
    { id: 'skills', label: 'Skills', icon: Terminal }, // Using Terminal for "Skills" as per screenshot icon style
    { id: 'library', label: 'Library', icon: LibraryIcon },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-slate-50 z-50">
      <div className="flex flex-col h-full py-6">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-8 bg-primary-container rounded flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold uppercase tracking-widest text-slate-900 leading-none">Compliance</h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-tighter">Precision v2.4</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as Page)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                currentPage === item.id
                  ? 'text-slate-900 font-bold border-r-2 border-slate-900 bg-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-headline text-sm font-medium tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-primary-container text-white py-3 rounded-md font-bold text-sm tracking-tight hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Analysis
          </button>
          
          <div className="pt-4 border-t border-slate-200/20">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors">
              <HelpCircle className="w-4 h-4" />
              Support
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors">
              <FileText className="w-4 h-4" />
              Documentation
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
