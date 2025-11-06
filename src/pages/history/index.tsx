import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactionHistory } from "./hooks/useTransactionHistory";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const {
    transactions,
    currentPage,
    totalPages,
    getTransactionIcon,
    formatDate,
    goToNextPage,
    goToPreviousPage,
    isEmpty,
  } = useTransactionHistory();

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No transactions yet</h2>
        <p className="text-muted-foreground">
          Your transaction history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Transaction History</h1>
        <p className="text-muted-foreground">Track your money flow</p>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const iconInfo = getTransactionIcon(transaction.type);
          const IconComponent = iconInfo?.icon;

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-secondary rounded-full">
                  {IconComponent && (
                    <IconComponent className={iconInfo.className} />
                  )}
                </div>

                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>

                  {transaction.type === "Transfer" &&
                    transaction.target_user && (
                      <p className="text-sm text-muted-foreground">
                        To: {transaction.target_user}
                      </p>
                    )}
                </div>
              </div>

              <p
                className={cn("font-semibold", {
                  "text-emerald-500": transaction.type === "Deposit",
                  "text-red-500": transaction.type === "Withdraw",
                  "text-blue-500": transaction.type === "Transfer",
                })}
              >
                {transaction.type === "Deposit" ? "+" : "-"}
                {transaction.amount.toFixed(2)} {transaction.currency}
              </p>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
