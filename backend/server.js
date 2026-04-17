// entry point for the api

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import ExerciseRouter from "./routes/exercise.routes.js";
import WorkoutRouter from "./routes/workout.routes.js";
import ExerciseLogRouter from "./routes/exerciseLog.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/exercises", ExerciseRouter);
app.use("/api/workouts", WorkoutRouter)
app.use("/api/exerciseLogs", ExerciseLogRouter)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get(/.*/,(_,res) => {
    res.sendFile(path.resolve(__dirname,"frontend/dist/index.html"))
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
