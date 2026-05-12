"use client";

import React from 'react';

const tableData = [
  { id: 'quick-sort', title: 'Quick Sort', category: 'Sorting', status: 'Stable', complexity: 'O(n log n)' },
  { id: 'dijkstra', title: 'Dijkstra', category: 'Graphs', status: 'Stable', complexity: 'O(E log V)' },
  { id: 'merge-sort', title: 'Merge Sort', category: 'Sorting', status: 'Review', complexity: 'O(n log n)' },
  { id: 'binary-search', title: 'Binary Search', category: 'Searching', status: 'Stable', complexity: 'O(log n)' },
  { id: 'fibonacci-dp', title: 'Fibonacci DP', category: 'DP', status: 'Testing', complexity: 'O(n)' },
];

export const StatusTable = () => {
  return (
    <div className="bg-white border border-[#C4C5D6] rounded-none overflow-hidden shadow-[0_20px_40px_rgba(0,30,115,0.03)]">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-sans text-sm font-bold text-on-surface uppercase tracking-tight">
          Repository_Status
        </h3>
        <button className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest border border-primary/20 px-3 py-1 hover:bg-primary/5">
          Export_CSV
        </button>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">ID</th>
            <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Algorithm</th>
            <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Category</th>
            <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Complexity</th>
            <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="p-4 font-mono text-[11px] text-slate-400">#{row.id}</td>
              <td className="p-4 font-sans text-sm font-bold text-on-surface">{row.title}</td>
              <td className="p-4">
                <span className="font-mono text-[10px] text-[#002FA7] font-bold uppercase tracking-tighter border border-primary/10 px-2 py-0.5 bg-primary/5">
                  {row.category}
                </span>
              </td>
              <td className="p-4 font-mono text-[11px] text-slate-600">{row.complexity}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    row.status === 'Stable' ? 'bg-green-500' : 
                    row.status === 'Review' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface">
                    {row.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 border-t border-slate-100 text-center">
        <button className="font-mono text-[10px] text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
          View_Full_Repository
        </button>
      </div>
    </div>
  );
};
