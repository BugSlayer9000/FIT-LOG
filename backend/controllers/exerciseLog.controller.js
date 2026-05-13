import ExerciseLog from "../models/exerciseLog.model.js";
import mongoose from "mongoose";

export const getAllLogs = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user._id;

    console.log("User id expected", req.user._id);

    const logs = await ExerciseLog.find().sort({
      date: -1,
    });

    const filteredLogs = logs.filter(
      (log) => log.user && log.user.toString() === userId.toString(),
    );

    console.log("length", filteredLogs.length);

    res.status(200).json({ success: true, data: filteredLogs });
  } catch (error) {
    console.log("Error in getAllLogs", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getLogsForOneExercise = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const logs = await ExerciseLog.find({ exercise: exerciseId });
    if (!logs) {
      return res
        .status(404)
        .json({ success: false, message: "Logs are not found" });
    }
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.log("Error in get log", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createALog = async (req, res) => {
  const log = req.body;

  // add user validation here
  if (!log.exercise || !log.date || !log.sets) {
    return res
      .status(500)
      .json({ success: false, message: "Please fill all the fields" });
  }

  const newLog = new ExerciseLog(log);

  try {
    await newLog.save();
    res.status(200).json({ success: true, data: newLog });
  } catch (error) {
    console.log("Error in LogCreate");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteLog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Log id not found" });
  }

  try {
    await ExerciseLog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Log Deleted" });
  } catch (error) {
    console.log("Error in log delete");
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getLatestLogForExercise = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const logs = await ExerciseLog.find({ exercise: exerciseId }).sort({
      date: -1,
    });

    if (!logs) {
      return res
        .status(404)
        .json({ success: false, message: "Log is not found" });
    }
    res.status(200).json({ success: true, data: logs[0] });
  } catch (error) {
    console.log("Error in get log", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
