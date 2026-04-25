import express, { Router } from "express";
import {
  getAllWrokouts,
  createWorkout,
  deleteWorkout,
  getOneWorkout,
  updateWorkout,
} from "../controllers/workout.controller.js";

const WorkoutRouter = express.Router();

// Get all workouts
WorkoutRouter.get("/", getAllWrokouts);

// get OneWorkoutMethod if needed
WorkoutRouter.get("/:id", getOneWorkout);

// create a workout
WorkoutRouter.post("/", createWorkout);

//Update a a workout
WorkoutRouter.put("/:id", updateWorkout);

// delete a workout
WorkoutRouter.delete("/:id", deleteWorkout);

export default WorkoutRouter;
