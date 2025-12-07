import { api } from "./api";
import { useAuthStore } from "@/store/useAuthStore";

export async function fetchSimulator() {
  const token = useAuthStore.getState().token;

  const res = await api.get("/nortus-v1/simulador-planos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
