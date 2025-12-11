import {
  Home,
  Users,
  Settings,
  FolderKanban,
  FileText,
  Trees,
  LoaderPinwheel,
  ChartColumnBig,
  AlertCircle,
  Package,
  Cpu,
  Wrench,
  Info,
  Settings2,
  Cog,
  Layers,
  Box,
  Shield,
  Key,
  Bell,
} from 'lucide-react';

export const menuItems = [
  // Main Dashboard
  {
    title: 'Dashboard',
    icon: Home,
    href: '/admin/dashboard',
  },
  {
    title: 'Analytics',
    icon: ChartColumnBig,
    href: '/admin/analytics',
  },

  // Operations
  {
    title: 'Orders',
    icon: LoaderPinwheel,
    href: '/admin/orders',
  },
  {
    title: 'Services',
    icon: Settings2,
    href: '/admin/services',
  },
  {
    title: 'Items',
    icon: Package,
    href: '/admin/items',
  },

  // Management
  {
    title: 'Users',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Branches',
    icon: Trees,
    href: '/admin/branches',
  },
  {
    title: 'Complaints',
    icon: AlertCircle,
    href: '/admin/complaints',
  },

  // Machinery & Maintenance
  {
    title: 'Machines',
    icon: Cpu,
    href: '/admin/machines',
  },
  {
    title: 'Machine Maintenance',
    icon: Wrench,
    href: '/admin/machine-maintenance',
  },

  // Settings with submenu
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    children: [
      {
        title: 'General Settings',
        icon: Cog,
        href: '/admin/settings/general',
      },
      {
        title: 'Product Info',
        icon: Info,
        href: '/admin/settings/product-info',
      },
      {
        title: 'Notifications',
        icon: Bell,
        href: '/admin/settings/notifications',
      },
      {
        title: 'Security',
        icon: Shield,
        href: '/admin/settings/security',
      },
      {
        title: 'API Keys',
        icon: Key,
        href: '/admin/settings/api-keys',
      },
    ],
  },
];

// Alternative: Grouped version with categories
export const groupedMenuItems = {
  dashboard: {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        icon: Home,
        href: '/admin/dashboard',
      },
      {
        title: 'Analytics',
        icon: ChartColumnBig,
        href: '/admin/analytics',
      },
    ],
  },
  operations: {
    title: 'Operations',
    items: [
      {
        title: 'Orders',
        icon: LoaderPinwheel,
        href: '/admin/orders',
      },
      {
        title: 'Services',
        icon: Settings2,
        href: '/admin/services',
      },
      {
        title: 'Items',
        icon: Package,
        href: '/admin/items',
      },
      {
        title: 'Complaints',
        icon: AlertCircle,
        href: '/admin/complaints',
      },
    ],
  },
  management: {
    title: 'Management',
    items: [
      {
        title: 'Users',
        icon: Users,
        href: '/admin/users',
      },
      {
        title: 'Branches',
        icon: Trees,
        href: '/admin/branches',
      },
    ],
  },
  machinery: {
    title: 'Machinery',
    items: [
      {
        title: 'Machines',
        icon: Cpu,
        href: '/admin/machines',
      },
      {
        title: 'Maintenance',
        icon: Wrench,
        href: '/admin/machine-maintenance',
      },
    ],
  },
  system: {
    title: 'System',
    items: [
      {
        title: 'Settings',
        icon: Settings,
        href: '/admin/settings',
        children: [
          {
            title: 'General Settings',
            icon: Cog,
            href: '/admin/settings/general',
          },
          {
            title: 'System Info',
            icon: Info,
            href: '/admin/settings/system-info',
          },
          {
            title: 'Notifications',
            icon: Bell,
            href: '/admin/settings/notifications',
          },
          {
            title: 'Security',
            icon: Shield,
            href: '/admin/settings/security',
          },
        ],
      },
    ],
  },
};
