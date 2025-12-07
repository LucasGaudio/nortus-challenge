"use client";

import { useSimulator } from "@/hooks/useSimulator";
import { useSimulatorState } from "@/hooks/useSimulatorState";
import { calcPlanValue } from "@/lib/utils/calcPlanValue";
import { Card } from "@/components/ui/Card";
import { AdditionalCoverages } from "@/components/simulator/AdditionalCoverages";
import { Sliders } from "@/components/simulator/Sliders";
import { IndicatorCard } from "@/components/simulator/IndicatorsCard";
import { Sidebar } from "@/components/layout/Sidebar";
import Topbar  from "@/components/layout/Topbar";

export default function SimulatorPage() {
  const { data, loading } = useSimulator();

  const {
    vehicleValue,
    setVehicleValue,
    clientAge,
    setClientAge,
    coverages,
    setCoverages,
    selectedPlan,
    setSelectedPlan
  } = useSimulatorState();

  if (loading || !data) {
    return (
      <div className="flex min-h-screen bg-[#0F172A] text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col p-8 gap-8">
          <Topbar title="Simulador" />
          <div className="text-white p-10">
            Carregando simulação…
          </div>
        </main>
      </div>
    );
  }

  const { includedBenefits, plansIndicators } = data;

  const updatedPlans = plansIndicators.map((plan) => ({
    ...plan,
    totalValue: calcPlanValue(plan.value, coverages),
  }));

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col p-8 gap-8">
        <Topbar title="Simulador" />

        <div className="flex gap-10">

      {/* COLUNA ESQUERDA */}
      <div className="flex-1 flex flex-col gap-8">

        {/* Planos */}
        <Card>
          <h2 className="text-xl font-semibold mb-6">Planos personalizados</h2>

          <div className="grid grid-cols-3 gap-6">

            {updatedPlans.map((p) => (
              <div
                key={p.name}
                onClick={() => setSelectedPlan(p.name)}
                className={`
                  relative cursor-pointer p-6 rounded-2xl transition-all duration-300
                  ${selectedPlan === p.name
                    ? "border border-[#2563eb] bg-[#1a2335] shadow-[0_0_20px_rgba(76,211,205,0.25)]"
                    : "border border-[#1f2a37] bg-[#111827] hover:bg-[#1a2335]"
                  }
                `}
              >
                {/* Badge "Recomendado" */}
                {p.name === "Intermediário" && (
                  <span className="
                    absolute -top-3 right-4 
                    bg-[#4CD3CD] text-[#0e111a]
                    text-xs font-bold px-3 py-1 rounded-full
                  ">
                    Recomendado
                  </span>
                )}

                <p className="text-gray-300 text-sm">{p.name}</p>
                <p className="text-3xl font-bold mt-2">
                  R$ {p.totalValue.toFixed(2)}
                </p>
                <p className="text-gray-500 text-xs mt-1">Por mês</p>
              </div>
            ))}

          </div>

          {/* Sliders */}
          <Sliders
            vehicleValue={vehicleValue}
            setVehicleValue={setVehicleValue}
            clientAge={clientAge}
            setClientAge={setClientAge}
          />

          {/* Coberturas adicionais */}
          <AdditionalCoverages
            coverages={coverages}
            setCoverages={setCoverages}
          />
        </Card>
      </div>

      {/* COLUNA DIREITA */}
      <div className="w-[380px] flex flex-col gap-8">

        {/* Benefícios inclusos */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Benefícios Inclusos</h3>

          <div className="flex flex-wrap gap-3">
            {includedBenefits?.map((b) => (
              <span
                key={b}
                className="
                  bg-[#1a2335] text-xs text-white 
                  px-3 py-1 rounded-full 
                  flex items-center gap-2
                "
              >
                <span className="w-2 h-2 bg-[#4CD3CD] rounded-full" />
                {b}
              </span>
            ))}
          </div>
        </Card>

        {/* Indicadores */}
        <Card>
          <h3 className="text-lg font-semibold mb-5">Indicadores</h3>

          <div className="flex flex-col gap-4">
            {updatedPlans.map((p) => (
              <IndicatorCard
                key={p.name}
                name={p.name}
                conversion={p.conversion}
                roi={p.roi}
                value={p.totalValue}
              />
            ))}
          </div>
        </Card>

      </div>
        </div>
      </main>
    </div>
  );
}
