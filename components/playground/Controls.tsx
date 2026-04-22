"use client";
import React from 'react';

export default function Controls() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-80 bg-[#f7fafe] dark:bg-[#0a0a0a] flex flex-col z-40 border-r border-outline-variant/30">
      <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="mb-8">
          <p className="font-mono text-[10px] text-primary mb-1 uppercase tracking-widest">ALGORITHM_SANDBOX</p>
          <h2 className="text-xl font-bold text-black dark:text-white font-sans">LAB_01</h2>
        </div>

        <div className="space-y-6">
          {/* Input Set */}
          <div>
            <label className="font-mono text-[11px] text-on-surface-variant block mb-2 uppercase tracking-widest">Input_Set</label>
            <input 
              className="w-full bg-surface-container-high border-b-2 border-outline-variant focus:border-primary-container outline-none p-3 font-mono text-sm" 
              placeholder="[12, 45, 7, 23, 9, 31]" 
              type="text"
            />
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="flex justify-between items-center font-mono text-[11px]">
              <span className="uppercase tracking-widest">Execution Speed</span>
              <span className="text-primary font-bold">500ms</span>
            </div>
            <input className="w-full accent-primary-container cursor-pointer" type="range" />
          </div>

          {/* Algorithm Selector */}
          <div>
            <label className="font-mono text-[11px] text-on-surface-variant block mb-2 uppercase tracking-widest">Algorithm Selector</label>
            <div className="space-y-1">
              {['QuickSort_V2', 'MergeSort_Standard', 'Heap_Analysis_04'].map((algo, idx) => (
                <button 
                  key={algo}
                  className={`w-full text-left font-mono text-[11px] p-3 flex items-center gap-2 transition-all ${idx === 0 ? 'bg-primary-container text-white' : 'text-zinc-500 hover:bg-surface-container-highest uppercase'}`}
                >
                  <span className="material-symbols-outlined text-[14px]">terminal</span> {algo}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 space-y-2">
          <button className="w-full bg-[#002FA7] text-white font-mono text-[11px] py-4 tracking-[0.2em] hover:bg-primary-fixed-dim hover:text-primary transition-all active:scale-[0.99] font-bold">
            RUN_SIMULATION
          </button>
          <button className="w-full border border-outline-variant text-primary font-mono text-[11px] py-4 tracking-[0.2em] hover:bg-surface-container-low transition-all active:scale-[0.99]">
            RESET_STEP
          </button>
        </div>
      </div>
    </aside>
  );
}