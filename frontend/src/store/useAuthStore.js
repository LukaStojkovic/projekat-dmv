import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (err) {
      console.log("Error in checkAuth", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", userData);

      set({ authUser: res.data });
      toast.success("You created account successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("You logged out successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  login: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", userData);

      set({ authUser: res.data });
      toast.success("You logged in successfully");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
