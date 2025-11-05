import { useWithdraw } from "./hooks/useWithdraw";
import { WithdrawView } from "./components/withdraw-view";

export default function Withdraw() {
  const {
    amount,
    isLoading,
    currentBalance,
    handleWithdraw,
    handleAmountChange,
    getAvailableQuickAmounts,
    showSuccess,
    lastTransaction,
    user,
  } = useWithdraw();

  return (
    <WithdrawView
      amount={amount}
      currentBalance={currentBalance}
      isLoading={isLoading}
      onAmountChange={handleAmountChange}
      onWithdraw={handleWithdraw}
      getAvailableQuickAmounts={getAvailableQuickAmounts}
      showSuccess={showSuccess}
      lastTransaction={lastTransaction}
      user={user}
      onBack={() => (window.location.href = "/dashboard")}
    />
  );
}
