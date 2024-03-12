import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
