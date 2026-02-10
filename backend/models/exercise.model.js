import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Exercise = mongoose.model(`Exercise`, exerciseSchema);
// this basically says to mongoose this is how you should make a collection called a product and this is the schema you use for that.

export default Exercise;
