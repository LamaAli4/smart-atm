import type { Transaction, User } from "@/types/user";

const API_BASE_URL = "https://6905f0b7ee3d0d14c1343396.mockapi.io/users";
export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export const loginUser = async (
  username: string,
  pin: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?user_name=${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: "Invalid username or PIN. Please try again.",
        };
      }
      throw new Error(`API error: ${response.status}`);
    }

    const users: User[] = await response.json();
    const user = users.find((u) => u.user_name === username);

    if (!user || user.pin !== pin) {
      return {
        success: false,
        error: "Invalid username or PIN. Please try again.",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Unable to connect to the server. Please check your connection.",
      };
    }

    if (error instanceof Error && error.message.includes("429")) {
      return {
        success: false,
        error: "API limit reached. Try again later.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};

export const fetchUser = async (userId: number): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    return null;
  }
};

export const updateUser = async (userId: number, data: Partial<User>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to update user");

    return await response.json();
  } catch (error) {
    console.error("Update user error:", error);
    return null;
  }
};

export const fetchUserTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/transactions`);
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return await response.json();
  } catch (error) {
    console.error("Fetch user transactions error:", error);
    return [];
  }
};

export const addTransaction = async (
  userId: string,
  data: Omit<Transaction, "id">
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to add transaction");
    return await response.json();
  } catch (error) {
    console.error("Add transaction error:", error);
    return null;
  }
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${userId}/transactions/${transactionId}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to delete transaction");

    console.log("Transaction deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};

export const clearUserTransactions = async (userId: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${userId}/transactions`);
    if (!res.ok) throw new Error("Failed to fetch transactions");

    const transactions = await res.json();

    for (const t of transactions) {
      await deleteTransaction(userId, t.id);
      await new Promise((resolve) => setTimeout(resolve, 200)); 
    }

    return true;
  } catch (error) {
    console.error("Error clearing transactions:", error);
    return false;
  }
};
