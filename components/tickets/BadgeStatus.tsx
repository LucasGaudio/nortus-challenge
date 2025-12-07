import { TicketStatus } from "@/types";

interface BadgeStatusProps {
  value: TicketStatus;
}

export function BadgeStatus({ value }: BadgeStatusProps) {
  const colors: Record<TicketStatus, string> = {
    Aberto: "bg-cyan-500/20 text-cyan-400",
    Fechado: "bg-gray-500/20 text-gray-300",
    "Em andamento": "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[value] || ""}`}>
      {value}
    </span>
  );
}

