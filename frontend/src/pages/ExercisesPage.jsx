import React, { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import ExerciseCard from "../components/ExerciseCard";
import { userExerciseStore } from "../store/userExerciseStore";
import NavBar from "../components/NavBar";
import DateCard from "../components/DateCard";

const ExercisesPage = () => {
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
    <div className="min-h-screen pb-20 bg-gradient-to-b from-neutral to-accent-content">
      <NavBar />

      {loading && (
        <div className="text-base text-center py-10">Loading Exercises</div>
      )}

      {exercises.length === 0 ? (
        <p>No Exercises Found</p>
      ) : (
        <div className="max-w7xl p-2 mt-1">
          <div className="grid  grid-cols-1 gap-6 md:flex items-center justify-center">
            {dates.map((date) => (
              <DateCard key={date} date={date} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisesPage;
