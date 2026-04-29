import React from "react";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="border border-primary bg-primary-focus/80 card">
      <div className="card-body">
        <div className="boder">
          <span>{exercise.name}</span>
        </div>
        <span>{exercise.category}</span>
      </div>
    </div>
  );
};

export default ExerciseCard;
