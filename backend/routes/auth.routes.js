import express, { Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateToken } from "../lib/utils.js";

const userAuth = express.Router();

// sign in
userAuth.post("/signup", async (req, res) => {
  const { fullname, email, password, workouts, weight, height, profilePic } =
    req.body;

  try {
    if ((!fullname, !email, !password)) {
      return res.status(400).json({ message: "all fields are required" });
    }

    console.log(password);

    if (!password.length > 6) {
      return res
        .status(400)
        .json({ message: "password must be more than 6 charachters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "mail already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // new user genarated
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      workouts,
      weight,
      height,
      profilePic,
    });

    if (newUser) {
      await newUser.save();
      genarateToken(newUser._id, res);

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        emai: newUser.email,
        workouts: newUser.workouts,
        weight: newUser.weight,
        height: newUser.height,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
});
// ✅ passed in postman



export default userAuth;
