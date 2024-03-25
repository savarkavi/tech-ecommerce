"use server";

import Order from "../models/order";
import { connectDB } from "../mongoose";
import { ObjectId } from "mongodb";

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

export const getOrdersById = async (id: string) => {
  const fieldsToDeselect = {
    address: 0,
  };

  try {
    await connectDB();
    const res = await Order.find({ userId: id }, fieldsToDeselect);
    return JSON.parse(JSON.stringify(res));
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
    const res = await Order.find({}, fieldsToDeselect).populate({
      path: "userId",
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (id: string) => {
  const fieldsToDeselect = {
    address: 0,
  };

  try {
    await connectDB();
    const res = await Order.findOne({ _id: id }, fieldsToDeselect).populate({
      path: "products",
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderDelivery = async (id: string, status: string) => {
  const fieldsToDeselect = {
    address: 0,
  };

  try {
    await connectDB();
    const res = await Order.findByIdAndUpdate(
      id,
      { deliveryStatus: status },
      fieldsToDeselect
    ).populate({
      path: "userId",
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
