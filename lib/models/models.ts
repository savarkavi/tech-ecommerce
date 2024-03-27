import mongoose from "mongoose";
import { productSchema } from "./product";
import { reviewSchema } from "./review";
import { userSchema } from "./user";

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export { Review, Product, User };
