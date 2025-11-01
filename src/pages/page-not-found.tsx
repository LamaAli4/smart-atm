import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground animate-fade-in">
      <div className="relative">
        <Ghost className="w-20 h-20 text-sidebar-ring mb-6 animate-bounce" />
        <div className="absolute inset-0 blur-2xl opacity-20 bg-sidebar-ring rounded-full"></div>
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight mb-3 text-sidebar-primary">
        404
      </h1>
      <p className="text-muted-foreground mb-8 text-center max-w-sm">
        Oops! The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Button
        onClick={() => navigate("/")}
        className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-all shadow-md hover:shadow-lg px-6 py-2 cursor-pointer"
      >
        Go Back Home
      </Button>
    </div>
  );
}
