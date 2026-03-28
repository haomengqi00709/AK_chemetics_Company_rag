import React from 'react';
import { Building2, Gavel, Folder, File, ChevronRight, PlayCircle, Calendar, Search, Filter, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export const Library: React.FC = () => {
  const companyFiles = [
    { id: 'CF-001', name: 'Engineering Standard Operating Procedures', type: 'PDF', size: '2.4 MB', updated: '2 days ago' },
    { id: 'CF-002', name: 'Internal Compliance Guidelines v4.2', type: 'DOCX', size: '1.1 MB', updated: '1 week ago' },
    { id: 'CF-003', name: 'Project Alpha - Technical Specifications', type: 'PDF', size: '15.8 MB', updated: '3 hours ago' },
  ];

  const nationalRequirements = [
    { id: 'NR-101', name: 'ASME BPVC Section VIII Division 1', type: 'PDF', size: '45.2 MB', updated: 'Oct 2023' },
    { id: 'NR-102', name: 'ISO 15649:2001 - Petroleum and natural gas industries', type: 'PDF', size: '12.1 MB', updated: 'Jan 2024' },
    { id: 'NR-103', name: 'API 510 - Pressure Vessel Inspection Code', type: 'PDF', size: '8.4 MB', updated: 'Dec 2023' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col h-full bg-surface-container-low"
    >
      {/* Header / Search Area */}
      <header className="px-8 py-6 bg-white border-b border-outline-variant/10 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-2xl font-extrabold tracking-tight text-slate-900">Technical Library Index</h1>
          <p className="text-sm text-slate-500 mt-1">Centralized repository for corporate standards and regulatory requirements.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search library..." 
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <button className="p-2 border border-outline-variant/30 rounded-md hover:bg-surface-container-low transition-colors">
            <Filter className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 p-8 overflow-y-auto space-y-12">
          {/* Company Files Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-lg font-bold flex items-center gap-2 text-slate-800">
                <Building2 className="w-5 h-5 text-primary" />
                Company Files
              </h2>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {companyFiles.map((file) => (
                <div key={file.id} className="bg-white p-4 rounded-xl border border-outline-variant/10 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-fixed rounded-lg text-primary">
                      <Folder className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-primary transition-colors">{file.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{file.type}</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] text-slate-400">{file.size}</span>
                      </div>
                    </div>
                    <button className="p-1 text-slate-300 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-outline-variant/5 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400">ID: {file.id}</span>
                    <span className="text-[10px] text-slate-400">Updated {file.updated}</span>
                  </div>
                </div>
              ))}
              {/* Placeholder for "Add New" */}
              <div className="border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-primary/40 hover:text-primary transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-primary/10">
                  <span className="text-2xl font-light">+</span>
                </div>
                <span className="text-xs font-bold">Upload Company Standard</span>
              </div>
            </div>
          </section>

          {/* National Requirements Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-lg font-bold flex items-center gap-2 text-slate-800">
                <Gavel className="w-5 h-5 text-secondary" />
                National Requirements
              </h2>
              <button className="text-xs font-bold text-secondary hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {nationalRequirements.map((file) => (
                <div key={file.id} className="bg-white p-4 rounded-xl border border-outline-variant/10 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary-fixed rounded-lg text-secondary">
                      <File className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-secondary transition-colors">{file.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{file.type}</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] text-slate-400">{file.size}</span>
                      </div>
                    </div>
                    <button className="p-1 text-slate-300 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-outline-variant/5 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400">ID: {file.id}</span>
                    <span className="text-[10px] text-slate-400">Last Audit: {file.updated}</span>
                  </div>
                </div>
              ))}
              {/* Placeholder for "Add New" */}
              <div className="border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-secondary/40 hover:text-secondary transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-secondary/10">
                  <span className="text-2xl font-light">+</span>
                </div>
                <span className="text-xs font-bold">Add Regulatory Source</span>
              </div>
            </div>
          </section>
        </main>

        <aside className="w-80 bg-white p-8 flex flex-col gap-8 border-l border-outline-variant/10 z-10">
          <div>
            <h2 className="font-headline text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6">Library Health</h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 mb-1">Total Indexed Files</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold">1,248</span>
                  <span className="text-[10px] text-emerald-600 font-bold">+12 this week</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Compliance Coverage</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-bold">94.2%</span>
                  <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden ml-2">
                    <div className="h-full bg-primary w-[94%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Last System Sync</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">10:45 AM Today</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Sync Status</h4>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold">All sources synchronized</span>
            </div>
          </div>

          <div className="mt-auto">
            <button className="w-full bg-primary-container text-white py-4 rounded-lg font-manrope text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg shadow-primary/10">
              <PlayCircle className="w-5 h-5" />
              Re-Index All Sources
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">System node: S-7724-B <br/> Architecture: Vector RAG v2.1</p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};
