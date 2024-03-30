import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    currency: String,
    status: String,
    deliveryStatus: String,
    paymentIntentId: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    address: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);
