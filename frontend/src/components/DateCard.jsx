import React from "react";
import ExerciseCard from "./ExerciseCard";
import { userExerciseStore } from "../store/userExerciseStore";
import toast from "react-hot-toast";
import api from "../lib/axios";

function DateCard({ date }) {
  const searchQuery = userExerciseStore((state) => state.searchQuery);
  const deleteExercise = userExerciseStore((state) => state.deleteExercise);
  const groupedExercises = userExerciseStore((state) => state.groupedExercises);

  const dateforExercises = groupedExercises[date] || [];

  const filteredExercises = dateforExercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDelete = async (id) => {
    try {
      await api.delete(`/exercises/${id}`);
      deleteExercise(id);
      toast.success("Exercise Deleted");
    } catch (error) {
      console.log("Error in handle Delete", error);
      toast.error("Server Error");
    }
  };

  return (
    <div>
      {filteredExercises.length === 0 ? (
        <p>No exercises found</p>
      ) : (
        <div className="card m-2 border border-accent p-2 bg-accent/50">
          <div className="card-title text-xl text-primary-content">
            <p>Date - {date}</p>
          </div>
          <div className=" flex flex-col gap-4 p-2">
            {filteredExercises.map((exercise) => {
              return (
                <ExerciseCard
                  key={exercise._id}
                  exercise={exercise}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateCard;
