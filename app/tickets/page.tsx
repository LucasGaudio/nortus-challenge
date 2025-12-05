"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import SummaryCard from "@/components/tickets/SummaryCard";
import SelectFilter from "@/components/tickets/SelectFilter";
import TicketsTable from "@/components/tickets/TicketsTable";

export interface Ticket {
  id: string;
  ticketId: string;
  priority: "Urgente" | "Média" | "Baixa";
  client: string;
  email: string;
  subject: string;
  status: "Aberto" | "Em andamento" | "Fechado";
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todos");
  const [responsibleFilter, setResponsibleFilter] = useState("Todos");

  useEffect(() => {
    api
      .get("/tickets")
      .then((res) => {
        setTickets(res.data.data);
        setTotal(res.data.total);
      })
      .catch(console.error);
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.client.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Todos" || t.status === statusFilter;

    const matchesPriority =
      priorityFilter === "Todos" || t.priority === priorityFilter;

    const matchesResponsible =
      responsibleFilter === "Todos" || t.responsible === responsibleFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesResponsible;
  });

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col p-8 gap-8">
        <Topbar title="Gestão de Tickets" />

      <div className="grid grid-cols-4 gap-6">
        <SummaryCard title="Tickets Abertos" value={15} icon="📄" />
        <SummaryCard title="Em andamento" value={8} icon="⏳" />
        <SummaryCard title="Resolvidos hoje" value={12} icon="✔️" />
        <SummaryCard title="Tempo Médio" value="2.5h" icon="⏱️" />
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl space-y-6">

        <h2 className="text-xl font-semibold">Lista de Tickets</h2>

        <div className="flex items-center gap-4">
          <input
            placeholder="Buscar por ID, cliente ou assunto..."
            className="bg-[#1F2937] w-96 p-3 rounded-xl outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <SelectFilter
            label="Todos os status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={["Todos", "Aberto", "Fechado", "Em andamento"]}
          />

          <SelectFilter
            label="Todas as prioridades"
            value={priorityFilter}
            onChange={setPriorityFilter}
            options={["Todos", "Urgente", "Média", "Baixa"]}
          />

          <SelectFilter
            label="Todos os responsáveis"
            value={responsibleFilter}
            onChange={setResponsibleFilter}
            options={[
              "Todos",
              ...Array.from(new Set(tickets.map((t) => t.responsible))),
            ]}
          />
        </div>

        <TicketsTable tickets={filteredTickets} />

      </div>
      </main>
    </div>
  );
}