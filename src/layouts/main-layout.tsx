import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-background text-foreground">
        <Outlet />
      </main>
    </div>
  );
}
