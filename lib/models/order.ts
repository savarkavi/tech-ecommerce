import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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
        id: String,
        name: String,
        description: String,
        category: String,
        brand: String,
        quantity: Number,
        price: Number,
        selectedImage: {
          color: String,
          colorCode: String,
          image: String,
        },
      },
    ],
    address: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
