import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

import { useAuthStore } from "./useAuthStore";

export const useWorkoutsStore = create((set, get) => ({
  // states
  workouts: [],
  workoutIds: [],
  isLoading: false,

  getWorkoutIds: () => {
    const authUser = useAuthStore.getState().authUser;
    const ids = authUser?.workouts ?? [];

    set({ workoutIds: ids });
    return ids;
  },

  resetWorkouts: async () => {
    set({ workouts: [] });
    set({ workoutIds: [] });

    console.log(get().workouts);
  },

  // functions
  fetchWorkouts: async () => {
    set({ isLoading: true, workouts: [] });

    const workoutIds = get().getWorkoutIds();

    try {
      const workouts = await Promise.allSettled(
        workoutIds.map(async (id) => {
          const res = await api.get(`/workouts/${id}`);

          return res.data.data;
        }),
      );

      const successfulWorkouts = workouts
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      set({ workouts: successfulWorkouts });
    } catch (error) {
      toast.error("Something went wrong. Try again Later");
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
