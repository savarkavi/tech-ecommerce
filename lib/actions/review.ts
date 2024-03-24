"use server";

import { Product, Review } from "../models/models";
import { connectDB } from "../mongoose";

type ReviewParams = {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
};

export const addReview = async (reviewData: ReviewParams) => {
  try {
    await connectDB();
    const res = await Review.create(reviewData);
    console.log(res._id);

    await Product.findByIdAndUpdate(res.productId, {
      $push: { reviews: res._id },
    });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};
