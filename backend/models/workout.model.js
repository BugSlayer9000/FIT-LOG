import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    exercises: [
      {
        exercise: { type: String, required: true },
        sets: [{ weight: Number, reps: Number }],
      },
    ],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.model(`Workout`, workoutSchema);

export default Workout;
