import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react"; // زر الهامبرغر

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 bg-background text-foreground relative">
        <div className="lg:hidden p-4 border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </main>
    </div>
  );
}
