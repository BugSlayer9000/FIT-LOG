import React, { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import ExerciseCard from "../components/ExerciseCard";
import toast from "react-hot-toast";
import { userExerciseStore } from "../store/userExerciseStore";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const exercises = userExerciseStore((state) => state.exercises);
  const setExercises = userExerciseStore((state) => state.setExercises);
  const searchQuery = userExerciseStore((state) => state.searchQuery);
  const deleteExercise = userExerciseStore((state) => state.deleteExercise)

  useEffect(() => {
    document.title = "HOME | FITLOG";

    const fetchNotes = async () => {
      try {
        const res = await api.get("/exercises");

        setExercises(res.data.data);
      } catch (error) {
        console.log("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [setExercises, setLoading]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/exercises/${id}`);
      deleteExercise(id)
      toast.success("Exercise Deleted");
    } catch (error) {
      console.log("Error in handle Delete", error);
      toast.error("Server Error");
    }
  };

  const filterdExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="text-base text-center py-10">Loading Exercises</div>
      )}

      {exercises.length === 0 ? (
        <p>No Exercises Found</p>
      ) : (
        <div className="max-w7xl mx-auto p-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterdExercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
