import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import { calculateVolume } from "../lib/utils";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Alert from "./Alert";
import { useState } from "react";

const ExerciseCard = ({ exercise, onDelete }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDecision = (result) => {
    if (result) {
      onDelete(exercise._id);
    } else if (!result) {
      setShowAlert(false);
    }
  };

  return (
    <div
      to={`/exercise/${exercise._id}`}
      className="card bg-neutral shadow-xl relative"
    >
      {showAlert && (
        <div className="absolute inset-0 flex z-50">
          <Alert message={"Are you sure ? "} onDecision={handleDecision} />
        </div>
      )}
      <div className="card-body p-4">
        <h2 className="card-title text-2xl font-bold justify-center pb-1 text-center">
          {exercise.name}
        </h2>
        <p className="card text-xl font-mono">
          {exercise.sets} sets x {exercise.reps} reps x {exercise.weight} KGs
        </p>
        <p className="text text-lg">
          Volume :{" "}
          {calculateVolume(
            exercise.sets,
            exercise.reps,
            exercise.weight,
          ).toLocaleString()}{" "}
          KGs{" "}
        </p>
        <p className="text text-sm">
          Date : {formatDate(new Date(exercise.updatedAt))}
        </p>
        <div className="card-actions justify-center items-center pt-2">
          <button
            className="btn btn-error btn-outline flex-1"
            onClick={() => {
              setShowAlert(true);
            }}
          >
            <FaTrash size={18} />
            Delete
          </button>
          <Link
            className="btn btn-info btn-outline flex-1"
            to={`exercise/${exercise._id}`}
          >
            <AiFillEdit size={19} />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
