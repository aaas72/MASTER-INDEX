"use client";

import React from "react";
import { motion } from "framer-motion";

interface BarsProps {
  data: number[];
  activeIndices?: number[];
  compareIndices?: number[];
  swapIndices?: number[];
  width?: number | string;
  height?: number | string;
  showValues?: boolean;
}

export const Bars = React.memo(({
  data,
  activeIndices = [],
  compareIndices = [],
  swapIndices = [],
  width = 600,
  height = 300,
  showValues = true
}: BarsProps) => {
  const maxVal = Math.max(...data, 1);

  return (
    <div 
      className="flex items-end gap-1 px-8 pb-8 border border-[#E2E8F0] bg-white relative group"
      style={{ width, height }}
    >

      {data.map((val, idx) => {
        const isActive = activeIndices.includes(idx);
        const isComparing = compareIndices.includes(idx);
        const isSwapping = swapIndices.includes(idx);

        let bgColor = "bg-[#DCE6FF]";
        let borderColor = "border-[#C4C5D6]";
        
        if (isSwapping) {
          bgColor = "bg-[#FFD2D2]";
          borderColor = "border-[#FF0000]";
        } else if (isComparing) {
          bgColor = "bg-[#FFE9A0]";
          borderColor = "border-[#D4AF37]";
        } else if (isActive) {
          bgColor = "bg-[#002FA7]";
          borderColor = "border-[#002FA7]";
        }

        return (
          <motion.div
            key={`${idx}-${val}`}
            layout
            initial={{ height: 0 }}
            animate={{ height: `${(val / maxVal) * 75}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex-1 border-t-2 ${bgColor} ${borderColor} relative transition-colors duration-200`}
          >
            {showValues && (
              <span className={`absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold tracking-tighter ${isActive ? 'text-[#002FA7]' : 'text-slate-400'}`}>
                {val}
              </span>
            )}
            
            {/* Index Tooltip on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-black text-white text-[8px] px-1 font-mono">i:{idx}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Axis Info */}
      <div className="absolute bottom-2 left-4 font-mono text-[8px] text-slate-400 uppercase tracking-widest">
        DataSet_N:{data.length} // Visual_Index_Matrix
      </div>
    </div>
  );
});

Bars.displayName = "DataVisualizer.Bars";
