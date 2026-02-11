import express, { Router } from "express";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  getOneWorkout,
} from "../controllers/exercise.controller.js";

const router = express.Router();

// get all the Exercises
router.get("/", getExercises);

// get one Exercise
router.get("/exercise/:id", getOneWorkout);

// add an exercise
router.post("/", createExercise);

// update an Exercise
router.put("/:id", updateExercise);

// delete the exercise
router.delete("/:id", deleteExercise);

export default router;
