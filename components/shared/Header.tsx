"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-none bg-[#ffffff] px-6 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-sans text-2xl font-bold uppercase tracking-tighter text-black">
          THE HUB
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            className={`font-sans text-sm tracking-tight transition-all duration-100 ${
              pathname === "/"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/"
          >
            INDEX
          </Link>
          <Link
            className={`font-sans text-sm tracking-tight transition-all duration-100 ${
              pathname === "/versus" || pathname?.startsWith("/versus/")
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/versus"
          >
            VERSUS HUB
          </Link>
          <Link
            className={`font-sans text-sm tracking-tight transition-all duration-100 ${
              pathname === "/documentation"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/documentation"
          >
            DOCUMENTATION
          </Link>
          <Link
            className={`font-sans text-sm tracking-tight transition-all duration-100 ${
              pathname === "/playground"
                ? "border-b-2 border-[#002FA7] font-bold text-[#002FA7]"
                : "text-slate-500 hover:text-black"
            }`}
            href="/playground"
          >
            PLAYGROUND
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center border-b border-outline-variant bg-surface-container-low px-3 py-1.5 lg:flex">
          <span className="material-symbols-outlined mr-2 text-sm text-outline">
            search
          </span>
          <input
            className="w-48 border-none bg-transparent p-0 text-xs font-mono focus:ring-0"
            placeholder="Quick Search (Cmd+K)"
            type="text"
          />
        </div>
        <span className="material-symbols-outlined cursor-pointer p-2 text-slate-500 transition-colors duration-150 hover:bg-[#f1f4f8]">
          account_circle
        </span>
        <span className="material-symbols-outlined cursor-pointer p-2 text-slate-500 transition-colors duration-150 hover:bg-[#f1f4f8]">
          help_outline
        </span>
        <button className="bg-primary-container px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest text-white transition-all hover:opacity-80">
          Query
        </button>
      </div>
    </header>
  );
}