import React from "react";
import { Routes, Route, Navigate } from "react-router";

import { Loader } from "lucide-react";

// user
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
// exercises
import ExercisesPage from "./pages/ExercisesPage";
import UpdateExercisePage from "./pages/UpdateExercisePage";
import AddExercisePage from "./pages/AddExercisePage";
// workouts
import WorkoutsPage from "./pages/WorkoutsPage";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import StartWorkoutPage from "./pages/StartWorkoutPage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
// authPages
import LoginPage from "./pages/LoginPage";
import SignIn from "./pages/SignInPage";

// useAuthStore
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const { checkAuth, authUser, isAuthenticating } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticating && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-accent-content flex flex-col">
      <Toaster />

      <NavBar />

      <Routes>
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignIn />} />
        {/* User */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/updateProfile"
          element={
            authUser ? <UpdateProfilePage /> : <Navigate to={"/login"} />
          }
        />
        {/* Exercises */}
        <Route
          path="/exercises"
          element={authUser ? <ExercisesPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/addexercise"
          element={authUser ? <AddExercisePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/updateexercise"
          element={
            authUser ? <UpdateExercisePage /> : <Navigate to={"/login"} />
          }
        />
        
      </Routes>
    </div>
  );
};

export default App;
