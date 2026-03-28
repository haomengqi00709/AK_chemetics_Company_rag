import React from 'react';
import { Paperclip, Terminal, History, Bolt, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const Query: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 p-8 flex-1 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-primary-container leading-tight">
            Welcome to TechLedger.
          </h2>
          <p className="font-body text-xl text-slate-500 max-w-2xl mx-auto font-light">
            How can I assist with your engineering compliance query today?
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-1 space-y-4 transition-all hover:shadow-lg">
          <div className="relative group">
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 p-8 font-body text-lg text-slate-900 placeholder:text-slate-300 resize-none outline-none" 
              placeholder="Ask a compliance question or use a /skill..." 
              rows={3}
            ></textarea>
            <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/20">
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-secondary hover:bg-surface-container-low rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-secondary hover:bg-surface-container-low rounded-lg transition-colors">
                  <Terminal className="w-5 h-5" />
                </button>
                <button className="p-2 text-slate-400 hover:text-secondary hover:bg-surface-container-low rounded-lg transition-colors">
                  <History className="w-5 h-5" />
                </button>
              </div>
              <button className="technical-gradient text-white px-6 py-2.5 rounded-md font-bold tracking-tight flex items-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]">
                <span>Execute Query</span>
                <Bolt className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
            <span className="font-headline text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Quick Search for Skills</span>
            <div className="h-[1px] flex-1 bg-outline-variant/30"></div>
          </div>
          <div className="max-w-xl mx-auto w-full relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            </div>
            <input 
              type="text" 
              className="w-full bg-white border border-outline-variant/30 rounded-full py-3 pl-12 pr-4 text-sm font-body focus:ring-2 focus:ring-secondary/20 focus:border-secondary/30 outline-none transition-all shadow-sm"
              placeholder="Search for engineering skills, standards, or logic..."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
