"use client";

import React, { useState } from "react";

interface AcademicLabelProps {
  prefix: string;
  index?: number;
  className?: string;
  children?: React.ReactNode;
  description?: string; // Optional custom description
}

const NOMENCLATURE_MAP: Record<string, string> = {
  "TH-CST": "Theoretical Constraint: Mathematical or architectural limitations.",
  "APP-DMN": "Application Domain: Real-world industrial or computational environments.",
  "CMP-ANL": "Comparative Analysis: Trade-offs between algorithmic paradigms.",
  "ALG-LOG": "Algorithmic Logic: Core procedural flow and decision mapping.",
  "CMP-MET": "Computational Metrics: Performance and efficiency indicators."
};

export const AcademicLabel: React.FC<AcademicLabelProps> = ({ prefix, index, className = "", children, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const info = description || NOMENCLATURE_MAP[prefix] || "Technical specification code.";

  return (
    <div 
      className={`relative px-4 py-2 bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary tracking-tighter whitespace-nowrap shrink-0 min-w-[100px] shadow-sm cursor-help transition-colors hover:bg-primary/5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{prefix}</span>
      {index !== undefined && <span className="opacity-40 ml-1">.{index.toString().padStart(2, '0')}</span>}
      {children}

      {/* Academic Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-0 mb-2 w-64 z-50 animate-in fade-in slide-in-from-bottom-1 duration-200">
          <div className="bg-black text-white p-3 text-[10px] font-mono leading-relaxed border border-white/10 shadow-2xl uppercase tracking-widest">
            <div className="mb-1 flex items-center gap-2 border-b border-white/20 pb-1 text-primary">
              <span className="material-symbols-outlined text-xs">info</span>
              LEXICON_ENTRY
            </div>
            {info}
          </div>
        </div>
      )}
    </div>
  );
};
