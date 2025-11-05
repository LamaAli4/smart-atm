import React from "react";
import { Wallet, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User, Transaction } from "@/types/user";

interface WithdrawViewProps {
  amount: string;
  currentBalance: number;
  isLoading: boolean;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWithdraw: () => void;
  onBack?: () => void;
  getAvailableQuickAmounts: () => number[];
  showSuccess: boolean;
  lastTransaction: Transaction | null;
  user: User | null;
}

export function WithdrawView({
  amount,
  currentBalance,
  isLoading,
  onAmountChange,
  onWithdraw,
  onBack,
  getAvailableQuickAmounts,
  showSuccess,
  lastTransaction,
  user,
}: WithdrawViewProps) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      {showSuccess && lastTransaction && (
        <div className="p-4 bg-primary/10 border border-primary rounded-lg animate-pulse">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">
                🏧 Withdrew {lastTransaction.amount.toFixed(2)} ILS
              </p>
              <p className="text-sm text-muted-foreground">
                New balance: {(user?.balance || 0).toFixed(2)} ILS
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Withdraw Money</h1>
          <p className="text-muted-foreground">
            Withdraw funds from your account
          </p>
        </div>

        <div className="p-4 mb-6 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
          <p className="text-2xl font-bold">{currentBalance.toFixed(2)} ILS</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Withdrawal Amount (ILS)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                ₪
              </span>
              <input
                type="text"
                value={amount}
                onChange={onAmountChange}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {getAvailableQuickAmounts().map((value) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() =>
                  onAmountChange({
                    target: { value: value.toString() },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                disabled={isLoading}
                className="cursor-pointer"
              >
                {value}
              </Button>
            ))}
          </div>

          <Button
            onClick={onWithdraw}
            disabled={
              isLoading || !amount || parseFloat(amount) > currentBalance
            }
            className="w-full cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" /> Withdraw Now
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>

        <div className="mt-6 p-3 bg-secondary/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Note:</span> Withdrawals are processed
            instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
