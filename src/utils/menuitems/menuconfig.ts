// menuConfig.ts
import { Home, Users, Settings, FolderKanban, FileText } from "lucide-react";

export const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    children: [
      {
        title: "Active Projects",
        icon: FileText,
        href: "/dashboard/projects/active",
      },
      {
        title: "Completed Projects",
        icon: FileText,
        href: "/dashboard/projects/completed",
      },
      {
        title: "Active Projects1",
        icon: FileText,
        href: "/dashboard/projects/active1",
      },
      {
        title: "Completed Projects1",
        icon: FileText,
        href: "/dashboard/projects/completed1",
      },
      {
        title: "Active Projects2",
        icon: FileText,
        href: "/dashboard/projects/active2",
      },
      {
        title: "Completed Projects2",
        icon: FileText,
        href: "/dashboard/projects/completed2",
      },
      {
        title: "Active Projects3",
        icon: FileText,
        href: "/dashboard/projects/active3",
      },
      {
        title: "Completed Projects3",
        icon: FileText,
        href: "/dashboard/projects/completed3",
      },
      {
        title: "Active Projects4",
        icon: FileText,
        href: "/dashboard/projects/active4",
      },
      {
        title: "Completed Projects4",
        icon: FileText,
        href: "/dashboard/projects/completed4",
      },
      {
        title: "Active Projects5",
        icon: FileText,
        href: "/dashboard/projects/active5",
      },
      {
        title: "Completed Projects6",
        icon: FileText,
        href: "/dashboard/projects/completed6",
      },
      {
        title: "Active Projects7",
        icon: FileText,
        href: "/dashboard/projects/active7",
      },
      {
        title: "Completed Projects7",
        icon: FileText,
        href: "/dashboard/projects/completed7",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];
