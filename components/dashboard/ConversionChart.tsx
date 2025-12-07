"use client";

import dynamic from "next/dynamic";
import { ConversionChartData } from "@/types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ConversionChartProps {
  data: ConversionChartData;
}

export function ConversionChart({ data }: ConversionChartProps) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: "#70d2f1",
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },

    // ⭐ GRADIENTE igualzinho ao Figma
    fill: {
      type: "gradient",
      opacity: 0.9,
      gradient: {
        type: "vertical",
        shadeIntensity: 0.3,
        gradientToColors: ["#70d2f1"], // fica mais claro embaixo
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },

    colors: ["#4CD3CD"],

    // ⭐ GRID IGUAL AO Figma
    grid: {
      show: true,
      borderColor: "#334155", // bem suave
      strokeDashArray: 4,
      position: "back",
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
    },

    // ⭐ EIXO X
    xaxis: {
      categories: data.labels,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: "#cbd5e1",
          fontSize: "12px",
        },
      },
    },

    // ⭐ EIXO Y (aparece no Figma)
    yaxis: {
      labels: {
        style: {
          colors: "#cbd5e1",
        },
      },
    },

    tooltip: {
      theme: "dark",
    },

    dataLabels: { enabled: false },
    stroke: { width: 0 }, // remove a borda bugada
  };

  const series = [
    {
      name: "Conversão",
      data: data.conversion,
    },
  ];

  return (
    <div className="p-6 bg-[#0f172a] rounded-2xl border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Taxa de conversão
      </h2>

      <Chart type="bar" height={260} options={options} series={series} />
    </div>
  );
}
