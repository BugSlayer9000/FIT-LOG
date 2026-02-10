import Exercise from "../models/exercise.model.js";
import mongoose from "mongoose";

export const getExercises = async (_req, res) => {
  try {
    const exercises = await Exercise.find().sort({createdAt : -1});
    res.status(200).json({ success: true, data: exercises });
  } catch (error) {
    console.log("Error fetching the products", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOneWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Exercise ID" });
  }

  try {
    const exercise = await Exercise.findById(id);
    res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    console.log("Error in getOneWorkout fetching the Exercise", error);
    res.status(501).json({ success: false, message: "Server Error" });
  }
};

export const createExercise = async (req, res) => {
  const exercise = req.body;

  if (!exercise.name || !exercise.sets || !exercise.reps || !exercise.weight) {
    return res
      .status(200)
      .json({ success: false, message: "Please fill all fields" });
  }

  const newExercise = new Exercise(exercise);

  try {
    await newExercise.save();
    res.status(201).json({ success: true, message: newExercise });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(501).json({ success: false, message: "Server Error" });
  }
};

export const updateExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Exercise ID" });
  }

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(id, exercise, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedExercise });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Exercise ID" });
  }

  try {
    await Exercise.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Exercise Deleted" });
  } catch (error) {
    console.log("Error in deleting product", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
