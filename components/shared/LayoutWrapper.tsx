"use client";

import { usePathname } from "next/navigation";
import { Header, Footer, RouteChangeListener } from "@/components/shared";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Dashboard has its own completely independent layout
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPlayground = pathname === "/playground";
  const isNotFound = pathname === "/not-found";

  if (isDashboard) {
    return (
      <>
        <RouteChangeListener />
        {children}
      </>
    );
  }

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
