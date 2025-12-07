import { api } from "./api";
import { useAuthStore } from "@/store/useAuthStore";

export async function createTicket(data: any) {
  const token = useAuthStore.getState().token;

  const res = await api.post("/tickets", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
