import { api } from "../api";
import { Ticket, CreateTicketData } from "@/types";

export const ticketsService = {
  async getAll(): Promise<Ticket[]> {
    const { data } = await api.get<{ data: Ticket[] }>("/tickets");
    return data.data;
  },

  async create(ticketData: CreateTicketData): Promise<Ticket> {
    const { data } = await api.post<Ticket>("/tickets", ticketData);
    return data;
  },
};

