import React, { useEffect } from "react";

import { useExerciseLogStore } from "../store/useExerciseLogStore";



const ExerciseCard = ({ exercise }) => {

  const {fetchLogs, logs} = useExerciseLogStore()

  

  useEffect(() =>{
     fetchLogs()
  },[fetchLogs])

  console.log(logs);
  



  return (
    <div className="border border-primary bg-primary-focus/80 p-1">
      <div className="border flex flex-row justify-center items-center">
        <div className="">
          <span className="">{exercise.name}</span>
        </div>
        {/* Add the pesonal best sections and predicted sections once we add the user authentication and all */}
      </div>
    </div>
  );
};

export default ExerciseCard;
