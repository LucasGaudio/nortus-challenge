"use client";

import { useState, useEffect } from "react";
import BadgePriority from "./BadgePriority";
import BadgeStatus from "./BadgeStatus";
import { Ticket } from "@/app/tickets/page";

const ITEMS_PER_PAGE = 10;

export default function TicketsTable({ tickets }: { tickets: Ticket[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);

  // Reset to page 1 when tickets change (e.g., after filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [tickets.length]);

  // Calculate paginated tickets
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTickets = tickets.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhum ticket encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            <th>ID</th>
            <th>Prioridade</th>
            <th>Cliente</th>
            <th>Assunto</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTickets.map((t) => (
            <tr key={t.id} className="bg-[#1F2937] rounded-xl">
              <td className="p-3">{t.ticketId}</td>

              <td className="p-3">
                <BadgePriority value={t.priority} />
              </td>

              <td className="p-3">
                <div className="flex flex-col">
                  <span>{t.client}</span>
                  <span className="text-sm text-gray-400">{t.email}</span>
                </div>
              </td>

              <td className="p-3">{t.subject}</td>

              <td className="p-3">
                <BadgeStatus value={t.status} />
              </td>

              <td className="p-3">
                {new Date(t.createdAt).toLocaleDateString("pt-BR")}
              </td>

              <td className="p-3">{t.responsible}</td>

              <td className="p-3 flex gap-3">
                <button className="text-blue-400">Editar</button>
                <button className="text-blue-400">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end-safe pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            {/* Double left arrow - First page */}
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 bg-[#1F2937] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#374151] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                <path
                  d="M9.5 11L6.5 8L9.5 5M6.5 11L3.5 8L6.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Single left arrow - Previous page */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 bg-[#1F2937] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#374151] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Page indicator */}
            <span className="px-4 text-sm text-gray-300">
              {currentPage} de {totalPages}
            </span>

            {/* Single right arrow - Next page */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 bg-[#1F2937] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#374151] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Double right arrow - Last page */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 bg-[#1F2937] cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#374151] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                <path
                  d="M6.5 5L9.5 8L6.5 11M9.5 5L12.5 8L9.5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  