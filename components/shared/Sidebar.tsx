"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);
    if (isActive) {
      return "flex items-center px-6 py-4 bg-[#002FA7] text-white font-mono transition-colors duration-200";
    }
    return "flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150";
  };

  return (
    <aside className="sticky top-16 z-40 flex h-[calc(100vh-4rem)] w-48 shrink-0 flex-col border-r border-outline-variant/20 bg-[#f7fafe] p-0">

      <nav className="flex-grow flex flex-col">
        <Link
          className={getLinkClasses("/categories")}
          href="/categories"
          title="Taxonomic Classification: Explore full domains (e.g. Graph Theory)"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            category
          </span>
          <span className="text-xs uppercase tracking-widest">Taxonomy</span>
        </Link>
        <Link
          className={getLinkClasses("/algorithms")}
          href="/algorithms"
          title="Full Ledger: Comprehensive archive of all procedures"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            terminal
          </span>
          <span className="text-xs uppercase tracking-widest">Master Index</span>
        </Link>
        <Link
          className={getLinkClasses("/archive")}
          href="/archive"
          title="Historical Documentation: Access previous versions and academic references"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            inventory_2
          </span>
          <span className="text-xs uppercase tracking-widest">Archives</span>
        </Link>
        <Link
          className={`mt-auto ${getLinkClasses("/settings")}`}
          href="/settings"
          title="Environment Customization: Change theme, language, and simulator settings"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            settings
          </span>
          <span className="text-xs uppercase tracking-widest">Settings</span>
        </Link>
      </nav>

    </aside>
  );
}