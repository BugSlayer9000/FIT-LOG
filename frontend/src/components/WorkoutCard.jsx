import React, { useEffect } from "react";

import { userExercisesStore } from "../store/userExerciseStore";
import { formatDateV2 } from "../lib/utils";

const WorkoutCard = ({ workout }) => {
  const { exercises, fetchExercises } = userExercisesStore();

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <button className="bg-primary/40 border-primary rounded-lg  flex">
      <div className=" flex flex-col p-2 min-w-full justify-start">
        <div className="flex" >
          <span className="text-xl text-left  text-zinc-300 ml-1 ">
          {workout.workoutName}
        </span>
        </div>
        <div className="border border-primary-content/50 mt-2 p-2 bg-primary-content/40 rounded-md">
          {/* get all the exercises from exercises store */}
          {exercises.map((exercise) => {
            return (
              <div>
                {/* gets the workout array from the passed down workout */}
                {workout.exercises.map((exerciseId) => {
                  return (
                    <div className=" flex">
                      <span>
                        {exerciseId === exercise._id ? (
                          <div>{exercise.name}</div>
                        ) : (
                          <div className="hidden"></div>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <span className="text-gray-200 mt-2 ml-1 flex">
          Last Done - {formatDateV2(new Date(workout.updatedAt))}
        </span>
      </div>
    </button>
  );
};

export default WorkoutCard;
