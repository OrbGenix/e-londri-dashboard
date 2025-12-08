"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { menuItems } from "@/utils/menuitems/menuconfig";
import { SidebarLinkProps, SidebarProps } from "@/utils/menuitems/types";

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // auto-open submenu if current path is inside it
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children) {
        const match = item.children.some((child) =>
          pathname.startsWith(child.href)
        );
        if (match) setOpenMenu(item.title);
      }
    });
  }, [pathname]);

  const toggle = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-56 bg-white border-r shadow-md
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        <div className="p-4 flex flex-col h-full">
          <h1 className="font-bold text-2xl mb-6">Dashboard</h1>

          <nav className="flex flex-col gap-1 flex-1 overflow-y-scroll">
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.title}>
                  <button
                    onClick={() => toggle(item.title)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="flex items-center gap-2">
                      <item.icon size={20} />
                      {item.title}
                    </span>

                    {openMenu === item.title ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </button>

                  {openMenu === item.title && (
                    <div className="ml-4 flex flex-col border-l pl-2 mt-1">
                      {item.children.map((child) => (
                        <SidebarLink
                          key={child.href}
                          href={child.href}
                          title={child.title}
                          icon={child.icon}
                          active={pathname === child.href}
                          small
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  icon={item.icon}
                  active={pathname === item.href}
                />
              )
            )}
          </nav>

          <div className="text-gray-400 text-sm mt-6">© 2025 My Company</div>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  href,
  title,
  icon: Icon,
  active,
  small,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 p-2 rounded-lg transition
        ${
          active ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
        }
        ${small ? "text-sm ml-2" : "text-base"}
      `}
    >
      <Icon size={small ? 18 : 20} />
      {title}
    </Link>
  );
}
