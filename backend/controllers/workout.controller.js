import Workout from "../models/workout.model.js";
import mongoose from "mongoose";

export const getAllWrokouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    console.log("Error in fetching Workouts", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOneWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Workout Id" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      console.log("Workout not found");
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    console.log("Error in the getWorkout", error);
    res.status(404).json({ success: false, message: "Server Error" });
  }
};

export const createWorkout = async (req, res) => {
  const workout = req.body;

  if (!workout.workoutName || !workout.exercises) {
    return res
      .status(500)
      .json({ success: false, message: "Please Fill all the fields" });
  }

  const newWorkout = new Workout(workout);

  try {
    await newWorkout.save();
    res.status(200).json({ success: true, data: newWorkout });
  } catch (error) {
    console.log("Error in CreateWorkout", error);
    res.status(501).json({ success: false, message: "Server Error" });
  }
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Workout Id" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      console.log("workout not found");
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedWorkout });
  } catch (error) {
    console.log("Error in workout updateWorkout", error);
    res.status(501).json({ success: false, message: "Server Error" });
  }
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid Workout Id" });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      res.status(404).json({ success: false, message: "Workout not found" });
    }

    await workout.deleteOne();
    res.status(200).json({ success: true, message: "Workout Deleted" });
  } catch (error) {
    console.log("Error in the workoutDelete", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
