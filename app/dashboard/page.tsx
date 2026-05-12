"use client";

import React from 'react';
import { JsonManager } from "@/components/dashboard/JsonManager";

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 space-y-8">
      {/* Header Section */}
      <section className="border-b border-[#C4C5D6] pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-2 block">
              Core_Data_Management
            </span>
            <h1 className="font-sans text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface uppercase leading-none">
              JSON <span className="text-primary">Manager</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              JSON_Sync_Active
            </span>
            <span className="text-[#C4C5D6]">|</span>
            <span>Master_Index_DB</span>
          </div>
        </div>
      </section>

      {/* JSON Management Console */}
      <JsonManager />
    </div>
  );
}


