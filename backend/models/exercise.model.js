import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    muscleGroup: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
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
