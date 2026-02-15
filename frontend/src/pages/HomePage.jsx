import React, { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import ExerciseCard from "../components/ExerciseCard";
import toast from "react-hot-toast";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/exercises");
      console.log(res.data.data);

      setExercises(res.data.data);
    } catch (error) {
      console.log("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "HOME | FITLOG";
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    console.log("Handle delete runs", id);

    try {
      await api.delete(`/exercises/${id}`);
      toast.success("Exercise Deleted");
    } catch (error) {
      console.log("Error in handle Delete", error);
      toast.error("Server Error");
    }

    fetchNotes();
  };

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
            {exercises.map((exercise) => (
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
