import { Bell, CreditCard } from "lucide-react";

interface BalanceCardProps {
  currentBalance: number;
  balanceColor: string;
}

export function BalanceCard({
  currentBalance,
  balanceColor,
}: BalanceCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Your Balance</h3>
          <p className="text-sm text-muted-foreground">Updated just now</p>
        </div>
        <Bell className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-primary" />
        <h1 className={`text-4xl font-bold ${balanceColor}`}>
          {currentBalance.toLocaleString()} ILS
        </h1>
      </div>
    </div>
  );
}
