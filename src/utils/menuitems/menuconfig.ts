// menuConfig.ts
import {
  Home,
  Users,
  Settings,
  FolderKanban,
  FileText,
  Trees,
  LoaderPinwheel,
  ChartColumnBig,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin/dashboard",
  },
  {
    title: "Analytics",
    icon: ChartColumnBig,
    href: "/admin/analytics",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Branches",
    icon: Trees,
    href: "/admin/branches",
  },
  {
    title: "Orders",
    icon: LoaderPinwheel,
    href: "/admin/orders",
    children: [
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
    ],
  },

  // {
  //   title: "Settings",
  //   icon: Settings,
  //   href: "/dashboard/settings",
  // },
];
