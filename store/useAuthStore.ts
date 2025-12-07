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
        const user: User = { email };
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
        const user = getUser();
        const token = getToken();
        set({ user, token });
      },
    })),
    {
      name: "auth-storage", 
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export const authStore = useAuthStore;