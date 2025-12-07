import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { logoutAndRedirect } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "https://nortus-challenge.api.stage.loomi.com.br";

export const api = axios.create({
  baseURL: API_BASE_URL,
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
    if (error.response?.status === 401) {
      try {
        logoutAndRedirect();
      } catch (err) {
        logoutAndRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
