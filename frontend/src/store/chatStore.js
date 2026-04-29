import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../utils/axios";
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoad: false,
  isMessageLoad: false,

  getUsers: async () => {
    set({ isUserLoad: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoad: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoad: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoad: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(
        `/message/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // only refresh for the sender and its receiver
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
