import mongoose from "mongoose";
import { productSchema } from "./product";
import { reviewSchema } from "./review";

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export { Review, Product };
