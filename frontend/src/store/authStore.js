import { create } from "zustand";
import api from "../utils/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  auth: null,
  isSignup: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");

      set({ auth: res.data.data });
    } catch (error) {
      console.error(error);
      set({ auth: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },
  userSignup: async (newUser) => {
    set({ isSignup: true });
    try {
      const res = await api.post("/auth/signup", newUser);
      set({ auth: res.data.data });

      if (!res.data.data) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignup: false });
    }
  },
  userLogin: async (user) => {
    set({ isLogin: true });
    try {
      const res = await api.post("/auth/login", user);
      set({ auth: res.data.data });

      if (!res.data.data) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogin: false });
    }
  },
  userLogout: async () => {
    try {
      const res = await api.post("/auth/logout");
      set({ auth: null });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (updatedProfile) => {
    set({ isUpdateProfile: true });
    try {
      const res = await api.put("/auth/update-profile", updatedProfile);
      set({ auth: res.data.data });

      if (!res.data.data) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },
}));
