import { TrendingDown, TrendingUp } from "lucide-react";

interface QuickStatsProps {
  monthlyDeposits: number;
  monthlyWithdraws: number;
}

export function QuickStats({
  monthlyDeposits,
  monthlyWithdraws,
}: QuickStatsProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 border border-border/50">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Quick Stats
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm">Last 30 Days Deposits</span>
          </div>
          <span className="text-sm font-medium text-green-500">
            +{monthlyDeposits.toLocaleString()} ILS
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm">Last 30 Days Withdrawals</span>
          </div>
          <span className="text-sm font-medium text-red-500">
            -{monthlyWithdraws.toLocaleString()} ILS
          </span>
        </div>
      </div>
    </div>
  );
}
