import { create } from "zustand";
import toast from "react-hot-toast";
import api from "../lib/axios";

import { useWorkoutsStore } from "./useWorkoutsStore";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set) => ({
  authUser: null,
  isAuthenticating: false,
  isUpdating: false,
  isSigningUp: false,
  isLogginIn: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isAuthenticating: true });
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in check auth", error.message);
      set({ authUser: null });
    } finally {
      set({ isAuthenticating: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await api.post("/auth/login", data);
      console.log(res.data);
      set({ authUser: res.data });
      toast.success("Logged In successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogginIn: false });
    }
  },

  logout: async () => {
    const resetWorkouts = useWorkoutsStore.getState().resetWorkouts

    resetWorkouts()
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error in update profile/useAuthStore", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },
}));
