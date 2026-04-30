"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodePanelProps {
  code: string;
  activeLine: number;
  language?: string;
}

export default function CodePanel({ code, activeLine, language = "javascript" }: CodePanelProps) {
  // Split code into lines and handle the "1: " prefix if present
  const lines = code.split("\n").map((line) => {
    const match = line.match(/^(\d+):\s*(.*)/);
    if (match) {
      return { number: parseInt(match[1]), content: match[2] };
    }
    return { number: null, content: line };
  });

  return (
    <div className="bg-[#0A1022] border border-[#002FA7]/30 shadow-2xl overflow-hidden flex flex-col h-full">
      <div className="px-4 py-2 border-b border-white/10 flex justify-between items-center bg-[#0D152B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#002FA7] rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono text-[#8FA8DF] uppercase tracking-[0.2em]">Source_Inspector // {language}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 border border-white/20 rounded-none"></div>
          <div className="w-2 h-2 border border-white/20 rounded-none"></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 custom-slim-scrollbar font-mono text-[11px] leading-relaxed relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#0D152B]/50 border-r border-white/5 flex flex-col items-center pt-4 pointer-events-none">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`h-[1.5em] flex items-center justify-center transition-colors ${line.number === activeLine ? 'text-white font-bold' : 'text-slate-600'}`}
            >
              {line.number || ""}
            </div>
          ))}
        </div>
        
        <div className="pl-8">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`h-[1.5em] px-2 relative transition-all duration-200 group ${line.number === activeLine ? 'bg-[#002FA7]/30 text-white' : 'text-[#DBE7FF]/70 hover:text-white hover:bg-white/5'}`}
            >
              {line.number === activeLine && (
                <motion.div 
                  layoutId="active-line-bg"
                  className="absolute inset-0 bg-[#002FA7] -z-10 border-l-2 border-white"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <pre className="m-0 overflow-visible">
                <code>{line.content}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-1.5 border-t border-white/5 bg-[#0D152B] flex justify-between items-center">
         <span className="text-[8px] text-slate-500 uppercase tracking-widest">Line: {activeLine > 0 ? activeLine : 'NULL'}</span>
         <span className="text-[8px] text-slate-500 uppercase tracking-widest">UTF-8 // LF</span>
      </div>
    </div>
  );
}
