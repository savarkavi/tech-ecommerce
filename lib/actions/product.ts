"use server";

import Product from "../models/product";
import User from "../models/user";
import { connectDB } from "../mongoose";

type ImageType = {
  color: string;
  colorCode: string;
  image: string;
};

type ProductParams = {
  name: string;
  desc: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: ImageType[];
};

export const createProduct = async (product: ProductParams) => {
  try {
    await connectDB();
    const res = await Product.create(product);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
