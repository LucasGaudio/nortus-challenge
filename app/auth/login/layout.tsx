export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-[#0C1220]">
      {/* Coluna esquerda */}
      <div className="flex flex-col justify-center px-20 w-1/2 text-white">
        <h1 className="text-4xl font-bold mb-10 text-blue-400">Nortus</h1>
        {children}
      </div>

      {/* Coluna direita */}
      <div className="relative w-1/2 flex items-center justify-center p-10">
        {/* Botões no topo direito */}
        <div className="absolute top-8 right-8 flex gap-3">
          <button className="px-4 py-2 bg-[#1E293B] text-white rounded-xl text-sm flex items-center gap-2">
            🎧 Ajuda
          </button>

          <button className="px-4 py-2 bg-[#1E293B] text-white rounded-xl text-sm">
            🌎 PT-br
          </button>
        </div>

        {/* Imagem ilustrativa */}
        <div className="rounded-3xl overflow-hidden shadow-2xl max-w-lg">
          <img
            src="/login-illustration.png"
            alt="Ilustração"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
