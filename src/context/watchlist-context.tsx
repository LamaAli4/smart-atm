import { createContext, useContext, useState, type ReactNode } from "react";

export type CurrencyCode = "USD" | "EUR" | "JOD";
export type currency = { code: CurrencyCode; rate: number };

interface WatchlistContextType {
  watchlist: CurrencyCode[];
  add: (code: CurrencyCode) => void;
  remove: (code: CurrencyCode) => void;
  toggle: (code: CurrencyCode) => void;
  contains: (code: CurrencyCode) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<CurrencyCode[]>([]);

  const add = (code: CurrencyCode) => {
    setWatchlist((prev) => (prev.includes(code) ? prev : [...prev, code]));
  };

  const remove = (code: CurrencyCode) => {
    setWatchlist((prev) => prev.filter((c) => c !== code));
  };

  const toggle = (code: CurrencyCode) => {
    setWatchlist((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const contains = (code: CurrencyCode) => watchlist.includes(code);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, add, remove, toggle, contains }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx)
    throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
};
