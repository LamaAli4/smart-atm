import {  useState } from "react";
import { useAuth } from "@/context/auth-context";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, ArrowLeftRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;

interface TransactionIconInfo {
  icon: typeof ArrowDown | typeof ArrowUp | typeof ArrowLeftRight;
  className: string;
}

export function useTransactionHistory() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  const transactions = user?.transactions ?? [];
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getTransactionIcon = (type: string): TransactionIconInfo | null => {
    switch (type) {
      case "Deposit":
        return {
          icon: ArrowDown,
          className: "w-4 h-4 text-emerald-500",
        };
      case "Withdraw":
        return {
          icon: ArrowUp,
          className: "w-4 h-4 text-red-500",
        };
      case "Transfer":
        return {
          icon: ArrowLeftRight,
          className: "w-4 h-4 text-blue-500",
        };
      default:
        return null;
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "MMM dd, yyyy HH:mm");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    transactions: paginatedTransactions,
    currentPage,
    totalPages,
    getTransactionIcon,
    formatDate,
    goToNextPage,
    goToPreviousPage,
    isEmpty: transactions.length === 0,
  };
}
