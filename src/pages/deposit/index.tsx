import { useState } from "react";
import { DollarSign, Loader2, ArrowLeft, CheckCircle } from "lucide-react";

interface DepositProps {
  currentBalance?: number;
  onDepositSuccess?: (newBalance: number, amount: number) => void;
  onBack?: () => void;
}

interface Transaction {
  type: "Deposit";
  amount: number;
  date: string;
  newBalance: number;
}

export default function DepositPage({
  currentBalance = 1500,
  onDepositSuccess,
  onBack,
}: DepositProps) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null
  );

  const validateAmount = (value: string): string | null => {
    const numValue = parseFloat(value);

    if (!value || value.trim() === "") {
      return "Please enter an amount";
    }

    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }

    if (numValue <= 0) {
      return "Amount must be greater than zero";
    }

    if (numValue > 1000000) {
      return "Amount cannot exceed 1,000,000 ILS";
    }

    return null;
  };

  const handleDeposit = async () => {
    const error = validateAmount(amount);

    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      const depositAmount = parseFloat(amount);
      const newBalance = currentBalance + depositAmount;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const transaction: Transaction = {
        type: "Deposit",
        amount: depositAmount,
        date: new Date().toISOString(),
        newBalance: newBalance,
      };

      setLastTransaction(transaction);
      setShowSuccess(true);
      setAmount("");

      if (onDepositSuccess) {
        onDepositSuccess(newBalance, depositAmount);
      }

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Deposit error:", error);
      alert("Failed to process deposit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border border-border p-8 backdrop-blur-sm">
        {showSuccess && lastTransaction && (
          <div className="mb-6 p-4 bg-primary/10 border-2 border-primary rounded-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  💰 Deposit {lastTransaction.amount.toFixed(2)} ILS
                </p>
                <p className="text-sm text-muted-foreground">
                  New balance: {lastTransaction.newBalance.toFixed(2)} ILS
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Deposit Money
          </h1>
          <p className="text-muted-foreground">Add funds to your account</p>
        </div>

        <div className="bg-primary rounded-xl p-6 mb-6 text-primary-foreground">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-3xl font-bold">{currentBalance.toFixed(2)} ILS</p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-semibold mb-1 text-foreground"
            >
              Deposit Amount (ILS)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                ₪
              </span>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2.5 border border-border bg-background rounded-lg text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleDeposit();
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[50, 100, 500, 1000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value.toString())}
                className="py-2 px-3 bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-lg text-sm font-medium transition cursor-pointer"
                disabled={isLoading}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDeposit}
            disabled={isLoading || !amount}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg hover:bg-primary/90 transition text-sm font-semibold shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4" />
                Deposit Now
              </>
            )}
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-lg font-semibold hover:bg-secondary/80 transition cursor-pointer flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>

        <div className="mt-6 p-4 bg-accent rounded-lg">
          <p className="text-xs text-accent-foreground">
            <span className="font-semibold">Note:</span> Deposits are processed
            instantly. Your new balance will be available immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
