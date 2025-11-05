import React from "react";
import { DollarSign, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Transaction, User } from "@/types/user";

type Props = {
  amount: string;
  isLoading: boolean;
  showSuccess: boolean;
  lastTransaction: Transaction | null;
  handleDeposit: () => Promise<void>;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPreset: (v: number) => void;
  user: User | null;
};

export default function DepositView({
  amount,
  isLoading,
  showSuccess,
  lastTransaction,
  handleDeposit,
  handleAmountChange,
  setPreset,
  user,
}: Props) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      {showSuccess && lastTransaction && (
        <div className="p-4 bg-primary/10 border border-primary rounded-lg animate-pulse">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">
                💰 Deposited {lastTransaction.amount.toFixed(2)} ILS
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
            <DollarSign className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Deposit Money</h1>
          <p className="text-muted-foreground">Add funds to your account</p>
        </div>

        <div className="p-4 mb-6 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
          <p className="text-2xl font-bold">{user?.balance.toFixed(2)} ILS</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Deposit Amount (ILS)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                ₪
              </span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[50, 100, 500, 1000].map((value) => (
              <Button
                key={value}
                variant="outline"
                size="sm"
                onClick={() => setPreset(value)}
                disabled={isLoading}
                className="cursor-pointer"
              >
                {value}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleDeposit}
            disabled={isLoading || !amount}
            className="w-full cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" /> Deposit Now
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => (window.location.href = "/dashboard")}
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </div>

        <div className="mt-6 p-3 bg-secondary/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Note:</span> Deposits are processed
            instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
