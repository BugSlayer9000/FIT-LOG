import React, { useEffect } from "react";
import { userExercisesStore } from "../store/userExerciseStore.js";
import ExerciseCard from "../components/ExerciseCard.jsx";

const ExercisesPage = () => {
  const { fetchExercises, exercises } = userExercisesStore();

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  console.log(exercises);

  return (
    <div className="border grid grid-cols-1 grid-rows-1 gap-4 p-3">
      {exercises.map((e) => (
        <ExerciseCard key={e._id} exercise={e} />
      ))}
    </div>
  );
};

export default ExercisesPage;
