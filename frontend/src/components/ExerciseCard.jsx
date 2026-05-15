import React, { useEffect } from "react";

import { useExerciseLogStore } from "../store/useExerciseLogStore";

const ExerciseCard = ({ exercise }) => {
  const { fetchLogs, logs } = useExerciseLogStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // array of objects
  console.log(logs);

  const matchedLog = logs.find((log) => log.exercise === exercise._id);

  const sets = matchedLog ? matchedLog.sets : [];

  const weightsArray = sets.map((set) => set.weight);

  const pr = weightsArray.reduce((acc, num) => {
    return acc > num ? acc : num;
  }, 0);

  console.log(pr);

  return (
    <div className=" border-primary bg-primary-focus/80 p-1 rounded-xl">
      <div className=" grid-cols-3 flex justify-between [&>div]:flex [&>div]:justify-center ">
        <div className=" flex-1">
          <span className="">{exercise.name}</span>
        </div>
        <div className=" flex-1 ">
          <span>{pr === 0 ? "Non" : `${pr} Kgs`}</span>
        </div>
        <div className=" flex-1">
          <span>Not added</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
