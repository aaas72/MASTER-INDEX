"use client";

import React from 'react';

export const DashboardHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-[#C4C5D6] flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Instance:</span>
          <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/10">
            PROD_NODE_01
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Latency:</span>
          <span className="font-mono text-[10px] font-bold text-green-600 uppercase tracking-widest">
            12ms
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
        
        <div className="w-[1px] h-4 bg-slate-200"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-sans font-bold text-[11px] text-on-surface uppercase leading-none">System Operator</p>
            <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">Level_04_Auth</p>
          </div>
          <div className="w-8 h-8 bg-surface-container-low border border-[#C4C5D6] rounded-none flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
