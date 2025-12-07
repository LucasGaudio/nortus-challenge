export default function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <button className="rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Novo Ticket
      </button>
    </header>
  );
}
