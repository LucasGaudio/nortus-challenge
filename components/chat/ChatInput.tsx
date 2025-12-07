export function ChatInput() {
  return (
    <div className="w-full flex items-center gap-4 mt-8">
      <input
        type="text"
        placeholder="Escreva aqui..."
        className="
          flex-1 bg-[#111827] border border-[#1f2a37] rounded-full 
          px-5 py-3 text-gray-300 outline-none
        "
      />
      <button className="bg-[#2563eb] hover:bg-[#1e4ec9] transition p-3 rounded-full">
        <span className="text-white text-xl">➤</span>
      </button>
    </div>
  );
}
  