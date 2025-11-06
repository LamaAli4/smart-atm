import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/context/watchlist-context";
import { toast } from "react-toastify";
import type { CurrencyCode } from "@/context/watchlist-context";

const MOCK_RATES: Record<CurrencyCode, number> = {
  USD: 3.7,
  EUR: 4.1,
  JOD: 5.2,
};

export default function WatchListPage() {
  const { watchlist, toggle, contains } = useWatchlist();

  const currencies: { code: CurrencyCode; rate: number }[] = (
    Object.entries(MOCK_RATES) as [CurrencyCode, number][]
  ).map(([code, rate]) => ({ code, rate }));

  const handleToggle = (code: CurrencyCode) => {
    const alreadyInList = contains(code);
    toggle(code);

    if (alreadyInList) {
      toast.info(`Removed ${code} from your watchlist`);
    } else {
      toast.success(`Added ${code} to your watchlist`);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Currency Watchlist</h1>
        <p className="text-muted-foreground">
          Add currencies to your in-memory watchlist
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">All Currencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currencies.map((c) => (
            <div
              key={c.code}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{c.code}</p>
                <p className="text-sm text-muted-foreground">{c.rate}</p>
              </div>
              <Button
                variant={contains(c.code) ? "default" : "outline"}
                size="sm"
                onClick={() => handleToggle(c.code)}
                aria-pressed={contains(c.code)}
                className="cursor-pointer"
              >
                <Star
                  className={
                    contains(c.code) ? "w-4 h-4 text-amber-400" : "w-4 h-4"
                  }
                />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <div className="p-6 border rounded-lg flex items-center justify-center gap-2 text-muted-foreground">
            <span>No currencies in your watchlist. Click the</span>
            <Star className="w-4 h-4 text-muted-foreground" />
            <span>to add.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {watchlist.map((code) => (
              <div
                key={code}
                className="p-4 border rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{code}</p>
                  <p className="text-sm text-muted-foreground">
                    Rate: {MOCK_RATES[code]}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggle(code)}
                  className="cursor-pointer"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
