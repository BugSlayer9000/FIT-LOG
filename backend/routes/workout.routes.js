import express, { Router } from "express";
import Workout from "../models/workout.model.js";
import mongoose from "mongoose";

const WorkoutRouter = express.Router();

// add a workout
WorkoutRouter.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    console.log("Error in fetching Workouts", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// get OneWorkoutMethod if needed
WorkoutRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

 

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({success:false, message:"Workout not found"})
    }
    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    console.log("Error in the getWorkout", error);
    res.status(404).json({ success: false, message: "Server Error" });
  }
});

// create a workout
WorkoutRouter.post("/", async (req, res) => {
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
});

export default WorkoutRouter;

//
