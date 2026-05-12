"use client";

import React from 'react';

const logs = [
  { time: '22:13:06', event: 'SYSTEM_READY', status: 'OK' },
  { time: '22:11:42', event: 'ALGO_PUSH_QUICK_SORT', status: 'SUCCESS' },
  { time: '22:08:15', event: 'SIMULATION_ENGINE_TEST', status: 'WARN' },
  { time: '21:45:30', event: 'DB_SYNC_MASTER', status: 'OK' },
  { time: '21:30:12', event: 'LOCALE_UPDATE_AR', status: 'PENDING' },
  { time: '20:15:00', event: 'SERVER_BOOTSTRAP', status: 'OK' },
];

export const ActivityLog = () => {
  return (
    <div className="bg-[#0A1022] border border-[#C4C5D6]/20 p-6 rounded-none h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <h3 className="font-mono text-xs font-bold text-[#DBE7FF] uppercase tracking-[0.3em]">
            System_Activity_Log
          </h3>
        </div>
        <span className="font-mono text-[9px] text-[#8FA8DF] uppercase tracking-widest">
          v2.4.0_Stable
        </span>
      </div>
      
      <div className="space-y-3 font-mono text-[11px] leading-relaxed overflow-y-auto max-h-[300px] custom-slim-scrollbar pr-4">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 border-l border-white/5 pl-4 hover:bg-white/5 transition-colors py-1">
            <span className="text-slate-500 min-w-[70px]">[{log.time}]</span>
            <span className="text-[#DBE7FF] font-bold">{log.event}</span>
            <span className={`ml-auto ${
              log.status === 'OK' ? 'text-green-400' : 
              log.status === 'WARN' ? 'text-yellow-400' : 
              log.status === 'PENDING' ? 'text-blue-400' : 'text-red-400'
            }`}>
              ::{log.status}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-primary/60 animate-pulse">
          <span className="text-[10px] font-mono">_CURSOR_WAITING...</span>
        </div>
      </div>
    </div>
  );
};
