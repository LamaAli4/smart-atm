import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { ProfileCard } from "./components/profile-card";
import { QuickStats } from "./components/quick-stats";
import { BalanceCard } from "./components/balance-card";
import { QuickActions } from "./components/quick-actions";
import { BirthdayModal } from "./components/birthday-modal";
import type { Transaction } from "@/types/user";
import { fetchUserTransactions } from "@/services/api";

export default function DashboardPage() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    fetchUserTransactions(String(user.id))
      .then(setTransactions)
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      });
  }, [user?.id]);

  const { monthlyDeposits, monthlyWithdraws } = useMemo(() => {
    if (transactions.length === 0)
      return { monthlyDeposits: 0, monthlyWithdraws: 0 };

    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return transactions.reduce(
      (acc, t) => {
        const date = new Date(t.date);
        if (date >= thirtyDaysAgo) {
          if (t.type === "Deposit") acc.monthlyDeposits += t.amount;
          if (t.type === "Withdraw") acc.monthlyWithdraws += t.amount;
        }
        return acc;
      },
      { monthlyDeposits: 0, monthlyWithdraws: 0 }
    );
  }, [transactions]);

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
