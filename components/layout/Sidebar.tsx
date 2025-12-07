"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types";

function getInitials(user: User | null): string {
  if (!user) return "??";

  if (user.email) {
    // Get first 2 letters from email (before @)
    const emailPart = user.email.split("@")[0];
    return emailPart.substring(0, 2).toUpperCase();
  }

  return "??";
}

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const initials = getInitials(user);
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <aside className="w-20 bg-[#0D1323] flex flex-col items-center py-8 gap-6 border-r border-gray-800">
      
      {/* Logo */}
      <div className="text-xl font-bold text-blue-500">
        <img
            src="/images/nortus-icon.svg"
            alt="nortus icon"
            className="w-10 h-10 object-cover"
          />
      </div>

      {/* Menu icons */}
      <nav className="flex flex-col gap-6 mt-10">
        <Link
          href="/dashboard"
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            pathname === "/dashboard"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          📈
        </Link>
        <Link
          href="/tickets"
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            pathname === "/tickets"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          🎫
        </Link>
        <Link
          href="/chat"
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            pathname === "/chat"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          💬
        </Link>
        <button className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors">👤</button>
        <Link
          href="/simulator"
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            pathname === "/simulator"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          📊
        </Link>
      </nav>

      <div className="mt-auto mb-6 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
        >
          {initials}
        </button>

        {isDropdownOpen && (
          <div className="absolute bottom-0 left-full ml-2 w-56 bg-[#1F2937] rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="text-sm text-white font-medium break-all">
                {user?.email || "N/A"}
              </p>
            </div>

            <button
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </div>

    </aside>
  );
}
