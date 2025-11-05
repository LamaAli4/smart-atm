import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { ProfileCard } from "./components/ProfileCard";
import { QuickStats } from "./components/QuickStats";
import { BalanceCard } from "./components/BalanceCard";
import { QuickActions } from "./components/QuickActions";
import { BirthdayModal } from "./components/BirthdayModal";

export default function DashboardPage() {
  const [showBirthday, setShowBirthday] = useState(false);
  const { user } = useAuth();

  const { monthlyDeposits, monthlyWithdraws } = useMemo(() => {
    if (!user?.transactions) return { monthlyDeposits: 0, monthlyWithdraws: 0 };

    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return user.transactions.reduce(
      (acc, transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate >= thirtyDaysAgo) {
          if (transaction.type === "Deposit") {
            acc.monthlyDeposits += transaction.amount;
          } else if (transaction.type === "Withdraw") {
            acc.monthlyWithdraws += transaction.amount;
          }
        }
        return acc;
      },
      { monthlyDeposits: 0, monthlyWithdraws: 0 }
    );
  }, [user?.transactions]);

  const currentBalance = useMemo(
    () => Number(user?.balance ?? 0),
    [user?.balance]
  );

  const balanceColor = currentBalance > 0 ? "text-green-500" : "text-red-500";

  useEffect(() => {
    const birth = user?.birthday;
    if (!birth) return;

    const key = `birthdayShown-${user?.id ?? "guest"}`;
    if (localStorage.getItem(key)) return;

    const today = new Date();
    const [, m, d] = String(birth).split("-").map(Number);
    const isBirthday = today.getMonth() + 1 === m && today.getDate() === d;

    if (isBirthday) {
      setShowBirthday(true);
      localStorage.setItem(key, "1");
    }
  }, [user]);

  const fullName = useMemo(() => {
    if (!user) return "User";
    const n =
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.user_name;
    return n || "User";
  }, [user]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <ProfileCard
            user={user}
            fullName={fullName}
            currentBalance={currentBalance}
          />
          <QuickStats
            monthlyDeposits={monthlyDeposits}
            monthlyWithdraws={monthlyWithdraws}
          />
        </div>

        <div className="lg:col-span-9 space-y-6">
          <BalanceCard
            currentBalance={currentBalance}
            balanceColor={balanceColor}
          />
          <QuickActions />
        </div>
      </div>

      <BirthdayModal
        isOpen={showBirthday}
        onClose={() => setShowBirthday(false)}
        firstName={user?.first_name || ""}
      />
    </div>
  );
}
