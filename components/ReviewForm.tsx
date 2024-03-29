"use client";

import { addReview } from "@/lib/actions/review";
import { getUser } from "@/lib/actions/user";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ProductType } from "./ProductCard";
import toast from "react-hot-toast";

const ReviewForm = ({
  user,
  currentProduct,
  setCurrentProduct,
}: {
  user: string;
  currentProduct: ProductType;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductType | null>>;
}) => {
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  const clerkUser = JSON.parse(user);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clerkUser) {
      return toast.error("Sign In to add a review");
    }

    if (rating === 0) {
      toast.error("Please also rate the product.");
      return;
    }

    if (clerkUser) {
      const user = await getUser(clerkUser.id);

      const res = await addReview({
        userId: user._id,
        productId: currentProduct._id,
        rating,
        comment: commentText,
      });

      setCommentText("");
      setRating(0);

      const updatedReviewsProduct = {
        ...currentProduct,
        reviews: [...currentProduct.reviews, res],
      };

      setCurrentProduct(updatedReviewsProduct);
      toast.success("Review submitted!");
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="max-w-[800px]">
      <Rating
        initialValue={rating}
        onClick={handleRating}
        allowFraction={true}
        style={{
          width: "100%",
        }}
        SVGstyle={{ display: "inline", width: "25px" }}
      />
      <form onSubmit={handleSubmitForm}>
        <textarea
          placeholder="write your review"
          className="border p-2 rounded-lg shadow-md outline-none mt-4 w-full"
          rows={8}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button className="bg-orange-500 rounded-lg p-2 mt-4 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
