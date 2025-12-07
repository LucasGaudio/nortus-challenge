import { api } from "../api";
import { SimulatorData } from "@/types";

export const simulatorService = {
  async getSimulatorData(): Promise<SimulatorData> {
    const { data } = await api.get<SimulatorData>("/nortus-v1/simulador-planos");
    return data;
  },
};

