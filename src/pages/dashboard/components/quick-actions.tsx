import { PiggyBank, Receipt, Settings, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button
        onClick={() => navigate("/deposit")}
        className="relative group bg-card hover:bg-accent 
        rounded-xl p-6 border border-border/50 transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <PiggyBank className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-1">Deposit</h3>
            <p className="text-sm text-muted-foreground">Add funds</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate("/withdraw")}
        className="relative group bg-card hover:bg-accent rounded-xl p-6 border 
        border-border/50 transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <WalletCards className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-1">Withdraw</h3>
            <p className="text-sm text-muted-foreground">Get cash</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate("/history")}
              className="relative group bg-card hover:bg-accent rounded-xl p-6
         border border-border/50 transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Receipt className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-1">History</h3>
            <p className="text-sm text-muted-foreground">View transactions</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="relative group bg-card hover:bg-accent rounded-xl p-6 
        border border-border/50 transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-1">Settings</h3>
            <p className="text-sm text-muted-foreground">Manage account</p>
          </div>
        </div>
      </button>
    </div>
  );
}
