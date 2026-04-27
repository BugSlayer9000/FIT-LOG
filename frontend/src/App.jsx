import React from "react";
import { Routes, Route } from "react-router";

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

const App = () => {
  return (
    <div className="relative h-full w-full">
      {/* TODO */}
      {/*Auth route needed for every route*/}

      <Routes>
        {/* User */}
        <Route path="/profile" element={<ProfilePage/>} /> 
        <Route path="/updateProfile" element={<UpdateProfilePage/>} />
        {/* Exercises */}
        <Route path="/exercises" element={<ExercisesPage/>} />
        <Route path="/addexercise" element={<AddExercisePage/>} />
        <Route path="/updateexercise" element={<UpdateExercisePage/>} />
        {/* workouts */}
        <Route path="/workouts" element={<WorkoutsPage/>} />
        <Route path="/addWorkouts" element={<AddWorkoutPage/>} />
        <Route path="/startWorkout" element={<StartWorkoutPage/>} />
        
      </Routes>
    </div>
  );
};

export default App;
