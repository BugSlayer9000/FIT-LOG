import React, { useState } from "react";
import { useEffect } from "react";
import api from "../lib/axios";
import ExerciseCard from "../components/ExerciseCard";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "HOME | FITLOG";

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

    fetchNotes();
  }, []);

  console.log("is array", Array.isArray(exercises));
  return (
    <div className="min-h-screen">
      {loading && (
        <div className="text-base text-center py-10">Loading Exercises</div>
      )}

      {exercises.length === 0 ? (
        <p>No Exercises Found</p>
      ) : (
        <div  className="[border:1px_solid_white] max-w7xl mx-auto p-4 mt-6">
          <div className="[border:1px_solid_white] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} exercise={exercise}/>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
