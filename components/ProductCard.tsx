"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export type ProductType = {
  _id: string;
  name: string;
  desc: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: Array<{
    _id: string;
    color: string;
    colorCode: string;
    image: string;
  }>;
  reviews: Array<{
    _id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
      _id: string;
      name: string;
      email: string;
      image: string;
      createdAt: string;
      updatedAt: string;
      role: string;
    };
  }>;
};

const ProductCard = ({ product }: { product: ProductType }) => {
  const initialValue = () => {
    const ratingsArray = product.reviews.map((review) => review.rating);

    if (ratingsArray.length === 0) {
      return 0;
    } else {
      const avgRating =
        ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;
      return avgRating;
    }
  };

  return (
    <Link
      href={`product/${product._id}`}
      className="border px-6 py-3 rounded-lg shadow-md max-w-[350px] mx-auto"
    >
      <div className="relative w-[250px] h-[300px]">
        <Image
          src={product.images[0].image}
          alt="product image"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-2 w-full mt-8">
        <h2>
          {product.name.length > 25
            ? `${product.name.substring(0, 25)}...`
            : product.name}
        </h2>

        <Rating
          readonly
          initialValue={initialValue()}
          allowFraction={true}
          style={{
            width: "100%",
          }}
          SVGstyle={{ display: "inline", width: "25px" }}
        />
        <p>{`${product.reviews.length} reviews`}</p>
        <p className="font-semibold">{`₹${product.price}`}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
