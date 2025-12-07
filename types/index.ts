// Domain Types

export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export type TicketPriority = "Urgente" | "Média" | "Baixa";
export type TicketStatus = "Aberto" | "Em andamento" | "Fechado";

export interface Ticket {
  id: string;
  ticketId: string;
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: TicketStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketData {
  ticketId?: string;
  client: string;
  email: string;
  priority: TicketPriority;
  responsible: string;
  subject: string;
  status?: TicketStatus;
}

export interface PlanIndicator {
  name: string;
  value: number;
  conversion: number;
  roi: number;
}

export interface SimulatorData {
  includedBenefits?: string[];
  plansIndicators: PlanIndicator[];
}

export interface Coverages {
  rouboFurto: boolean;
  colisao: boolean;
  incendio: boolean;
  fenomenos: boolean;
}

export interface ChatMessage {
  id: string;
  type: "user_message" | "assistant_message" | "ai_suggestion";
  author?: string;
  content: string;
  timestamp: string;
}

export interface ChatData {
  messages: ChatMessage[];
}

export interface DashboardData {
  kpisTrend?: {
    labels: string[];
    arpuTrend?: {
      data: number[];
    };
    conversionTrend?: {
      data: number[];
    };
    retentionTrend?: {
      data: number[];
    };
    churnTrend?: {
      data: number[];
    };
  };
  activeClients?: {
    data: Client[];
  };
}

export interface Client {
  id: string;
  name: string;
  location: string;
  secureType: string;
}

export interface KPIChartData {
  labels: string[];
  arpu: number[];
  conversion: number[];
  retention: number[];
  churn: number[];
}

export interface ConversionChartData {
  labels: string[];
  conversion: number[];
}

export interface GeocodeResult {
  lat: number;
  lon: number;
}

