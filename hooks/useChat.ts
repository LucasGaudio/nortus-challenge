import { useEffect, useState } from "react";
import { chatService } from "@/lib/services/chat.service";
import { ChatData } from "@/types";

export function useChat() {
  const [data, setData] = useState<ChatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const chatData = await chatService.getChatData();
        setData(chatData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao carregar chat";
        console.error("Erro ao carregar chat:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading, error };
}
