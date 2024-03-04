"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";
import QuantityCounter from "./QuantityCounter";

const CartItems = () => {
  const { cartProducts } = useCart();

  if (!cartProducts) return <div>Cart is empty</div>;

  return (
    <div className="lg:hidden">
      {cartProducts.map((product) => {
        return (
          <div key={product.id} className="p-4 flex gap-6 border-y">
            <div className="relative w-[150px] h-[200px] flex-shrink-0">
              <Image
                src={product.selectedImage.image}
                alt="product image"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-600 text-sm sm:text-base">
                  {product.name}
                </h1>
                <p>{`$${product.price}`}</p>
              </div>
              <div className="flex flex-col gap-4">
                <QuantityCounter quantity={product.quantity} />
                <p className="underline text-sm">Remove</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
