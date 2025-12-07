import { useState } from "react";
import { Coverages } from "@/types";

export function useSimulatorState() {
  const [vehicleValue, setVehicleValue] = useState<number>(50000);
  const [clientAge, setClientAge] = useState<number>(28);

  const [coverages, setCoverages] = useState<Coverages>({
    rouboFurto: true,
    colisao: true,
    incendio: false,
    fenomenos: false,
  });

  const [selectedPlan, setSelectedPlan] = useState<string>("Intermediário");

  return {
    vehicleValue,
    setVehicleValue,
    clientAge,
    setClientAge,
    coverages,
    setCoverages,
    selectedPlan,
    setSelectedPlan,
  };
}
