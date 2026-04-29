import React, { useEffect, useState } from "react";
import { userExercisesStore } from "../store/userExerciseStore.js";
import ExerciseCard from "../components/ExerciseCard.jsx";

const ExercisesPage = () => {
  const { fetchExercises, exercises } = userExercisesStore();
  const [text, setText] = useState("");

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises, text]);

  const filtredExercises = exercises.reduce((acc, e) => {
    if (e.name.toLowerCase().includes(text.trim().toLocaleLowerCase())) {
      acc.push(e);
    }
    return acc;
  }, []);

  console.log(filtredExercises);

  console.log(exercises);

  return (
    <div>
      <div className="border p-4 mb-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <input
            type="text"
            className="input input-secondary w-full"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-secondary w-50">
            <span>Add Exercise</span>
          </button>
        </div>
      </div>
      <div className="border grid grid-cols-1 grid-rows-1 gap-4 p-3">
        <span className="text-xl font-bold font-mono">Exercises</span>
        <div className="border-b border-accent-focus p-1 flex flex-row justify-evenly items-center[&>span]:border [&>span]:text-lg">
          <span>Exercise</span>
          <span>Personal best</span>
          <span>Predicted</span>
        </div>
        {filtredExercises.length === 0
          ? exercises.map((e) => <ExerciseCard key={e._id} exercise={e} />)
          : filtredExercises.map((e) => (
              <ExerciseCard key={e._id} exercise={e} />
            ))}
      </div>
    </div>
  );
};

export default ExercisesPage;

// todo
// Add exercise functioanlity