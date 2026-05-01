"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import IntelligenceHub from "./IntelligenceHub";

export default function Header() {
  const pathname = usePathname();
  const [isHubOpen, setIsHubOpen] = useState(false);

  return (
    <>
    <header className="fixed top-0 left-0 z-50 flex w-full h-16 items-center justify-between border-b border-outline-variant/20 bg-surface/95 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-[#002FA7] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              terminal
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-black uppercase font-sans tracking-tight">
              MASTER INDEX
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">
              LIBRARIAN GUIDE
            </span>
          </div>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-100 ${
              pathname === "/"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            href="/"
          >
            OVERVIEW
          </Link>
          <Link
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-100 ${
              pathname === "/versus" || pathname?.startsWith("/versus/")
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            href="/versus"
          >
            VERSUS HUB
          </Link>
          <Link
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-100 ${
              pathname === "/documentation"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            href="/documentation"
          >
            DOCUMENTATION
          </Link>
          <Link
            className={`font-mono text-xs uppercase tracking-widest transition-all duration-100 ${
              pathname === "/playground"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
            href="/playground"
          >
            PLAYGROUND
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center border-b border-outline-variant bg-surface-container-low px-3 py-1.5 lg:flex">
          <span className="material-symbols-outlined mr-2 text-sm text-on-surface-variant">
            search
          </span>
          <input
            className="w-48 border-none bg-transparent p-0 font-mono text-xs text-on-surface focus:ring-0"
            placeholder="Quick Search (Cmd+K)"
            type="text"
          />
        </div>
        <button 
          onClick={() => setIsHubOpen(true)}
          className="material-symbols-outlined cursor-pointer p-2 text-on-surface-variant transition-colors duration-150 hover:bg-[#f1f4f8] hover:text-on-surface no-underline bg-transparent border-none"
        >
          help_outline
        </button>
      </div>
    </header>
    <IntelligenceHub isOpen={isHubOpen} onClose={() => setIsHubOpen(false)} />
    </>
  );
}