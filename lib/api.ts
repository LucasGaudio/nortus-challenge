import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { logoutAndRedirect } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.exemplo.com";

export const api = axios.create({
  baseURL: "https://nortus-challenge.api.stage.loomi.com.br",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    // Se for 401 - token inválido/expirado, faz logout local e redireciona
    if (error.response?.status === 401) {
      try {
        // Aqui poderia entrar lógica de refresh token.
        // Se não existir refresh, limpa sessão e redireciona.
        logoutAndRedirect();
      } catch (err) {
        logoutAndRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
