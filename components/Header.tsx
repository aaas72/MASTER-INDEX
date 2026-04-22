"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff] border-none flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black uppercase font-sans">
          THE HUB
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            className={`transition-all duration-100 font-sans text-sm tracking-tight ${
              pathname === "/"
                ? "text-[#002FA7] font-bold border-b-2 border-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/"
          >
            INDEX
          </Link>
          <Link
            className={`transition-all duration-100 font-sans text-sm tracking-tight ${
              pathname === "/versus" || pathname?.startsWith("/versus/")
                ? "text-[#002FA7] font-bold border-b-2 border-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/versus"
          >
            VERSUS HUB
          </Link>
          <Link
            className={`transition-all duration-100 font-sans text-sm tracking-tight ${
              pathname === "/documentation"
                ? "text-[#002FA7] font-bold border-b-2 border-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/documentation"
          >
            DOCUMENTATION
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center bg-surface-container-low px-3 py-1.5 border-b border-outline-variant">
          <span className="material-symbols-outlined text-sm text-outline mr-2">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-xs font-mono w-48 p-0"
            placeholder="Quick Search (Cmd+K)"
            type="text"
          />
        </div>
        <span className="material-symbols-outlined text-slate-500 hover:bg-[#f1f4f8] p-2 transition-colors duration-150 cursor-pointer">
          account_circle
        </span>
        <span className="material-symbols-outlined text-slate-500 hover:bg-[#f1f4f8] p-2 transition-colors duration-150 cursor-pointer">
          help_outline
        </span>
        <button className="bg-primary-container text-white px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest hover:opacity-80 transition-all">
          Query
        </button>
      </div>
    </header>
  );
}
