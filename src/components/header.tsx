import { Menu } from "lucide-react";
import SettingsDropdown from "./settings-dropdown";
import { useAuth } from "@/context/auth-context";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();

  return (
    <header className="w-full flex justify-between items-center border-b px-4 py-3 bg-background">
      <div className="text-sm text-muted-foreground font-medium tracking-wide">
        {user ? `Welcome, ${user.first_name} 🙌` : "Welcome"}
      </div>

      <button onClick={onMenuClick} className="lg:hidden ml-auto mr-4">
        <Menu className="w-6 h-6 text-foreground" />
      </button>

      <div className="flex items-center gap-4">
        <SettingsDropdown />
      </div>
    </header>
  );
}
