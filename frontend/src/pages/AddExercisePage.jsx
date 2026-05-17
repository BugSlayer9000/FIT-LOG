import React, { useState } from "react";
import { userExercisesStore } from "../store/userExerciseStore";
import { useNavigate } from "react-router-dom";

const AddExercisePage = () => {
  const navigate = useNavigate();

  const { addExercise } = userExercisesStore();

  const equipments = [
    "Barbell",
    "Dumbbell",
    "Cable",
    "Machine",
    "Bodyweight",
    "ResistanceBand",
    "Kettlebell",
    "EZBar",
    "SmithMachine",
    "Bench",
  ];

  const muscleGroups = [
    "Chest",
    "Lats",
    "Traps",
    "Rhomboids",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Forearms",
    "Quadriceps",
    "Hamstrings",
    "Glutes",
    "Calves",
    "Core",
  ];

  const categories = ["Compound", "Isolated"];

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    muscleGroup: "",
    equipment: "",
  });

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExercise(formData);
    console.log(formData);
    navigate("/exercises");
  };

  return (
    <div className="border h-screen flex flex-col justify-center align-middle border-t">
      <form className="form-control rounded-xl mx-5 p-2 bg-primary/50" onSubmit={handleSubmit}>
        <span className="mb-2 text-center text-xl font-thin">
          Enter your exercise details below
        </span>

        <span className="my-2 ml-4">Name</span>
        <input
          type="text"
          className="input bg-accent/50"
          required
          placeholder="name of the exercise"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <span className="my-2 ml-4">Category</span>
        <select
          className="select select-bordered bg-accent-content/80"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <span className="my-2 ml-4">Muscle Group</span>
        <select
          className="select select-bordered bg-accent-content/80"
          value={formData.muscleGroup}
          onChange={(e) =>
            setFormData({ ...formData, muscleGroup: e.target.value })
          }
        >
          <option value="" disabled>
            Select muscle group
          </option>
          {muscleGroups.map((muscle) => (
            <option key={muscle} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>

        <span className="my-2 ml-4">Equipment</span>
        <select
          className="select select-bordered bg-accent-content/80"
          value={formData.equipment}
          onChange={(e) =>
            setFormData({ ...formData, equipment: e.target.value })
          }
        >
          <option value="" disabled>
            Select equipment
          </option>
          {equipments.map((equipment) => (
            <option key={equipment} value={equipment}>
              {equipment}
            </option>
          ))}
        </select>
        <button
          className="btn my-5 w-2/3 mx-auto btn-accent"
          type="submit"
        >
          <span>Create Exercise </span>
        </button>
      </form>
    </div>
  );
};

export default AddExercisePage;
