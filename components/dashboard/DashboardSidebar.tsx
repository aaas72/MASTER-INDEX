  "use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Data Manager', icon: 'data_object', href: '/dashboard' },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-[#0A1022] border-r border-[#C4C5D6]/20 h-screen sticky top-0 flex flex-col">
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-none group-hover:bg-primary/80 transition-colors shrink-0">
            <span className="text-white font-sans font-bold text-xs">M</span>
          </div>
          <div className="overflow-hidden">
            <h2 className="font-sans font-extrabold text-[#DBE7FF] text-sm uppercase tracking-tighter leading-none truncate">
              Master <span className="text-primary">Index</span>
            </h2>
            <span className="font-mono text-[8px] text-[#8FA8DF] uppercase tracking-widest">Admin_Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.3em] px-4 mb-3">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-none transition-all group ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-[#DBE7FF] hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] shrink-0 ${
                isActive ? 'text-white' : 'text-[#8FA8DF] group-hover:text-white'
              }`}>
                {item.icon}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest truncate">
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1 h-3 bg-white/30 rounded-none"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-slate-800 rounded-none border border-white/10 shrink-0"></div>
          <div className="overflow-hidden">
            <p className="font-sans font-bold text-[10px] text-[#DBE7FF] truncate">Root_Admin</p>
            <p className="font-mono text-[8px] text-green-500 uppercase tracking-widest">Active</p>
          </div>
        </div>
        <button className="w-full font-mono text-[8px] text-[#8FA8DF] uppercase tracking-widest border border-white/10 py-2 hover:bg-white/5 transition-colors">
          Terminate
        </button>
      </div>
    </aside>
  );
};
