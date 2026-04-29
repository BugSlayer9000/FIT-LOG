import express, { Router } from "express";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  getOneExercise,
} from "../controllers/exercise.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const ExerciseRouter = express.Router();

// get all the Exercises
ExerciseRouter.get("/",protectRoute, getExercises);

// get one Exercise
ExerciseRouter.get("/:id", protectRoute,getOneExercise);

// add an exercise
ExerciseRouter.post("/", protectRoute,createExercise);

// update an Exercise
ExerciseRouter.put("/:id", protectRoute,updateExercise);

// delete the exercise
ExerciseRouter.delete("/:id", protectRoute,deleteExercise);

export default ExerciseRouter;
