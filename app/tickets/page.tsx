"use client";

import { useEffect, useState } from "react";
import { ticketsService } from "@/lib/services/tickets.service";
import { Sidebar } from "@/components/layout/Sidebar";
import { SummaryCard } from "@/components/tickets/SummaryCard";
import { SelectFilter } from "@/components/tickets/SelectFilter";
import { TicketsTable } from "@/components/tickets/TicketsTable";
import { NewTicketModal } from "@/components/tickets/NewTicketModal";
import { Ticket } from "@/types";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState("Todos");
  const [responsibleFilter, setResponsibleFilter] = useState("Todos");

  const fetchTickets = async () => {
    try {
      const data = await ticketsService.getAll();
      setTickets(data);
    } catch (error) {
      console.error("Erro ao carregar tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.client.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "Todos" || t.status === statusFilter;

    const matchesPriority =
      priorityFilter === "Todos" || t.priority === priorityFilter;

    const matchesResponsible =
      responsibleFilter === "Todos" || t.responsible === responsibleFilter;

    return (
      matchesSearch && matchesStatus && matchesPriority && matchesResponsible
    );
  });

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col p-8 gap-8">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-white">
            Gestão de Tickets
          </h1>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer px-4 py-2 bg-[#3B82F6] text-white rounded-xl "
            >
              + Novo Ticket
            </button>
          </div>

        <NewTicketModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            fetchTickets();
          }}
        />
        </header>

        <div className="grid grid-cols-4 gap-6">
          <SummaryCard title="Tickets Abertos" value={15} icon="📄" />
          <SummaryCard title="Em andamento" value={8} icon="⏳" />
          <SummaryCard title="Resolvidos hoje" value={12} icon="✔️" />
          <SummaryCard title="Tempo Médio" value="2.5h" icon="⏱️" />
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-semibold">Lista de Tickets</h2>

          <div className="flex items-center gap-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L11.1 11.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                placeholder="Buscar por ID, cliente ou assunto..."
                className="bg-[#1F2937] w-96 pl-10 pr-4 py-3 rounded-xl outline-none text-white placeholder-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

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
