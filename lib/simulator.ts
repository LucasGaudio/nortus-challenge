import { simulatorService } from "./services/simulator.service";
import { SimulatorData } from "@/types";

export async function fetchSimulator(): Promise<SimulatorData> {
  return simulatorService.getSimulatorData();
}
