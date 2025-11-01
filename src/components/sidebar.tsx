import { mainNav } from "@/layouts/nav-config";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-lg
          flex flex-col transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <h2 className="font-bold text-xl font-serif text-sidebar-primary">
            Smart ATM
          </h2>

          <button className="lg:hidden" onClick={onClose}>
            <X className="w-5 h-5 text-sidebar-foreground/70" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {mainNav.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition
                  ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
          © 2025 Smart ATM
        </div>
      </aside>
    </>
  );
}
