"use client";

import { ReactNode } from "react";
import { ZustandProvider } from "@/store/zustand-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return <ZustandProvider>{children}</ZustandProvider>;
}
