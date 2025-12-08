import type { LucideIcon } from "lucide-react";

export interface MenuChild {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  children?: MenuChild[];
}
export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface SidebarLinkProps {
  href: string;
  title: string;
  icon: LucideIcon;
  active: boolean;
  small?: boolean;
}
