import { Home, DollarSign, Minus, Clock, Star } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Deposit",
    path: "/deposit",
    icon: DollarSign,
  },
  {
    label: "Withdraw",
    path: "/withdraw",
    icon: Minus,
  },
  {
    label: "History",
    path: "/history",
    icon: Clock,
  },
  {
    label: "watch-list",
    path: "/watch-list",
    icon: Star,
  },
];
