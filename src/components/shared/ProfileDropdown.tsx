"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, Key, LogOut, Bell } from "lucide-react";

export default function ProfileDropdown() {
  return (
    <div className="flex items-center gap-4">
      {/* Notification icon */}
      <button className="relative p-2 rounded hover:bg-gray-100">
        <Bell size={20} />
        {/* optional badge */}
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center"></span>
      </button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center gap-2">
            <User size={16} /> Profile
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2">
            <Key size={16} /> Password
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
            <LogOut size={16} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
