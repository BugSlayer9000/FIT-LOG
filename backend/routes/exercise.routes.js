import express, { Router } from "express";
import mongoose from "mongoose";
import Exercise from "../models/exercise.model";

const router = express.Router();

// get all the Exercises
router.get("/", async (req, res) => {
    try {
        const exercises = await Exercise.find()
        res.status(200).json({success : true, data:exercises})
    } catch (error) {
        console.log("Error in fetching products");
        res.status(500).json({success:false, message : "Server Error"})
    }
})


export default router