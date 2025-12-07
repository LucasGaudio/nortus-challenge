import { dashboardService } from "./services/dashboard.service";
import { DashboardData } from "@/types";

export async function fetchDashboardData(): Promise<DashboardData> {
  return dashboardService.getDashboardData();
}
