"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total_Algorithms', value: '124', change: '+12%', icon: 'database' },
  { label: 'Simulation_Runs', value: '1.2k', change: '+8%', icon: 'analytics' },
  { label: 'System_Health', value: '99.9%', change: 'Stable', icon: 'dvr' },
  { label: 'Avg_Complexity', value: 'O(n log n)', change: '-3%', icon: 'speed' },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-[#C4C5D6] p-6 rounded-none shadow-[0_20px_40px_rgba(0,30,115,0.03)] hover:border-primary transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-[#002FA7] text-2xl font-light">
              {stat.icon}
            </span>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1">
              {stat.change}
            </span>
          </div>
          <div>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1">
              {stat.label}
            </p>
            <p className="font-sans text-3xl font-extrabold tracking-tighter text-on-surface uppercase">
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
