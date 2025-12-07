import { useEffect, useState } from "react";
import { fetchSimulator } from "@/lib/simulator";

export interface PlanIndicator {
  name: string;
  value: number;
  conversion: number;
  roi: number;
}

export interface SimulatorData {
  includedBenefits?: string[];
  plansIndicators: PlanIndicator[];
}

export function useSimulator() {
  const [data, setData] = useState<SimulatorData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const response = await fetchSimulator();
      setData(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { data, loading };
}
