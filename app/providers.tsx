"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Providers({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrateFromStorage);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
