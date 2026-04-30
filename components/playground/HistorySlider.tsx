"use client";

import React from "react";
import { motion } from "framer-motion";

interface HistorySliderProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  isRunning: boolean;
}

export default function HistorySlider({ currentStep, totalSteps, onStepChange, isRunning }: HistorySliderProps) {
  if (totalSteps <= 0) return null;

  return (
    <div className="bg-[#0A1022] border border-[#002FA7]/30 shadow-xl px-6 py-3 flex items-center gap-6">
      <div className="flex flex-col gap-1 min-w-[100px]">
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Time_Cursor</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-white tabular-nums leading-none">{currentStep + 1}</span>
          <span className="text-[10px] text-slate-500 font-bold tabular-nums">/ {totalSteps}</span>
        </div>
      </div>

      <div className="flex-1 relative h-8 flex items-center">
        {/* Background Track */}
        <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-white/10 rounded-none overflow-hidden">
          <motion.div 
            className="h-full bg-[#002FA7]" 
            style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Input Range */}
        <input 
          type="range" 
          min={0} 
          max={totalSteps - 1} 
          value={currentStep} 
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          disabled={isRunning}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed`}
        />

        {/* Custom Thumb Indicator */}
        <motion.div 
          className="absolute h-4 w-1 bg-white border border-[#002FA7] pointer-events-none z-10"
          style={{ left: `${(currentStep / (totalSteps - 1)) * 100}%`, x: '-50%', top: '50%', y: '-50%' }}
        />
        
        {/* Step Ticks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5">
           {Array.from({ length: Math.min(totalSteps, 20) }).map((_, i) => (
             <div key={i} className="h-1 w-px bg-white/20 self-center"></div>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={isRunning || currentStep === 0}
          className="w-8 h-8 flex items-center justify-center border border-white/10 text-white hover:bg-[#002FA7] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <span className="material-symbols-outlined text-sm">keyboard_arrow_left</span>
        </button>
        <button 
          onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={isRunning || currentStep === totalSteps - 1}
          className="w-8 h-8 flex items-center justify-center border border-white/10 text-white hover:bg-[#002FA7] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <span className="material-symbols-outlined text-sm">keyboard_arrow_right</span>
        </button>
      </div>
    </div>
  );
}
