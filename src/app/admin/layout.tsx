"use client";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full  bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Right Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-56 transition-all duration-300">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
