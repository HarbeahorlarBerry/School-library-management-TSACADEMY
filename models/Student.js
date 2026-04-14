import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },

    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Student", studentSchema);