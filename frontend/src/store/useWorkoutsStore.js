import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const useWorkoutsStore = create((set) => ({
  // states
  workouts: [],
  isLoading: false,

  // functions
  fetchWorkouts: async () => {


    set({ isLoading: true });
    try {
      const res = await api("/workouts");
      const data = res.data.data;
      set({ workouts: data });
    } catch (error) {
      toast.error("Something went wrong. Try again Later");
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
