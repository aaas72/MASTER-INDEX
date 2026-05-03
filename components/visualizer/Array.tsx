"use client";

import React from "react";
import { motion } from "framer-motion";

interface ArrayProps {
  data: number[];
  activeIndex?: number;
  targetIndex?: number;
  excludedRanges?: [number, number][]; 
  lowIndex?: number;
  highIndex?: number;
  midIndex?: number;
  statusMessage?: string;
  width?: number | string;
  height?: number | string;
}

export const ArrayStrip = React.memo(({
  data,
  activeIndex = -1,
  targetIndex = -1,
  excludedRanges = [],
  lowIndex = -1,
  highIndex = -1,
  midIndex = -1,
  statusMessage = "",
  width = "100%",
  height = 160
}: ArrayProps) => {
  
  const isExcluded = (idx: number) => {
    return excludedRanges.some(([start, end]) => idx >= start && idx <= end);
  };

  return (
    <div className="relative overflow-visible flex flex-col items-center justify-center p-2" style={{ width, height }}>
      <div className="flex gap-1 items-center w-full justify-start md:justify-center overflow-x-auto px-4 pb-8 h-full scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {data.map((val, idx) => {
          const isActive = activeIndex === idx;
          const isTarget = targetIndex === idx;
          const dimmed = isExcluded(idx);
          
          // Dynamic sizing logic
          const boxSize = data.length > 15 ? "w-8 h-8 text-[10px]" : data.length > 10 ? "w-10 h-10 text-xs" : "w-12 h-12 text-sm";
          const markerSize = data.length > 15 ? "text-[6px]" : "text-[8px]";

          const isL = idx === lowIndex;
          const isH = idx === highIndex;
          const isM = idx === midIndex;

          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1 min-w-0 max-w-[48px] relative">
              {/* L, M, H Labels */}
              <div className="absolute -top-6 flex gap-0.5 font-mono text-[7px] font-black uppercase">
                {isL && <span className="bg-primary text-white px-0.5">L</span>}
                {isM && <span className="bg-[#FF4D4D] text-white px-0.5">M</span>}
                {isH && <span className="bg-slate-800 text-white px-0.5">H</span>}
              </div>

              {/* Index Marker */}
              <span className={`font-mono ${markerSize} text-slate-400 font-bold truncate w-full text-center`}>[{idx}]</span>
              
              <motion.div
                initial={false}
                animate={{ 
                  scale: isActive || isTarget ? 1.1 : 1,
                  backgroundColor: isTarget ? "#002FA7" : isActive ? "#DCE6FF" : "#FFFFFF",
                  opacity: dimmed ? 0.3 : 1,
                  borderColor: isTarget ? "#002FA7" : isActive ? "#002FA7" : "#E2E8F0",
                  boxShadow: isTarget ? "0px 0px 15px rgba(0, 47, 167, 0.4)" : "none"
                }}
                className={`${boxSize} border-2 flex items-center justify-center font-mono font-bold transition-colors shrink-0 ${isTarget ? 'text-white' : 'text-[#002FA7]'} relative`}
              >
                {val}
                
                {/* Target Indicator Label */}
                {isTarget && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FF4D4D] text-white text-[7px] px-1.5 py-0.5 font-black uppercase tracking-widest shadow-sm whitespace-nowrap z-20">
                    TARGET
                  </div>
                )}
                
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Axis Info */}
      <div className="absolute bottom-2 left-4 font-mono text-[8px] text-slate-400 uppercase tracking-widest flex gap-4">
        <span>DataSet_N:{data.length}</span>
        {targetIndex !== -1 && (
          <span className="text-[#FF4D4D] animate-pulse">Searching_For: {data[targetIndex]}</span>
        )}
      </div>

      <div className="absolute top-2 left-4 font-mono text-[8px] text-[#002FA7] uppercase tracking-[0.3em] font-bold">
        Memory_Strip:Linear_Access
      </div>

      {/* Logic Status Message */}
      {statusMessage && (
        <div className="absolute top-2 right-4 font-mono text-[9px] text-[#002FA7] bg-[#DCE6FF] px-2 py-0.5 font-bold animate-pulse">
          SIM_LOG: {statusMessage}
        </div>
      )}
    </div>
  );
});

ArrayStrip.displayName = "DataVisualizer.Array";
