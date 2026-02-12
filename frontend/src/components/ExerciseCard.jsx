import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      to={`/exercise/${exercise._id}`}
      className="card bg-primary shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title font-bold">{exercise.name}</h2>
        <p className="text-xl font-mono">Sets : {exercise.sets}</p>
        <p className="text-xl font-mono">Reps : {exercise.reps}</p>
        <p className="text-xl font-mono">Wight : {exercise.weight} KG</p>
        <p className="text-xl font-mono">
          First did Date : {formatDate(new Date(exercise.createdAt))}
        </p>
        <p className="text-xl font-mono">
          Last did Date : {formatDate(new Date(exercise.updatedAt))}
        </p>
      </div>
    </Link>
  );
};

export default ExerciseCard;
