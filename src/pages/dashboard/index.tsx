import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context"; // بدّلي لـ "../../context/auth-context" لو الإلياس @ مش شغال

export default function DashboardPage() {
  const { user } = useAuth();            // جاي من auth-context.tsx
  const navigate = useNavigate();
  const [showBirthday, setShowBirthday] = useState(false);

  // لو مافي user (مو مسجّل دخول) رجّعيه للّوجين
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // رصيد المستخدم (رقم آمن)
  const currentBalance = useMemo(
    () => Number(user?.balance ?? 0),
    [user?.balance]
  );

  // لون الرصيد حسب Trello: أخضر > 0، أحمر = 0 (وأقل من 0 برضه أحمر)
  const balanceColor = currentBalance > 0 ? "text-green-500" : "text-red-500";

  // بوب-أب عيد الميلاد مرة واحدة في الجلسة
  useEffect(() => {
    const birth = user?.birthday;
    if (!birth) return;

    const key = "birthdayShown";
    if (sessionStorage.getItem(key)) return;

    const today = new Date();
    const [, m, d] = String(birth).split("-").map(Number); // نتجاهل السنة
    const isBirthday = today.getMonth() + 1 === m && today.getDate() === d;

    if (isBirthday) {
      setShowBirthday(true);
      sessionStorage.setItem(key, "1");
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
    <div className="min-h-screen flex flex-col items-center gap-6 p-8">
      {/* بطاقة المستخدم */}
      <div className="w-full max-w-2xl bg-card text-card-foreground rounded-2xl shadow p-4 flex items-center gap-4">
        {user?.profile_img ? (
          <img
            src={user.profile_img}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border"
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
        ) : (
          <div className="w-16 h-16 rounded-full border grid place-items-center text-sm text-muted-foreground">
            N/A
          </div>
        )}
        <div>
          <p className="text-muted-foreground m-0">Welcome back,</p>
          <h2 className="text-xl font-semibold m-0">{fullName}</h2>
        </div>
      </div>

      {/* الرصيد */}
      <div className="w-full max-w-2xl bg-card text-card-foreground rounded-2xl shadow p-6 text-center">
        <p className="text-sm text-muted-foreground m-0">Current Balance</p>

        <div className="mt-1 flex items-center justify-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              currentBalance > 0 ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <h1 className={`text-4xl font-bold ${balanceColor}`}>
            {currentBalance.toLocaleString()} ILS
          </h1>
        </div>
      </div>

      {/* الأزرار السريعة */}
      <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          className="btn"
          onClick={() => navigate("/deposit")}
          aria-label="Deposit money"
        >
          ➕ Deposit
        </button>
        <button
          className="btn"
          onClick={() => navigate("/withdraw")}
          aria-label="Withdraw money"
        >
          ➖ Withdraw
        </button>
        <button
          className="btn"
          onClick={() => navigate("/history")}
          aria-label="Transactions history"
        >
          🧾 History
        </button>
        <button
          className="btn"
          onClick={() => navigate("/settings")}
          aria-label="Settings"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* بوب-أب عيد الميلاد */}
      {showBirthday && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center px-4"
          onClick={() => setShowBirthday(false)}
        >
          <div
            className="bg-card text-card-foreground rounded-xl shadow p-6 text-center max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl mb-2">
              🎉 Happy Birthday, {user?.first_name || "dear"}! 🎂
            </h3>
            <p>Wishing you a day full of happiness and joy! 💖</p>
            <button className="mt-4 btn" onClick={() => setShowBirthday(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
