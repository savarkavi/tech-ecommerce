import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    clerkId: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    role: {
      type: String,
      default: "USER",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);
