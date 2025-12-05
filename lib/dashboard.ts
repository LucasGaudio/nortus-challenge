import { api } from "./api";

export async function fetchDashboardData() {
  const { data } = await api.get("/nortus-v1/dashboard");
  return data;
}
