import express, { json, Router } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateToken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  signin,
  login,
  logout,
  updateProfile,
  chekcAuth,
} from "../controllers/auth.controller.js";

const userAuth = express.Router();

// sign up
userAuth.post("/signup", signin);

// login
userAuth.post("/login", login);

// logout
userAuth.post("/logout", logout);

// updateProfile
userAuth.put("/update-profile", protectRoute, updateProfile);

userAuth.get("/check", protectRoute, chekcAuth);

export default userAuth;
