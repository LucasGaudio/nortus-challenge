"use client";

import { create } from "zustand";

type AuthState = {
  user: any | null;
  token: string | null;
  setUser: (u: any) => void;
  setToken: (t: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (u) => set({ user: u }),
  setToken: (t) => set({ token: t }),
  logout: () => set({ user: null, token: null }),
}));
