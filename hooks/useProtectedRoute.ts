"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useProtectedRoute() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    // Se estiver carregando e não há token, redireciona
    if (typeof window !== "undefined" && !token) {
      router.replace("/auth/login");
    }
  }, [token, router]);
}
