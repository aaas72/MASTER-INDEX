"use client";

import React from "react";
import Link from "next/link";
import { getCategoryIcon } from "@/lib/algorithm-utils";
import { BrutalistButton } from "@/components/shared";

interface AlgorithmCardProps {
  algo: {
    id: string;
    name: string;
    cat: string;
    avg: string;
    tags: string[];
    subtitle: string;
  };
}

/**
 * AlgorithmCard: A standalone, reusable card component that embodies 
 * the platform's neo-formalist and brutalist design language.
 */
export default function AlgorithmCard({ algo }: AlgorithmCardProps) {
  // Generate a mock index or use the ID
  const displayId = `ALG_${algo.id.slice(0, 2).toUpperCase()}`;

  return (
    <Link
      href={`/algorithms/${algo.id}`}
      className="group flex flex-col h-[380px] bg-surface-container-lowest border border-outline-variant/20 hover:bg-primary transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary group-hover:bg-white transition-colors duration-300"></div>
      
      {/* Header Row */}
      <div className="flex justify-between p-4 border-b border-outline-variant/20 group-hover:border-white/20 transition-colors duration-300">
        <span className="font-mono text-[10px] text-on-surface-variant group-hover:text-white/70 uppercase tracking-widest">
          {displayId}
        </span>
        <span className="material-symbols-outlined text-primary group-hover:text-white text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          arrow_outward
        </span>
      </div>

      {/* Main Content (Centered) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-12 h-12 border-2 border-primary group-hover:border-white flex items-center justify-center transition-colors duration-300 shrink-0">
          <span className="material-symbols-outlined text-xl text-primary group-hover:text-white transition-colors duration-300">
            {getCategoryIcon(algo.cat)}
          </span>
        </div>
        <div className="text-center">
          <h3 className="font-sans font-black text-lg text-black group-hover:text-white uppercase tracking-tighter leading-none mb-2">
            {algo.name}
          </h3>
          <p className="font-serif text-[10px] text-on-surface-variant group-hover:text-white/80 leading-tight line-clamp-2 mb-3 px-2">
            {algo.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {algo.tags.slice(0, 2).map(tag => (
              <span key={tag} className="font-mono text-[8px] text-primary group-hover:text-white/90 uppercase border border-primary/20 group-hover:border-white/30 px-1.5 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-surface-container-low group-hover:bg-primary-container/20 transition-colors duration-300 flex flex-col gap-2 border-t border-outline-variant/20 group-hover:border-white/20">
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] text-on-surface-variant group-hover:text-white/70 uppercase tracking-widest">
            COMPLEXITY:
          </span>
          <span className="font-mono text-[10px] font-black text-primary group-hover:text-white">
            {algo.avg}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-[9px] text-on-surface-variant group-hover:text-white/70 uppercase tracking-widest">
            STATUS:
          </span>
          <span className="font-mono text-[10px] font-bold text-green-600 group-hover:text-green-300">
            VERIFIED_CORE
          </span>
        </div>
      </div>
    </Link>
  );
}
