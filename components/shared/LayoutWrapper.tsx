"use client";

import { usePathname } from "next/navigation";
import { Header, Footer, RouteChangeListener } from "@/components/shared";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide Footer on Playground, but keep Header
  const isPlayground = pathname === "/playground";
  const isNotFound = pathname === "/not-found";

  if (isPlayground) {
    return (
      <>
        <RouteChangeListener />
        <Header />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </>
    );
  }

  if (isNotFound) {
    return (
      <>
        <RouteChangeListener />
        <main className="min-h-screen">
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <RouteChangeListener />
      <Header />
      <main className="pt-16 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
