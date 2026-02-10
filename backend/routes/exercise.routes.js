import express, { Router } from "express";
import mongoose from "mongoose";
import Exercise from "../models/exercise.model.js";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercise.controller.js";

const router = express.Router();

// get all the Exercises
router.get("/", getExercises);

// add an exercise
router.post("/", createExercise);

// update an Exercise
router.put("/:id", updateExercise);

// delete the exercise
router.delete("/:id", deleteExercise);

export default router;
