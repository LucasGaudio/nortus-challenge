import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useChat() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/nortus-v1/chat");
        setData(res.data);
      } catch (err) {
        console.error("Erro ao carregar chat:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading };
}
