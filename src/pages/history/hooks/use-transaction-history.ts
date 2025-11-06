import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, ArrowLeftRight } from "lucide-react";
import type { Transaction } from "@/types/user";
import { fetchUserTransactions } from "@/services/api";

const ITEMS_PER_PAGE = 5;

interface TransactionIconInfo {
  icon: typeof ArrowDown | typeof ArrowUp | typeof ArrowLeftRight;
  className: string;
}

export function useTransactionHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    fetchUserTransactions(String(user.id))
      .then((data) => setTransactions(data))
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      })
      .finally(() => setIsLoading(false));
  }, [user?.id]);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTransactionIcon = (type: string): TransactionIconInfo | null => {
    switch (type) {
      case "Deposit":
        return { icon: ArrowDown, className: "w-4 h-4 text-emerald-500" };
      case "Withdraw":
        return { icon: ArrowUp, className: "w-4 h-4 text-red-500" };
      case "Transfer":
        return { icon: ArrowLeftRight, className: "w-4 h-4 text-blue-500" };
      default:
        return null;
    }
  };

  const formatDate = (date: string) =>
    format(new Date(date), "MMM dd, yyyy HH:mm");
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return {
    transactions: paginatedTransactions,
    currentPage,
    totalPages,
    getTransactionIcon,
    formatDate,
    goToNextPage,
    goToPreviousPage,
    isEmpty: !isLoading && transactions.length === 0,
    isLoading,
  };
}
