import { Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import ThemeToggle from "./mode-toggle";

export default function SettingsDropdown() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-accent transition cursor-pointer">
          <Settings className="w-5 h-5 text-muted-foreground cursor-pointer" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-background text-foreground"
      >
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center justify-between w-full">
            <span>Theme</span>
            <ThemeToggle />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => navigate("/settings")}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span>Settings</span>
            <Settings className="w-4 h-4" />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => logout()}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
