"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/lib/services/dashboard.service";
import { Sidebar } from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { KPIChart } from "@/components/dashboard/KPIChart";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { ClientsMap } from "@/components/dashboard/ClientsMap";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { DashboardData } from "@/types";

export default function DashboardPage() {
  useProtectedRoute();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const kpiData = {
    labels: dashboard?.kpisTrend?.labels || [],
    arpu: dashboard?.kpisTrend?.arpuTrend?.data || [],
    conversion: dashboard?.kpisTrend?.conversionTrend?.data || [],
    retention: dashboard?.kpisTrend?.retentionTrend?.data || [],
    churn: dashboard?.kpisTrend?.churnTrend?.data || [],
  };

  const conversionData = {
    labels: dashboard?.kpisTrend?.labels || [],
    conversion: dashboard?.kpisTrend?.conversionTrend?.data || [],
  };

  const mapData = dashboard?.activeClients?.data || [];

  useEffect(() => {
    async function loadData() {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboard(data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-white text-xl h-screen">
        Carregando dados…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col p-8 gap-8">
        <Topbar title="Dashboard" />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* KPIs */}
          <div className="xl:col-span-2">
            <KPIChart data={kpiData} />
          </div>

          {/* Conversão */}
          <div>
            <ConversionChart data={conversionData} />
          </div>

        </div>

        <ClientsMap clients={Array.isArray(mapData) ? mapData : []} />
      </main>
    </div>
  );
}
 