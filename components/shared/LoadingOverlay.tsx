"use client";

import React from "react";

/**
 * LoadingOverlay: A global loading state component using the brutalist 
 * blue gradient square animation.
 */
export default function LoadingOverlay({ fullScreen = false }: { fullScreen?: boolean }) {
  const containerClasses = fullScreen 
    ? "fixed inset-x-0 bottom-0 top-[73px] z-[40] bg-surface/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300 ease-out"
    : "flex flex-col items-center justify-center min-h-[60vh] w-full bg-transparent animate-in fade-in duration-300";

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-4 mb-8">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="w-5 h-5 bg-[#002FA7] animate-[pulse_1.5s_infinite_ease-in-out]"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              opacity: 1 - (i * 0.15)
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.6em] text-[#002FA7] animate-pulse">
          ARCHIVE_SYNCHRONIZATION_IN_PROGRESS
        </div>
        <div className="mt-2 font-mono text-[8px] text-slate-400 uppercase tracking-widest">
          Please stand by for protocol initialization...
        </div>
      </div>
    </div>
  );
}
