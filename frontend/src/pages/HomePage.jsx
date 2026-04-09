import React, { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import ExerciseCard from "../components/ExerciseCard";
import { userExerciseStore } from "../store/userExerciseStore";
import NavBar from "../components/NavBar";
import DateCard from "../components/DateCard";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const exercises = userExerciseStore((state) => state.exercises);
  const setExercises = userExerciseStore((state) => state.setExercises);
  const groupedExercises = userExerciseStore((state) => state.groupedExercises);

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

  const dates = Object.keys(groupedExercises);

  return (
    <div className="min-h-screen pb-20 ">
      <NavBar />

      {loading && (
        <div className="text-base text-center py-10">Loading Exercises</div>
      )}

      {exercises.length === 0 ? (
        <p>No Exercises Found</p>
      ) : (
        <div className="max-w7xl mx-auto p-2 mt-1 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dates.map((date) => (
              <DateCard key={date} date={date} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
