import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useExerciseLogStore = create((set) => ({
  // states
  logs: [],
  isLoading: false,
  isSaving: false,

  // functions

  fetchLogs: async () => {
    set({ isLoading: true, logs: [] });

    try {
      const res = await api.get("/exerciseLogs");
      const data = res.data.data;
      console.log("expected logs ", data);

      set({ logs: data });
      console.log("Exercise Logs imported successfully");
    } catch (error) {
      toast.error("Error Try again later");
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
