import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    bio: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Author", authorSchema);