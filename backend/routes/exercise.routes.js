import express, { Router } from "express";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  getOneExercise,
} from "../controllers/exercise.controller.js";

const ExerciseRouter = express.Router();

// get all the Exercises
ExerciseRouter.get("/", getExercises);

// get one Exercise
ExerciseRouter.get("/:id", getOneExercise);

// add an exercise
ExerciseRouter.post("/", createExercise);

// update an Exercise
ExerciseRouter.put("/:id", updateExercise);

// delete the exercise
ExerciseRouter.delete("/:id", deleteExercise);

export default ExerciseRouter;
