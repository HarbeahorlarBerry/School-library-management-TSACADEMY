import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // prevents password from being returned in queries
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);