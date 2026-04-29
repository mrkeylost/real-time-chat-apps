import { create } from "zustand";
import api from "../utils/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  auth: null,
  isSignup: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/check");

      set({ auth: res.data.data });
      get().socketConnect();
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
      if (!res.data.data) {
        return toast.error(res.data.message);
      }

      set({ auth: res.data.data });
      toast.success(res.data.message);

      get().socketConnect();
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
      if (!res.data.data) {
        return toast.error(res.data.message);
      }

      set({ auth: res.data.data });
      toast.success(res.data.message);

      get().socketConnect();
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

      get().socketDisconnect();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (updatedProfile) => {
    set({ isUpdateProfile: true });
    try {
      const res = await api.put("/auth/update-profile", updatedProfile);
      if (!res.data.data) {
        return toast.error(res.data.message);
      }

      set({ auth: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },

  socketConnect: () => {
    const { auth } = get();
    if (!auth || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: auth._id,
      },
    });
    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  socketDisconnect: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
