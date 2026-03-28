import React from 'react';
import { PROJECTS, TEAM, ACTIVITIES } from '../constants';
import { Droplets, Wind, Zap, History, Edit, AlertTriangle, ArrowRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-7xl mx-auto space-y-12"
    >
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Project Oversight</h1>
          <p className="text-slate-500 max-w-xl">Engineering compliance ledger for current audit cycles and regulatory forensic analysis.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-soft border-l-4 border-secondary min-w-[180px]">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Active Audits</p>
            <p className="text-3xl font-bold">14</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-soft border-l-4 border-on-tertiary-container min-w-[180px]">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Compliance Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">98.4</p>
              <span className="text-xs text-on-tertiary-container font-bold">+2.1%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold tracking-tight">Active Projects</h3>
              <button className="text-secondary text-sm font-semibold hover:underline">View All Records</button>
            </div>
            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group p-4 bg-surface hover:bg-surface-container-low transition-all rounded-lg cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-surface-container-high rounded flex items-center justify-center">
                        {project.icon === 'Droplets' && <Droplets className="text-slate-600 w-5 h-5" />}
                        {project.icon === 'Wind' && <Wind className="text-slate-600 w-5 h-5" />}
                        {project.icon === 'Zap' && <Zap className="text-slate-600 w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{project.name}</h4>
                        <p className="text-xs text-slate-500 font-mono">ID: {project.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      project.status === 'In Progress' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' :
                      project.status === 'Awaiting Review' ? 'bg-tertiary-fixed text-on-tertiary-container' :
                      'bg-error-container text-on-error-container'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          project.status === 'Gap Detected' ? 'bg-red-500' : 
                          project.status === 'Awaiting Review' ? 'bg-on-tertiary-container' : 'bg-secondary'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-8">
            <div className="bg-surface-container-high rounded-xl p-6">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Latest Compliance Delta</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">Reference: ISO-9001:2015</p>
                  <p className="text-sm font-medium">Deviation found in Subsection 4.4 Quality Mgmt.</p>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">Reference: OSHA-3132</p>
                  <p className="text-sm font-medium">Ventilation protocols verified for AVC units.</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-container rounded-xl p-6 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">AI Audit Summary</h3>
                <p className="text-white text-lg font-light leading-relaxed mb-4">
                  "Project <span className="text-secondary-fixed font-semibold">AVC Vent Upgrades</span> shows 92% readiness. Missing signature on structural integrity report."
                </p>
                <button className="text-secondary-fixed text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  RESOLVE NOW <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 h-32 w-32 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-xl font-bold tracking-tight mb-6">Technical Team</h3>
            <div className="space-y-6">
              {TEAM.map((member) => (
                <div key={member.name} className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{member.role}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 bg-surface-container-low px-2 py-1 rounded">
                      {member.actionIcon === 'History' && <History className="w-3 h-3" />}
                      {member.actionIcon === 'Edit' && <Edit className="w-3 h-3" />}
                      {member.actionIcon === 'AlertTriangle' && <AlertTriangle className="w-3 h-3" />}
                      {member.lastAction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-outline-variant text-slate-500 text-sm font-semibold rounded-lg hover:bg-surface-container-low transition-colors">
              Manage Permissions
            </button>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-xl font-bold tracking-tight mb-6">Recent Activity</h3>
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant">
              {ACTIVITIES.map((activity, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute left-0 top-1 h-6 w-6 rounded-full bg-white border flex items-center justify-center z-10 ${
                    activity.status === 'success' ? 'border-on-tertiary-container' : 
                    activity.status === 'error' ? 'border-red-500' : 'border-yellow-500'
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${
                      activity.status === 'success' ? 'bg-on-tertiary-container' : 
                      activity.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mb-1">{activity.time}</p>
                  <p className={`text-sm ${activity.status === 'error' ? 'text-red-600 font-medium' : ''}`}>
                    {activity.message} {activity.project && <span className="font-semibold">{activity.project}</span>}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="technical-gradient h-14 w-14 rounded-full shadow-2xl flex items-center justify-center text-white active:scale-90 transition-transform hover:scale-105">
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
};
