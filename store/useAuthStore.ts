"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { saveToken, saveUser, removeToken, removeUser, getUser, getToken } from "@/lib/auth";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, token: string) => void;
  logout: () => void;
  hydrateFromStorage: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set) => ({
      // Initial state (server-friendly)
      user: null,
      token: null,

      setUser: (user) => {
        if (user) saveUser(user);
        else removeUser();
        set({ user });
      },

      setToken: (token) => {
        if (token) saveToken(token);
        else removeToken();
        set({ token });
      },

      login: (email, token) => {
        // Create user object from email provided at login
        const user: User = { email };
        // Save via helpers (cookie + localStorage) and update state
        saveUser(user);
        saveToken(token);
        set({ user, token });
      },

      logout: () => {
        removeUser();
        removeToken();
        set({ user: null, token: null });
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },

      hydrateFromStorage: () => {
        // Force read from helpers (useful in providers if needed)
        const user = getUser();
        const token = getToken();
        set({ user, token });
      },
    })),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

// Export direct store reference for use outside React (server, redirects)
export const authStore = useAuthStore;