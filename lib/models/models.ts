import mongoose from "mongoose";
import { productSchema } from "./product";
import { reviewSchema } from "./review";

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export { Review, Product };
