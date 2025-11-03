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
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const validateAmount = (value: string): string | null => {
    const numValue = parseFloat(value);

    if (!value || value.trim() === "") return "Please enter an amount";
    if (isNaN(numValue)) return "Please enter a valid number";
    if (numValue <= 0) return "Amount must be greater than zero";
    if (numValue > 1000000) return "Amount cannot exceed 1,000,000 ILS";

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
        newBalance,
      };

      setLastTransaction(transaction);
      setShowSuccess(true);
      setAmount("");

      if (onDepositSuccess) onDepositSuccess(newBalance, depositAmount);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Deposit error:", error);
      alert("Failed to process deposit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {showSuccess && lastTransaction && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl animate-pulse">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">
                  💰 Deposit {lastTransaction.amount.toFixed(2)} ILS
                </p>
                <p className="text-sm text-green-700">
                  New balance: {lastTransaction.newBalance.toFixed(2)} ILS
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Deposit Money</h1>
          <p className="text-gray-600">Add funds to your account</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-3xl font-bold">{currentBalance.toFixed(2)} ILS</p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Amount (ILS)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-medium">₪</span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-lg"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[50, 100, 500, 1000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value.toString())}
                className="py-2 px-3 bg-gray-100 hover:bg-green-100 hover:text-green-700 rounded-lg text-sm font-medium transition-colors"
                disabled={isLoading}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            onClick={handleDeposit}
            disabled={isLoading || !amount}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing...</> : <>
              <DollarSign className="w-5 h-5"/> Deposit Now
            </>}
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <ArrowLeft className="w-5 h-5"/> Back
            </button>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Note:</span> Deposits are processed instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
