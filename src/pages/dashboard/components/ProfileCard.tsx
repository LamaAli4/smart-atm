import type { User } from "@/types/user";

interface ProfileCardProps {
  user: User | null;
  fullName: string;
  currentBalance: number;
}

export function ProfileCard({
  user,
  fullName,
  currentBalance,
}: ProfileCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 border border-border/50">
      {user?.profile_img ? (
        <img
          src={user.profile_img}
          alt={fullName}
          className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 shadow-sm mx-auto"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
      ) : (
        <div
          className="w-20 h-20 rounded-full border-2 border-primary/20 grid place-items-center
         text-lg font-medium bg-muted text-muted-foreground mx-auto"
        >
          {fullName.charAt(0)}
        </div>
      )}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
        <p className="text-sm text-muted-foreground mt-1">Personal Account</p>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Account Status</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              currentBalance > 0
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {currentBalance > 0 ? "Active" : "Low Balance"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-muted-foreground">Last Login</span>
          <span className="text-sm">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
