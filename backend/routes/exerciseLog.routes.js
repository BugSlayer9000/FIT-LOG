import express, { Router } from "express";
import {
  createALog,
  deleteLog,
  getAllLogs,
  getLatestLogForExercise,
  getLogsForOneExercise,
} from "../controllers/exerciseLog.controller.js";

const ExerciseLogRouter = express.Router();

// get all logs
ExerciseLogRouter.get("/", getAllLogs);

// get logs under exercise id
ExerciseLogRouter.get("/:exerciseId", getLogsForOneExercise);

// create a log
ExerciseLogRouter.post("/", createALog);

// delete a log
ExerciseLogRouter.delete("/:id", deleteLog);

// get the latest exercise log
ExerciseLogRouter.get("/:exerciseId/latest", getLatestLogForExercise);

export default ExerciseLogRouter;
