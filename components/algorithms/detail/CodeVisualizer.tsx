"use client";

import React from "react";

interface CodeVisualizerProps {
  code: string;
  activeLine?: number;
}

export default function CodeVisualizer({ code, activeLine }: CodeVisualizerProps) {
  // Split code into lines and handle potential numbering in the string itself
  const lines = code.split("\n");

  return (
    <div className="border border-outline-variant/20 bg-slate-950 overflow-hidden font-mono text-sm shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-outline-variant/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Logic_Processor.v1</span>
      </div>
      
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse !bg-transparent">
          <tbody>
            {lines.map((line, idx) => {
              // Extract line number if it's explicitly written as "1: ..."
              const match = line.match(/^(\d+):(.*)/);
              const lineNum = match ? parseInt(match[1]) : idx + 1;
              const content = match ? match[2] : line;
              const isActive = activeLine === lineNum;

              return (
                <tr 
                  key={idx} 
                  className={`transition-colors duration-200 ${isActive ? 'bg-primary/20' : 'bg-transparent'}`}
                >
                  <td className={`w-10 pr-4 text-right select-none font-mono text-xs bg-transparent ${isActive ? 'text-primary font-bold' : 'text-slate-600'}`}>
                    {lineNum}
                  </td>
                  <td className={`relative whitespace-pre font-mono text-xs bg-transparent ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {isActive && (
                      <div className="absolute left-[-1rem] top-0 bottom-0 w-1 bg-primary"></div>
                    )}
                    {content}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {activeLine !== undefined && activeLine > 0 && (
        <div className="px-4 py-2 bg-primary/10 border-t border-primary/20 flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-[10px] text-primary uppercase font-bold">
            Executing Line {activeLine}
          </span>
        </div>
      )}
    </div>
  );
}
