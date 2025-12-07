interface IASuggestionProps {
  content: string;
  timestamp: string;
}

export function IASuggestion({ content, timestamp }: IASuggestionProps) {
    return (
      <div className="flex flex-col items-start mb-4 w-full">
        <div className="bg-[#1a2335] border border-[#2b3441] px-5 py-4 rounded-xl w-full">
          <p className="text-xs text-gray-400 mb-1 flex items-center gap-2">
            <span>⚡</span> Sugestão da IA
          </p>
          <p className="text-sm text-gray-200">{content}</p>
  
          <span className="text-xs text-gray-500 mt-2 block">{timestamp}</span>
  
          {/* BOTÕES */}
          <div className="flex gap-4 mt-4">
            <button className="bg-[#2563eb] hover:bg-[#1e4ec9] transition px-6 py-2 rounded-full text-sm font-semibold">
              Enviar proposta
            </button>
  
            <button className="bg-[#2563eb] hover:bg-[#1e4ec9] transition px-6 py-2 rounded-full text-sm font-semibold">
              Fazer ligação
            </button>
  
            <button className="bg-[#2563eb] hover:bg-[#1e4ec9] transition px-6 py-2 rounded-full text-sm font-semibold">
              Ver histórico
            </button>
          </div>
        </div>
      </div>
    );
  }
  