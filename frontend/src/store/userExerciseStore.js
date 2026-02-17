import { create } from "zustand";

export const userExerciseStore = create((set) => ({
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
}));
