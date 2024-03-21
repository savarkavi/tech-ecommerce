"use server";

import Product from "../models/product";
import { connectDB } from "../mongoose";
import { ObjectId } from "mongodb";

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

export const getProducts = async () => {
  const fieldsToDeselect = {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  };

  try {
    await connectDB();
    const res = await Product.find({}, fieldsToDeselect).populate({
      path: "reviews",
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
  const fieldsToDeselect = {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  };

  try {
    await connectDB();
    const res = await Product.findById(
      new ObjectId(id),
      fieldsToDeselect
    ).populate({ path: "reviews", populate: { path: "userId" } });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByQuery = async (query: string) => {
  try {
    await connectDB();
    const res = await Product.find({
      name: { $regex: query, $options: "i" },
    }).populate({ path: "reviews" });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategory = async (cat: string) => {
  try {
    await connectDB();
    const res = await Product.find({ category: cat }).populate({
      path: "reviews",
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const updateProductStockStatus = async (id: string) => {
  try {
    await connectDB();
    const res = await Product.findById(id);
    await Product.findByIdAndUpdate(id, { inStock: !res.inStock });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};
