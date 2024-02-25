"use client";

import { products } from "@/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Product = () => {
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const currentProduct = products.find((product) => product.id === id);

  if (!currentProduct) {
    return null;
  }

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const initialValue = () => {
    const ratingsArray = currentProduct.reviews.map((review) => review.rating);

    if (ratingsArray.length === 0) {
      return 0;
    } else {
      const avgRating =
        ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;
      return avgRating;
    }
  };

  return (
    <div className="px-4 py-8">
      <div>
        <div className="flex flex-col-reverse gap-8">
          <div className="w-full border h-[100px]"></div>
          <div className="relative w-full h-[400px]">
            <Image
              src={currentProduct?.images[0].image}
              alt={currentProduct?.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <h1>{currentProduct.name}</h1>
          <p>{`$${currentProduct.price}`}</p>
          <div>
            <Rating
              onClick={handleRating}
              initialValue={initialValue()}
              allowFraction={true}
              style={{
                width: "100%",
              }}
              SVGstyle={{ display: "inline", width: "25px" }}
            />
            <p>{`${currentProduct.reviews.length} reviews`}</p>
          </div>
          <p>{currentProduct.description}</p>
          <div>
            <p>{`Category: ${currentProduct.category}`}</p>
            <p>{`Brand: ${currentProduct.brand}`}</p>
            <p>
              {currentProduct.inStock ? (
                <span className="text-green-500">In stock</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div>Reviews</div>
    </div>
  );
};

export default Product;
