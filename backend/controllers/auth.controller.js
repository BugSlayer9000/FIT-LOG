import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateToken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";

export const signin = async (req, res) => {
  const { fullname, email, password, workouts, weight, height, birthday } =
    req.body;

  try {
    if (!fullname || !email || !password) {
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
      birthday,
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
        birthday: newUser.birthday,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password Incorrect" });
    }

    genarateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      emai: user.email,
      workouts: user.workouts,
      weight: user.weight,
      height: user.height,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in the login controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in the logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { weight, height, profilePic } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic,
        weight,
        height,
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error  in the Update Profile Pic", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const chekcAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in CheckAuthController");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
