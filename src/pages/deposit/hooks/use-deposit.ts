import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth-context";
import type { Transaction, User } from "@/types/user";
import { updateUser } from "@/services/api";

export type UseDepositReturn = {
  amount: string;
  setAmount: (v: string) => void;
  isLoading: boolean;
  showSuccess: boolean;
  lastTransaction: Transaction | null;
  handleDeposit: () => Promise<void>;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPreset: (v: number) => void;
  user: User | null;
};

export function useDeposit(): UseDepositReturn {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null
  );

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
      toast.error(error, { autoClose: 2500 });
      return;
    }

    if (!user) {
      navigate("/");
      return;
    }

    setIsLoading(true);

    try {
      const depositAmount = parseFloat(amount);
      const newBalance = user.balance + depositAmount;

      const transaction: Transaction = {
        id: Date.now(),
        type: "Deposit",
        amount: depositAmount,
        currency: "ILS",
        date: new Date().toISOString(),
      };

      const updatedUser = {
        ...user,
        balance: newBalance,
        transactions: [...user.transactions, transaction],
      };

      const updatedFromServer = await updateUser(user.id, updatedUser).catch(
        (err) => {
          console.warn("updateUser failed, falling back to local update", err);
          return null;
        }
      );

      if (updatedFromServer) {
        setUser(updatedFromServer);
        localStorage.setItem("user", JSON.stringify(updatedFromServer));
      } else {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success(`Deposited ${depositAmount.toFixed(2)} ILS`, {
        autoClose: 2000,
      });

      setLastTransaction(transaction);
      setShowSuccess(true);
      setAmount("");

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Deposit error:", err);
      toast.error("Failed to process deposit. Please try again.", {
        autoClose: 3000,
      });
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

  const setPreset = (v: number) => setAmount(v.toString());

  return {
    amount,
    setAmount,
    isLoading,
    showSuccess,
    lastTransaction,
    handleDeposit,
    handleAmountChange,
    setPreset,
    user,
  };
}
