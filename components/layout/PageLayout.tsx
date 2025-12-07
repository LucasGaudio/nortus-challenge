import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import Topbar from "./Topbar";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 gap-8">
        <Topbar title={title} />
        {children}
      </main>
    </div>
  );
}

