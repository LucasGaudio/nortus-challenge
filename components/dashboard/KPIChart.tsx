"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { KPIChartData } from "@/types";

// ApexCharts needs to be loaded dynamically in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface KPIChartProps {
  data: KPIChartData;
}

export function KPIChart({ data }: KPIChartProps) {
  const [selected, setSelected] = useState<"arpu" | "conversion" | "churn" | "retention">("arpu");

  const seriesMap = {
    arpu: { name: "ARPU", values: data.arpu },
    conversion: { name: "Conversão", values: data.conversion },
    churn: { name: "Churn", values: data.churn },
    retention: { name: "Retenção", values: data.retention },
  };

  const chartData = seriesMap[selected];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#94a3b8",
      background: 'transparent',
    },
    xaxis: {
      categories: data.labels,
      labels: { style: { colors: '#fff' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: '#fff' } },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#4cd3cd"],
    },
    grid: {
      borderColor: "#1e293b",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => {
          if (selected === "arpu") {
            return `R$ ${val.toLocaleString()}`;
          }
          return `${val}`;
        }
      }
    },
     dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <div className="p-6 bg-[#111827] rounded-2xl border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Evolução dos KPI's</h2>
        <div className="flex gap-2">
          {["retention", "conversion", "churn", "arpu"].map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                selected === key
                  ? "bg-blue-600 text-white"
                  : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
              }`}
            >
              {key === "arpu"
                ? "ARPU"
                : key === "conversion"
                ? "Conversão"
                : key === "churn"
                ? "Churn"
                : "Retenção"}
            </button>
          ))}
        </div>
      </div>

      <Chart
        options={options}
        series={[{ name: chartData.name, data: chartData.values }]}
        height={260}
        type="area"
      />
    </div>
  );
}
