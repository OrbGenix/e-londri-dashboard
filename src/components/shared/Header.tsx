"use client";

import { Menu, Bell, User, LogOut, Key } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import ProfileDropdown from "./ProfileDropdown";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <Breadcrumbs />
      </div>

      {/* Right Side: Bell + Profile Dropdown */}
      <ProfileDropdown />
    </div>
  );
}
