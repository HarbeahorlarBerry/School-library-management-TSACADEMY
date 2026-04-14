import mongoose from "mongoose";

const attendantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Attendant", attendantSchema);