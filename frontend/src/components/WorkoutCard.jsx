import React, { useEffect } from "react";

import { userExercisesStore } from "../store/userExerciseStore";

const WorkoutCard = ({ workout }) => {
  const { exercises, fetchExercises } = userExercisesStore();

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);



  return (
    <div className="border p-1">
      <div className="border">
        <span>{workout.workoutName}</span>
        <div className="">
          {/* get all the exercises from exercises store */}
          {exercises.map((exercise) => {
            return (
              <div>
                {/* gets the workout array from the passed down workout */}
                {workout.exercises.map((exerciseId) => {
                  return (
                    <div>
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
        <span>{workout.updatedAt}</span>
      </div>
    </div>
  );
};

export default WorkoutCard;
