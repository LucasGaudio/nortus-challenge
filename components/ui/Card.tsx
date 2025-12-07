import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
      <div
        className={`
          bg-[#111827] 
          border border-[#1f2a37] 
          rounded-2xl 
          shadow-[0_0_30px_rgba(0,0,0,0.15)] 
          p-6
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
  