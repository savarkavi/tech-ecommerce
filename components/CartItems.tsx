"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";
import QuantityCounter from "./QuantityCounter";

const CartItems = () => {
  const {
    cartProducts,
    handleIncCartQty,
    handleDecCartQty,
    handleRemoveFromCart,
  } = useCart();

  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="lg:hidden w-full flex justify-center items-center">
        <span>Cart is empty</span>
      </div>
    );

  return (
    <div className="lg:hidden">
      {cartProducts.map((product) => {
        return (
          <div key={product.id} className="p-4 flex gap-12 border-y">
            <div className="relative w-[150px] h-[200px]">
              <Image
                src={product.selectedImage.image}
                alt="product image"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-gray-600 text-sm sm:text-base">
                  {product.name}
                </h1>
                <p>{`₹${product.price}`}</p>
              </div>
              <div className="flex flex-col gap-4">
                <QuantityCounter
                  quantity={product.quantity}
                  handleIncreaseQuantity={handleIncCartQty}
                  handleDecreaseQuantity={handleDecCartQty}
                  productId={product.id}
                />
                <p
                  className="underline text-sm cursor-pointer"
                  onClick={() => handleRemoveFromCart(product)}
                >
                  Remove
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
