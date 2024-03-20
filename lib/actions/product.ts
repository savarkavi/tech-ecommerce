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
    const res = await Product.find({}, fieldsToDeselect);
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
    const res = await Product.findById(new ObjectId(id), fieldsToDeselect);
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
