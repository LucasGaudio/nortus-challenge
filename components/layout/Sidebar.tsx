"use client";

import { useAuthStore } from "@/store/useAuthStore";

function getInitials(user: { email?: string } | null): string {
  if (!user) return "??";
  
  if (user.email) {
    // Get first 2 letters from email (before @)
    const emailPart = user.email.split("@")[0];
    return emailPart.substring(0, 2).toUpperCase();
  }
  
  return "??";
}

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const initials = getInitials(user);
  console.log(' initials', initials);
  return (
    <aside className="w-20 bg-[#0D1323] flex flex-col items-center py-8 gap-6 border-r border-gray-800">
      
      {/* Logo */}
      <div className="text-xl font-bold text-blue-500">
        N
      </div>

      {/* Menu icons */}
      <nav className="flex flex-col gap-6 mt-10">
        <button className="p-3 rounded-lg bg-blue-600">📈</button>
        <button className="p-3 rounded-lg hover:bg-gray-800">🎫</button>
        <button className="p-3 rounded-lg hover:bg-gray-800">💬</button>
        <button className="p-3 rounded-lg hover:bg-gray-800">👤</button>
        <button className="p-3 rounded-lg hover:bg-gray-800">📊</button>
      </nav>

      {/* Avatar */}
      <div className="mt-auto mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
          {initials}
        </div>
      </div>

    </aside>
  );
}
