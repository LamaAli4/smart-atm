import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginUser, fetchUser } from "@/services/api";
import type { User } from "@/types/user";

interface AuthContextType {
  isLogged: boolean;
  login: (
    username: string,
    pin: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  user: User | null;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "userId";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const savedUserId = localStorage.getItem(AUTH_KEY);

      if (!savedUserId) {
        setLoading(false);
        return;
      }

      setIsLogged(true);
      const userId = parseInt(savedUserId, 10);

      try {
        const userData = await fetchUser(userId);
        if (userData) {
          setUser(userData);
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setIsLogged(false);
            localStorage.removeItem(AUTH_KEY);
          }
        }
      } catch {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, pin: string) => {
    try {
      const result = await loginUser(username, pin);

      if (result.success && result.user) {
        setIsLogged(true);
        setUser(result.user);
        localStorage.setItem(AUTH_KEY, result.user.id.toString());
        localStorage.setItem("user", JSON.stringify(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = () => {
    setIsLogged(false);
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
        loading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
