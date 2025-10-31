import { mainNav } from "@/layouts/nav-config";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col shadow-lg">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="font-bold text-xl font-serif text-sidebar-primary">
          Smart ATM
        </h2>
        <p className="text-xs text-sidebar-foreground/70 mt-1">
          Financial Management
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {mainNav.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar
                ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }
              `}
            >
              <item.icon 
                className={`w-5 h-5 shrink-0 ${
                  active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70"
                }`} 
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-2 text-xs text-sidebar-foreground/60">
          <p>© 2025 Smart ATM</p>
        </div>
      </div>
    </aside>
  );
}
