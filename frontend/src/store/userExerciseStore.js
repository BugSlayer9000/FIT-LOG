import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

export const userExercisesStore = create((set,get) => ({
  // states
  exercises: [],
  selectedExercise: [],
  isLoading: null,
  isSaving: null,

  // functions

  fetchExercises: async () => {
    if (get().exercises.length > 0) return;

    set({ isLoading: true });
    try {
      const res = await api.get("/exercises");
      const data = res.data.data;
      set({ exercises: data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getExerciseById : async (id) => {
    set({isLoading:true})
    try {
      const res = await api.get(`/exercises${id}`)
      res.data.data

    } catch (error) {
      toast.error("Error Try again")
      console.log("Error",error);
      
    }
  }
}));
