import mongoose, { mongo } from "mongoose";

const exerciseLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sets: [
    {
      weight: Number,
      reps: Number,
      time : Number,
    },
  ],
  notes: String,
});

const ExerciseLog = mongoose.model(`ExerciseLog`, exerciseLogSchema);

export default ExerciseLog;

