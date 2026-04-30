"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);
    const baseClasses = `flex items-center transition-all duration-300 font-mono overflow-hidden whitespace-nowrap h-14 group`;
    
    if (isActive) {
      return `${baseClasses} bg-[#002FA7] text-white`;
    }
    return `${baseClasses} text-slate-600 hover:bg-[#e0e3e7]`;
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isHovered ? 192 : 64 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="sticky top-16 z-40 flex h-[calc(100vh-4rem)] shrink-0 flex-col border-r border-outline-variant/20 bg-[#f7fafe] p-0 overflow-hidden"
    >
      <nav className="flex-grow flex flex-col">
        <Link
          className={getLinkClasses("/categories")}
          href="/categories"
          title="Taxonomy"
        >
          <div className="w-16 h-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[17px]">
              category
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="text-xs uppercase tracking-widest pl-1"
              >
                Taxonomy
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link
          className={getLinkClasses("/algorithms")}
          href="/algorithms"
          title="Master Index"
        >
          <div className="w-16 h-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[17px]">
              terminal
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="text-xs uppercase tracking-widest pl-1"
              >
                Master Index
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link
          className={getLinkClasses("/archive")}
          href="/archive"
          title="Archives"
        >
          <div className="w-16 h-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[17px]">
              inventory_2
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="text-xs uppercase tracking-widest pl-1"
              >
                Archives
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link
          className={`mt-auto ${getLinkClasses("/settings")}`}
          href="/settings"
          title="Settings"
        >
          <div className="w-16 h-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[17px]">
              settings
            </span>
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="text-xs uppercase tracking-widest pl-1"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </nav>
    </motion.aside>
  );
}