import express, { Router } from "express";
import mongoose from "mongoose";
import Exercise from "../models/exercise.model.js";

const router = express.Router();

// get all the Exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json({ success: true, data: exercises });
  } catch (error) {
    console.log("Error in fetching products");
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// add an exercise
router.post("/", async (req, res) => {
  const exercise = req.body; // the user will pass this

  if (!exercise.name || !exercise.sets || !exercise.reps || !exercise.weight) {
    return res
      .status(200)
      .json({ success: false, message: "Please fill all fields" });
  }

  const newExercise = new Exercise(exercise);

  try {
    await newExercise.save();
    res.status(201).json({ success: true, message: newExercise });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(501).json({ success: false, message: "Server Error" });
  }
});

// update an Exercise
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const exercise = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Server Error" });
  }

  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(id, exercise, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedExercise });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// delete the exercise 
router.delete("/:id", async (req,res) => {
    const {id} = req.params

    try {
        await Exercise.findByIdAndDelete(id)
        res.status(200).json({success : true, message : "Exercise Deleted"})
    } catch (error) {
        console.log("Error in deleting product", error);
        res.status(404).json({success : false, message : "Exercise not found"})
    }
})

export default router;
