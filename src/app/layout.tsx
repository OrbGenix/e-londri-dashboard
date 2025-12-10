"use client";
import "./globals.css";
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
    <html lang="en">
      <body className={` antialiased`}>
        <main className="">{children}</main>
      </body>
    </html>
  );
}
