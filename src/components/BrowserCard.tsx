
import type { ReactNode } from "react";

interface BrowserCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function BrowserCard({
  title,
  children,
  className = "",
}: BrowserCardProps) {
  return (
    <section
      className={`flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_30px_rgba(64,81,59,0.13)] transition-all hover:-translate-y-1.5 hover:border-[#9DBD8D] hover:shadow-[0_16px_40px_rgba(64,81,59,0.20)] ${className}`}
    >
      {/* Browser Header */}
      <div className="flex h-[50px] shrink-0 items-center gap-[7px] border-b border-[#DDDDDD] px-4">
        <span className="h-3 w-3 rounded-full bg-[#00C832]" />
        <span className="h-3 w-3 rounded-full bg-[#E9BC00]" />
        <span className="h-3 w-3 rounded-full bg-[#FF4141]" />
      </div>

      {/* Card Content */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </section>
  );
}
