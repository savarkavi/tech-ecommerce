"use server";

import Product from "../models/product";
import User from "../models/user";
import { connectDB } from "../mongoose";

export const createProduct = async (product: any) => {
  try {
    await connectDB();
    const res = await Product.create(product);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
