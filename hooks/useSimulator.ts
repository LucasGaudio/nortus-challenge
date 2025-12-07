import { useEffect, useState } from "react";
import { simulatorService } from "@/lib/services/simulator.service";
import { SimulatorData } from "@/types";

export function useSimulator() {
  const [data, setData] = useState<SimulatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const response = await simulatorService.getSimulatorData();
        setData(response);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao carregar simulador";
        console.error("Erro ao carregar simulador:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { data, loading, error };
}
