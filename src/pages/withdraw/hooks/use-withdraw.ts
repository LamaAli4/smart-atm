import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth-context";
import { updateUser, addTransaction } from "@/services/api";
import type { Transaction } from "@/types/user";

export function useWithdraw() {
  const { user, setUser } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null
  );

  const validateAmount = (value: string): string | null => {
    const numValue = parseFloat(value);
    const currentBalance = user?.balance ?? 0;

    if (!value || value.trim() === "") return "Please enter an amount";
    if (isNaN(numValue)) return "Please enter a valid number";
    if (numValue <= 0) return "Amount must be greater than zero";
    if (numValue > currentBalance)
      return `Insufficient funds. Your balance is ${currentBalance.toFixed(
        2
      )} ILS`;
    if (numValue > 50000) return "Maximum withdrawal amount is 50,000 ILS";

    return null;
  };

  const handleWithdraw = async () => {
    const error = validateAmount(amount);
    if (error) {
      toast.error(error);
      return;
    }

    if (!user) return;
    setIsLoading(true);

    try {
      const withdrawAmount = parseFloat(amount);
      const newBalance = user.balance - withdrawAmount;

      const transaction: Transaction = {
        id: Date.now(),
        type: "Withdraw",
        amount: withdrawAmount,
        currency: "ILS",
        date: new Date().toISOString(),
      };

      const added = await addTransaction(user.id.toString(), transaction);

      if (!added) {
        throw new Error("Failed to add transaction to server");
      }

      const updatedUser = {
        ...user,
        balance: newBalance,
      };

      const updatedFromServer = await updateUser(user.id, updatedUser);

      if (updatedFromServer) {
        setUser(updatedFromServer);
        localStorage.setItem("user", JSON.stringify(updatedFromServer));
      } else {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setLastTransaction(transaction);
      setShowSuccess(true);
      toast.success(`Successfully withdrew ${withdrawAmount.toFixed(2)} ILS`);
      setAmount("");

      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Withdraw error:", error);
      toast.error("Failed to process withdrawal. Please try again.");
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

  const getAvailableQuickAmounts = () => {
    const amounts = [50, 100, 500, 1000];
    const currentBalance = user?.balance ?? 0;
    return amounts.filter((amt) => amt <= currentBalance);
  };

  return {
    amount,
    isLoading,
    currentBalance: user?.balance ?? 0,
    handleWithdraw,
    handleAmountChange,
    getAvailableQuickAmounts,
    showSuccess,
    lastTransaction,
    user,
  };
}
