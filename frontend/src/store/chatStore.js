import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../utils/axios";

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

      toast.success(res.data.messages);
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

      toast.success(res.data.message);
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

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
