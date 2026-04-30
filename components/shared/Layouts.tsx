import Sidebar from "./Sidebar";
import React from "react";

/**
 * SidebarLayout: Standardized layout for pages with a sidebar.
 * Used for Home, Algorithms, Categories, Archive, and Settings.
 */
export function SidebarLayout({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className={`flex-1 min-w-0 p-6 md:p-10 lg:p-12 ${className}`}>
        <div className="max-w-[1440px] mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

/**
 * FullWidthLayout: Standardized layout for pages without a sidebar.
 * Used for Versus, Documentation, and Detail pages.
 */
export function FullWidthLayout({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="w-full min-h-screen bg-surface">
      <main className={`w-full px-6 pt-4 pb-8 md:px-10 lg:px-12 ${className}`}>
        <div className="max-w-[1440px] mx-auto w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
