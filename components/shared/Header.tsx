"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-outline-variant/20 bg-surface/95 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-sans text-2xl font-bold uppercase tracking-tighter text-on-surface">
          THE HUB
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
            INDEX
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
        <span className="material-symbols-outlined cursor-pointer p-2 text-on-surface-variant transition-colors duration-150 hover:bg-[#f1f4f8] hover:text-on-surface">
          account_circle
        </span>
        <span className="material-symbols-outlined cursor-pointer p-2 text-on-surface-variant transition-colors duration-150 hover:bg-[#f1f4f8] hover:text-on-surface">
          help_outline
        </span>
        <button className="bg-primary-container px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-80">
          Query
        </button>
      </div>
    </header>
  );
}