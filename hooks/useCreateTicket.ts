import { useState } from "react";
import { createTicket } from "@/lib/tickets";

export function useCreateTicket() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(values: any) {
    try {
      setLoading(true);
      setError("");
      const response = await createTicket(values);
      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao criar ticket");
    } finally {
      setLoading(false);
    }
  }

  return { handleCreate, loading, error };
}