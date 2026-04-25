import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutName: {
      type: String,
      required: true,
    },
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
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
