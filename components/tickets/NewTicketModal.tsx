"use client";

import { useState } from "react";
import { useCreateTicket } from "@/hooks/useCreateTicket";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewTicketModal({ open, onClose, onSuccess }: Props) {
  const { handleCreate, loading, error } = useCreateTicket();

  const [form, setForm] = useState({
    ticketId: "",
    client: "",
    email: "",
    priority: "",
    responsible: "",
    subject: "",
    status: "Aberto", // default do figma/swagger
  });

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit() {
    const result = await handleCreate(form);
    if (result) {
      onSuccess();
      onClose();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#0B1220] w-full max-w-lg rounded-2xl p-8 shadow-xl relative">

        <button
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-2">Novo Ticket</h2>
        <p className="text-sm text-gray-400 mb-6">
          Preencha os dados abaixo para registrar um novo ticket na plataforma.
        </p>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-gray-300 text-sm">Nome do cliente</label>
            <input
              className="w-full mt-1 bg-[#111827] text-gray-200 px-4 py-3 rounded-xl outline-none border border-gray-700"
              placeholder="Nome da pessoa ou empresa"
              onChange={(e) => update("client", e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 bg-[#111827] text-gray-200 px-4 py-3 rounded-xl outline-none border border-gray-700"
              placeholder="E-mail de contato"
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Prioridade</label>
            <select
              className="w-full mt-1 bg-[#111827] text-gray-200 px-4 py-3 rounded-xl border border-gray-700"
              onChange={(e) => update("priority", e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Urgente">Urgente</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Responsável</label>
            <input
              className="w-full mt-1 bg-[#111827] text-gray-200 px-4 py-3 rounded-xl border border-gray-700"
              placeholder="Quem será o responsável"
              onChange={(e) => update("responsible", e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Assunto</label>
            <textarea
              className="w-full mt-1 bg-[#111827] text-gray-200 px-4 py-3 rounded-xl border border-gray-700"
              placeholder="Resumo breve"
              rows={3}
              onChange={(e) => update("subject", e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-5 py-2 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-700/40"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="px-6 py-2 rounded-xl bg-[#3B82F6] text-white font-medium hover:bg-[#2563EB]"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
