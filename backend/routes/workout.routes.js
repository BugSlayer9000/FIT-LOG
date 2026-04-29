import express, { Router } from "express";
import {
  getAllWrokouts,
  createWorkout,
  deleteWorkout,
  getOneWorkout,
  updateWorkout,
} from "../controllers/workout.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const WorkoutRouter = express.Router();

// Get all workouts
WorkoutRouter.get("/", protectRoute, getAllWrokouts);

// get OneWorkoutMethod if needed
WorkoutRouter.get("/:id", protectRoute, getOneWorkout);

// create a workout
WorkoutRouter.post("/", protectRoute, createWorkout);

//Update a a workout
WorkoutRouter.put("/:id", protectRoute, updateWorkout);

// delete a workout
WorkoutRouter.delete("/:id", protectRoute, deleteWorkout);

export default WorkoutRouter;
