export default function BadgeStatus({ value }: { value: string }) {
  const colors: Record<string, string> = {
    Aberto: "bg-emerald-500/20 text-emerald-400",
    Fechado: "bg-gray-500/20 text-gray-300",
    "Em andamento": "bg-yellow-500/20 text-yellow-300",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[value] || ""}`}>
      {value}
    </span>
  );
}

