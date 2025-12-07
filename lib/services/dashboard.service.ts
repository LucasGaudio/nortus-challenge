import { api } from "../api";
import { DashboardData } from "@/types";

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const { data } = await api.get<DashboardData>("/nortus-v1/dashboard");
    return data;
  },
};

