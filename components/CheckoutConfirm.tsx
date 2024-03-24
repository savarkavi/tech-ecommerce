"use client";

import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import React from "react";

const CheckoutConfirm = ({
  handleCheckoutButton,
}: {
  handleCheckoutButton: () => Promise<void>;
}) => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="lg:hidden w-full flex justify-center items-center">
        <span>Cart is empty</span>
      </div>
    );

  return (
    <div className="flex flex-col gap-16 items-center justify-center mt-24 w-full">
      <h1 className="text-2xl font-semibold">Summary of your Products</h1>
      <div className="w-full max-w-[800px] mx-auto">
        {cartProducts.map((product) => {
          return (
            <div key={product.id} className="p-4 flex gap-12 border-y">
              <div className="relative w-[250px] h-[200px]">
                <Image
                  src={product.selectedImage.image}
                  alt="product image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl capitalize">
                    {`Product Name: ${product.name}`}
                  </h1>
                  <p>{`Price: ₹${product.price}`}</p>
                  <p>{`Quantity: ${product.quantity}`}</p>
                  <p>{`Description: ${product.description}`}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleCheckoutButton}
        className="bg-orange-500 p-2 rounded-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutConfirm;
