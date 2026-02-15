import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import { calculateVolume } from "../lib/utils";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import Alert from "./Alert";
import { useState } from "react";

const ExerciseCard = ({ exercise, onDelete }) => {

  const [showAlert, setShowAlert] = useState(false)

  const handleDecision = (result) => {
    if(result){
      onDelete(exercise._id)
    } else{
      showAlert(false)
    }
  }

  if (showAlert) {
    return <Alert message={"Are you sure ? "} onDecision={handleDecision}/>
  }

  

  return (
    <div to={`/exercise/${exercise._id}`} className="card bg-neutral shadow-xl">
      <div className="card-body">
        <h2 className="card-title font-bold justify-center pb-4 text-center">
          {exercise.name}
        </h2>
        <p className="card text-xl font-mono">
          {exercise.sets} sets x {exercise.reps} reps x {exercise.weight} KGs
        </p>
        <p className="text text-xl">
          Volume :{" "}
          {calculateVolume(
            exercise.sets,
            exercise.reps,
            exercise.weight,
          ).toLocaleString()}{" "}
          KGs{" "}
        </p>
        <p className="text text-xl">
          Date : {formatDate(new Date(exercise.updatedAt))}
        </p>
        <div className="card-actions justify-end pt-2">
          <button
            className="btn btn-error btn-outline"
            onClick={() => {
              setShowAlert(true)
            }}
          >
            <FaTrash size={18} />
            Delete
          </button>
          <button className="btn btn-info btn-outline">
            <AiFillEdit size={19} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
