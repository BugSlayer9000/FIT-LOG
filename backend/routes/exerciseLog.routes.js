import express, { Router } from "express";
import {
  createALog,
  deleteLog,
  getAllLogs,
  getLatestLogForExercise,
  getLogsForOneExercise,
} from "../controllers/exerciseLog.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const ExerciseLogRouter = express.Router();

// get all logs
ExerciseLogRouter.get("/", protectRoute, getAllLogs);

// get the latest exercise log (must come before /:exerciseId)
ExerciseLogRouter.get(
  "/:exerciseId/latest",
  protectRoute,
  getLatestLogForExercise,
);

// get logs under exercise id
ExerciseLogRouter.get("/:exerciseId", protectRoute, getLogsForOneExercise);

// create a log
ExerciseLogRouter.post("/", protectRoute, createALog);

// delete a log
ExerciseLogRouter.delete("/:id", protectRoute, deleteLog);

export default ExerciseLogRouter;
