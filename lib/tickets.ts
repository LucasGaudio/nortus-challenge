import { ticketsService } from "./services/tickets.service";
import { CreateTicketData, Ticket } from "@/types";

export async function createTicket(data: CreateTicketData): Promise<Ticket> {
  return ticketsService.create(data);
}
