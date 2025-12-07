import { api } from "../api";
import { LoginResponse } from "@/types/api";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  },
};

