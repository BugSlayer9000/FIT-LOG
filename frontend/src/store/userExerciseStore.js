import { create } from "zustand";
import { formatDateV2 } from "../lib/utils";

const groupByDate = (exercises) => {
  return exercises.reduce((acc, curr) => {
    const date = formatDateV2(new Date(curr.createdAt));
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});
};

export const userExerciseStore = create((set) => ({
  exercises: [],
  groupedExercises: {},
  searchQuery: "",
  isLoading: false,

  setExercises: (exercises) =>
    set({ exercises, groupedExercises: groupByDate(exercises) }),

  addExercise: (exercise) =>
    set((state) => {
      const exercises = [...state.exercises, exercise];
      return { exercises, groupedExercises: groupByDate(exercises) };
    }),

  updateExercise: (updatedExercise) =>
    set((state) => {
      const exercises = state.exercises.map((ex) =>
        ex._id === updatedExercise._id ? updatedExercise : ex
      );
      return { exercises, groupedExercises: groupByDate(exercises) };
    }),

  deleteExercise: (id) =>
    set((state) => {
      const exercises = state.exercises.filter((ex) => ex._id !== id);
      return { exercises, groupedExercises: groupByDate(exercises) };
    }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (value) => set({ isLoading: value }),
}));