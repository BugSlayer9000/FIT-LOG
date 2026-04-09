import { create } from "zustand";
import { formatDateV2 } from "../lib/utils";

export const userExerciseStore = create((set, get) => ({
  // states
  exercises: [],
  searchQuery: "",
  isLoading: false,

  // actions
  setExercises: (exercises) => set({ exercises }),

  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),

  updateExercise: (updatedExercise) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex._id === updatedExercise._id ? updatedExercise : ex,
      ),
    })),

  deleteExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.filter((ex) => ex._id !== id),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setLoading: (value) => set({ isLoading: value }),

  filterExerciseBydate: (exercises) => {
    exercises.reduce((acc, curr) => {
      let date = formatDateV2(new Date(curr.createdAt));

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
    
  },
}));
