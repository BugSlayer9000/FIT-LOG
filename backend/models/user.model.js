import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  profilePic: {
    type: String,
  },
  birthday: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
