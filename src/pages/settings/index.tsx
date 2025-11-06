import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearUserTransactions, updateUser } from "@/services/api";

export default function SettingPage() {
  const { user, setUser } = useAuth();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset your account? This will clear your balance and transactions."
      )
    )
      return;

    if (!user) {
      toast.error("User not found");
      return;
    }

    setIsResetting(true);

    try {
      const deleted = await clearUserTransactions(user.id.toString());
      if (!deleted) throw new Error("Failed to clear transactions");

      const updatedUser = await updateUser(user.id, { balance: 0 });
      if (!updatedUser) throw new Error("Failed to update user balance");

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Account reset successfully!");
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("Failed to reset account. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <div>
            <h3 className="font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">
              Customize how Smart ATM looks on your device
            </p>
          </div>
          <ModeToggle />
        </div>

        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <div>
            <h3 className="font-medium">Reset Account</h3>
            <p className="text-sm text-muted-foreground">
              Clear your balance and transaction history
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={handleReset}
            disabled={isResetting}
            className="cursor-pointer"
          >
            {isResetting ? "Resetting..." : "Reset Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
