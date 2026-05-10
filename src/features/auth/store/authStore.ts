import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  error: string | null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  error: null,

  login: (email, password) => {
    if (email === "admin@gmail.com" && password === "Admin@1234") {
      set({ isAuthenticated: true, error: null });
    } else {
      set({ error: "Invalid email or password" });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, error: null });
  },
}));
