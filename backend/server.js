// entry point for the api

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import router from "./routes/exercise.routes.js";

dotenv.config();

const app = express()

app.use(express.json());

app.use("/api/exercises", router)

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
    
})