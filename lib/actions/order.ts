"use server";

import Order from "../models/order";
import { connectDB } from "../mongoose";

export const updateOrder = async (intentId: string, address: any) => {
  try {
    await connectDB();
    await Order.findOneAndUpdate(
      { paymentIntentId: intentId },
      { status: "complete", address: address }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  const fieldsToDeselect = {
    address: 0,
  };

  try {
    await connectDB();
    const res = await Order.find({}, fieldsToDeselect);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
