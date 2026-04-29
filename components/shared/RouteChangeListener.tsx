"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import LoadingOverlay from "./LoadingOverlay";

function NavigationHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start loading on route change
    setIsLoading(true);

    // End loading after a short duration to ensure page content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return <LoadingOverlay fullScreen />;
}

export default function RouteChangeListener() {
  return (
    <Suspense fallback={null}>
      <NavigationHandler />
    </Suspense>
  );
}
