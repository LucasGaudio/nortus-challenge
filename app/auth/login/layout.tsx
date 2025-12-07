import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex bg-[#0C1220]">
      <div className="flex flex-col justify-center px-20 w-1/2 text-white">
        <h1 className="text-4xl font-bold mb-10 text-blue-400">Nortus</h1>
        {children}
      </div>

      <div className="relative w-1/2 flex items-center justify-center p-10">
        <div className="absolute top-8 right-8 flex gap-3">
          <button className="px-4 py-2 bg-[#1E293B] text-white rounded-xl text-sm flex items-center gap-2">
            🎧 Ajuda
          </button>

          <button className="px-4 py-2 bg-[#1E293B] text-white rounded-xl text-sm">
            🌎 PT-br
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl ">
          <img
            src="/images/login-image.png"
            alt="Ilustração"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
