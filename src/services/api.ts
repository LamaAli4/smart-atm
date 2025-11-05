import type { User } from "@/types/user";

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
