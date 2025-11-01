import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLogged } = useAuth();

  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLogged) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    if (!username.trim() || !pin.trim()) {
      toast.error("Please enter both username and PIN.");
      setLoading(false);
      return;
    }

    try {
      const result = await login(username, pin);

      if (result.success) {
        toast.success(`Welcome back, ${username}!`);
        navigate("/dashboard");
      } else {
        toast.error(result.error || "Invalid username or PIN.");
      }
    } catch {
      toast.error("Unexpected error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-primary/10 via-background to-secondary/10 dark:from-background dark:to-card px-4">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-3 text-primary tracking-tight">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="border border-border bg-background rounded-lg px-4 py-2.5 w-full text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">
              PIN
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your PIN"
                className="border border-border bg-background rounded-lg px-4 py-2.5 w-full text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none pr-10"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary transition cursor-pointer"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground
             py-2.5 rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-md hover:shadow-lg 
             cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
