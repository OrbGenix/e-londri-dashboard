"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-gray-600 space-x-1 md:space-x-2 text-sm">
      <Link href="/dashboard" className="hover:underline">
        Home
      </Link>
      {segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        return (
          <span key={href} className="flex items-center">
            <ChevronRight size={14} />
            <Link href={href} className="hover:underline capitalize">
              {seg}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
