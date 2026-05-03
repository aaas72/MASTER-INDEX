"use client";

import React from "react";

interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

interface UnifiedFilterBarProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * UnifiedFilterBar: A standardized, professional horizontal filter bar 
 * based on the taxonomic classification UI. 
 * Supports icons, labels, and interactive states.
 */
export default function UnifiedFilterBar({
  options,
  activeId,
  onChange,
  className = ""
}: UnifiedFilterBarProps) {
  return (
    <div className={`flex items-center bg-white border border-outline-variant/10 p-1.5 gap-2 shadow-sm ${className}`}>
      {/* Options Scrollable Container */}
      <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar py-1">
        {options.map((opt) => {
          const isActive = activeId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`
                flex items-center gap-3 px-5 py-2.5 transition-all duration-300 whitespace-nowrap border
                ${isActive 
                  ? "bg-[#001355] border-[#001355] text-white shadow-md" 
                  : "bg-surface-container-lowest border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-low hover:border-outline-variant/40"
                }
              `}
            >
              <span className={`material-symbols-outlined text-lg ${isActive ? "text-white" : "text-slate-400"}`}>
                {opt.icon}
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
