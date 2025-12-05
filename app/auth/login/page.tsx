"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Informe seu usuário."),
  password: z.string().min(1, "Informe sua senha."),
});

export default function LoginPage() {
  const router = useRouter();

  const login = useAuthStore((s) => s.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(field: "email" | "password", value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        email: formatted.email?._errors?.[0],
        password: formatted.password?._errors?.[0],
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // aqui é a mudança principal: o backend retorna APENAS o token
      const token = data?.access_token;

      if (!token) {
        throw new Error("A API não retornou access_token");
      }

      // salva o token e o email do usuário (Zustand + cookie/localStorage)
      login(formData.email, token);

      toast.success("Autenticado com sucesso!");

      // redireciona para a área protegida
      router.replace("/dashboard");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Erro ao tentar entrar. Verifique suas credenciais.";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md text-white">

      <h2 className="text-3xl font-bold mb-3">Login</h2>
      <p className="text-gray-300 mb-10">
        Entre com suas credenciais para acessar a sua conta.
      </p>

      {/* Usuário */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm">
          Usuário<span className="text-red-400">*</span>
        </label>

        <input
          type="text"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Insira o seu e-mail, CPF ou passaporte."
          className={`w-full px-4 py-3 rounded-xl bg-[#111827] border ${
            errors.email ? "border-red-500" : "border-gray-700"
          } text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2 mb-6">
        <label className="text-sm">
          Senha<span className="text-red-400">*</span>
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Digite sua senha"
            className={`w-full px-4 py-3 rounded-xl bg-[#111827] border ${
              errors.password ? "border-red-500" : "border-gray-700"
            } text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          {/* Toggle password */}
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 text-sm"
          >
            {showPassword ? "🔓" : "🔒"}
          </button>
        </div>

        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}
      </div>

      {/* Lembrar + senha */}
      <div className="flex items-center justify-between mb-8 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-blue-500" />
          Lembrar meu usuário
        </label>

        <button
          type="button"
          className="text-blue-400 hover:underline"
          onClick={() =>
            toast.info("Recuperação de senha ainda não implementada")
          }
        >
          Esqueci minha senha
        </button>
      </div>

      {/* Botão */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
