import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { Waves, Droplet, Gauge, Filter, Play, CloudUpload, FileText, Code, Copy, Save, Send, Search, Sparkles, X, Wand2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export const SkillsCatalog: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [requirements, setRequirements] = useState(`Insulation Thickness Calculation
Compute required thermal insulation thickness to prevent condensation on cold piping surfaces according to ISO 12241.

- Input T_fluid: Operating fluid temperature (°C)
- Input RH: Relative humidity (%)
- Input T_amb: Ambient temperature (°C)
- Target: Surface temperature must be > Dew Point + 2K safety margin.

"Verify that the thermal conductivity coefficient 'lambda' is selected based on material type: Rockwool vs Cellular Glass."`);

  const [pythonCode, setPythonCode] = useState(`import math

def calculate_insulation_thickness(t_fluid, rh, t_amb):
    """
    Standard: ISO 12241 - Thermal insulation 
    for building equipment and industrial installations.
    """
    
    # 1. Calculate Dew Point Temperature (Magnus formula)
    a, b = 17.27, 237.7
    alpha = ((a * t_amb) / (b + t_amb)) + math.log(rh / 100.0)
    t_dew = (b * alpha) / (a - alpha)
    
    # 2. Safety Margin Application
    t_target = t_dew + 2.0 
    
    # 3. Iterative solver for thickness 's' ...
    lambda_val = 0.035 # Default Rockwool @ 20°C
    
    return {
        "min_thickness_mm": 45.2,
        "dew_point": round(t_dew, 2),
        "compliance_status": "VERIFIED"
    }`);

  const [isRefining, setIsRefining] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleRefineRequirements = async () => {
    if (!requirements.trim()) return;
    setIsRefining(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Format the following engineering requirements into a structured "Skill" format. 
      Use Markdown. Include sections like "Objective", "Inputs", "Standards", and "Constraints".
      
      Requirements:
      ${requirements}`
      });
      setRequirements(response.text);
    } catch (error) {
      console.error("Error refining requirements:", error);
    } finally {
      setIsRefining(false);
    }
  };

  const handleCorrectCode = async () => {
    if (!pythonCode.trim()) return;
    setIsCorrecting(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Review and correct the following Python engineering logic. 
      Ensure it follows best practices, is efficient, and matches the requirements.
      Return ONLY the corrected Python code, no explanation.
      
      Code:
      ${pythonCode}`
      });
      // Clean up markdown code blocks if present
      let text = response.text;
      text = text.replace(/```python\n?|```/g, '').trim();
      setPythonCode(text);
    } catch (error) {
      console.error("Error correcting code:", error);
    } finally {
      setIsCorrecting(false);
    }
  };

  const filteredSkills = SKILLS.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-7xl mx-auto space-y-12"
    >
      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20"
            >
              <div className="flex items-center px-6 py-4 border-b border-outline-variant/10">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, logic, or standards..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-slate-800 placeholder:text-slate-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">ESC</span>
                  <button onClick={() => setIsSearchOpen(false)}>
                    <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <button 
                      key={skill.id}
                      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left group"
                    >
                      <div className="p-2 bg-surface-container-low rounded-lg text-secondary group-hover:bg-white transition-colors">
                        {skill.icon === 'Waves' && <Waves className="w-4 h-4" />}
                        {skill.icon === 'Droplet' && <Droplet className="w-4 h-4" />}
                        {skill.icon === 'Gauge' && <Gauge className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-800">{skill.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400">{skill.file}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{skill.description}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 text-sm">No skills found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-3 bg-slate-50 border-t border-outline-variant/10 flex justify-between items-center">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <span className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600 font-bold">↑↓</span> Navigate
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                    <span className="px-1 py-0.5 bg-white border border-slate-200 rounded shadow-sm text-slate-600 font-bold">↵</span> Select
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Ledger Search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tighter mb-1">Skills Catalog</h2>
            <p className="text-sm text-slate-500 max-w-md">Verified engineering logic modules deployed within the RAG pipeline.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-md text-xs font-bold hover:bg-surface-container-low transition-colors"
            >
              <Search className="w-3 h-3" />
              Search Skills <span className="ml-2 text-slate-400 font-normal">⌘K</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 rounded-md text-xs font-bold hover:bg-surface-container-low transition-colors">
              <Filter className="w-3 h-3" />
              Sort by Recent
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILLS.map((skill) => (
            <div key={skill.id} className="bg-white p-6 rounded-xl group hover:shadow-2xl hover:shadow-primary-container/5 transition-all duration-300 flex flex-col justify-between min-h-[220px] border border-outline-variant/5">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="p-2 bg-surface-container-low rounded-lg text-secondary">
                    {skill.icon === 'Waves' && <Waves className="w-5 h-5" />}
                    {skill.icon === 'Droplet' && <Droplet className="w-5 h-5" />}
                    {skill.icon === 'Gauge' && <Gauge className="w-5 h-5" />}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold tracking-widest ${
                    skill.status === 'HIT' ? 'bg-tertiary-fixed text-on-tertiary-container' : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                  }`}>
                    {skill.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg tracking-tight mb-2">{skill.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{skill.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <code className="text-[10px] font-mono text-secondary">{skill.file}</code>
                <span className="text-[10px] font-medium text-slate-400">UPDATED: {skill.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tighter">Skills Lab</h2>
            <p className="text-sm text-slate-500 mt-1">Refine engineering requirements and generate compliant logic.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-md border border-outline-variant/40 text-sm font-bold hover:bg-surface-container-low transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Test Skill
            </button>
            <button className="px-6 py-2 rounded-md bg-primary-container text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
              <CloudUpload className="w-4 h-4" />
              Deploy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 bg-surface-container-low rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 h-[650px]">
          <div className="flex flex-col border-r border-outline-variant/10">
            <div className="h-12 flex items-center justify-between px-6 bg-white border-b border-outline-variant/5">
              <span className="text-[10px] font-bold tracking-widest text-secondary flex items-center gap-2">
                <FileText className="w-3 h-3" />
                REQUIREMENTS / MARKDOWN
              </span>
              <button 
                onClick={handleRefineRequirements}
                disabled={isRefining}
                className="flex items-center gap-1.5 text-[10px] font-bold text-secondary hover:text-primary transition-colors disabled:opacity-50"
              >
                <Sparkles className={`w-3 h-3 ${isRefining ? 'animate-pulse' : ''}`} />
                {isRefining ? 'REFINING...' : 'AI REFINE'}
              </button>
            </div>
            <div className="flex-1 bg-white relative">
              <textarea 
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 font-body text-sm leading-relaxed text-slate-800 resize-none border-none outline-none focus:ring-0"
                placeholder="Enter engineering requirements here..."
              />
            </div>
            <div className="p-4 bg-white border-t border-outline-variant/10">
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 outline-none pr-12"
                  placeholder="Refine with LLM: 'Add safety factor for coastal environments'..."
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-secondary hover:bg-secondary/10 rounded-md transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-[#0F172A]">
            <div className="h-12 flex items-center justify-between px-6 bg-[#1e293b] border-b border-white/5">
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                PYTHON LOGIC
              </span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleCorrectCode}
                  disabled={isCorrecting}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
                >
                  <Wand2 className={`w-3 h-3 ${isCorrecting ? 'animate-pulse' : ''}`} />
                  {isCorrecting ? 'CORRECTING...' : 'AI CORRECT'}
                </button>
                <button className="text-white/40 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea 
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                className="absolute inset-0 w-full h-full p-6 font-mono text-[13px] leading-relaxed text-slate-300 bg-transparent resize-none border-none outline-none focus:ring-0"
                spellCheck={false}
              />
            </div>
            <div className="h-16 flex items-center justify-between px-6 bg-[#1e293b]/50 border-t border-white/5">
              <span className="text-[10px] text-white/40 font-mono italic">
                {isCorrecting ? 'AI is analyzing code...' : 'Compiled successfully via RAG-Engine-V4'}
              </span>
              <button className="text-white/70 hover:text-white text-xs font-bold flex items-center gap-2">
                <Save className="w-3 h-3" />
                Save to Library
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
