"use client";

export default function LoginPage() {
  return (
    <div className="max-w-md">
      <h2 className="text-3xl font-bold mb-3">Login</h2>
      <p className="text-gray-300 mb-10">
        Entre com suas credenciais para acessar a sua conta.
      </p>

      {/* Input Usuário */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm">Usuário<span className="text-red-400">*</span></label>
        <input
          type="text"
          placeholder="Insira o seu e-mail, CPF ou passaporte."
          className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input Senha */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm">Senha<span className="text-red-400">*</span></label>
        <input
          type="password"
          placeholder="Digite sua senha"
          className="w-full px-4 py-3 rounded-xl bg-[#111827] border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lembrar usuário / Esqueci senha */}
      <div className="flex items-center justify-between mb-8 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-blue-500" />
          Lembrar meu usuário
        </label>

        <button className="text-blue-400 hover:underline">
          Esqueci minha senha
        </button>
      </div>

      {/* Botão */}
      <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold">
        Entrar
      </button>
    </div>
  );
}
