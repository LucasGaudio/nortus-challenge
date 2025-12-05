"use client";

import { create } from "zustand";
import { devtools, persist  } from "zustand/middleware";
import { saveToken, saveUser, removeToken, removeUser, getUser, getToken } from "@/lib/auth";

type User = {
  id?: string;
  name?: string;
  email?: string;
  // adicione os campos do seu dominio
} | null;

type AuthState = {
  user: User;
  token: string | null;
  setUser: (u: User) => void;
  setToken: (t: string | null) => void;
  login: (email: string, token: string) => void;
  logout: () => void;
  hydrateFromStorage: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    devtools((set, get) => ({
      // estado inicial neutro (server-friendly)
      user: null,
      token: null,

      setUser: (u) => {
        if (u) saveUser(u);
        else removeUser();
        set({ user: u });
      },

      setToken: (t) => {
        if (t) saveToken(t);
        else removeToken();
        set({ token: t });
      },

      login: (email, token) => {
        // cria o objeto user a partir do email fornecido no login
        const user: User = { email };
        // salva via helpers (cookie + localStorage) e atualiza o estado
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
        // força leitura dos helpers (útil em providers se necessário)
        const u = getUser();
        const t = getToken();
        set({ user: u, token: t });
      },
    })),
    {
      name: "auth-storage", // chave no localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

// Exporta também a referência direta ao store para usos fora de React (server, redirects)
export const authStore = useAuthStore;