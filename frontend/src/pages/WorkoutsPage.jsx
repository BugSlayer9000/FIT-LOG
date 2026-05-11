import React, { useEffect } from "react";
import { Loader } from "lucide-react";

import { useWorkoutsStore } from "../store/useWorkoutsStore";

import WorkoutCard from "../components/WorkoutCard";

const WorkoutsPage = () => {
  const { workouts, isLoading, fetchWorkouts} = useWorkoutsStore();

  useEffect(() => {
    fetchWorkouts();
    
  }, [fetchWorkouts]);

  
  
  

  return (
    <div className="h-full">
      {isLoading ? (
        <div className=" min-h-screen flex flex-col justify-center items-center">
          <Loader className="animate-spin" size={40} />
          <span className="text-xl mt-3">Loading...</span>
        </div>
      ) : (
        <>
          <div
            className="border-secondary p-4 flex justify-evenly items-center m-2 mt-4 rounded-2xl bg-secondary/20 
      [&>button]:btn 
      [&>button]:btn-primary 
      "
          >
            <button>Create a workout</button>
            <button>Start a workout</button>
          </div>
          <div className="border-secondary p-4 flex flex-col justify-evenly items-center m-2 mt-4 rounded-2xl bg-secondary/20">
            <span className="font-bold text-xl mr-auto ml-4">
              Your Workouts
            </span>
            <div className="border m-2 p-2 w-full border-teal-500/25 rounded-xl grid grid-cols-2 gap-4">
              {workouts.map((workout) => {
                return <WorkoutCard key={workout._id} workout={workout} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutsPage;
