import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 bg-background text-foreground">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
