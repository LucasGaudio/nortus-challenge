export default function BadgePriority({ value }: { value: string }) {
    const colors: Record<string, string> = {
      Urgente: "bg-red-500/20 text-red-400",
      Média: "bg-blue-500/20 text-blue-300",
      Baixa: "bg-gray-500/20 text-gray-300",
    };
  
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${colors[value] || ""}`}>
        {value}
      </span>
    );
}
  