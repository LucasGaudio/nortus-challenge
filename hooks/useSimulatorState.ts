import { useState } from "react";

export function useSimulatorState() {
  const [vehicleValue, setVehicleValue] = useState(50000);
  const [clientAge, setClientAge] = useState(28);

  const [coverages, setCoverages] = useState({
    rouboFurto: true,
    colisao: true,
    incendio: false,
    fenomenos: false,
  });

  const [selectedPlan, setSelectedPlan] = useState("Intermediário");

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
