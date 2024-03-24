"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const CartItemsTotal = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) return null;

  const priceArr = cartProducts.map(
    (product) => product.price * product.quantity
  );
  const total = priceArr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return (
    <div className="flex flex-col p-4 gap-4 mt-10 max-w-[400px] md:mt-16 lg:mt-10">
      <div className="flex justify-between text-lg font-semibold">
        <h2>Subtotal</h2>
        <p>{`₹${total.toFixed(2)}`}</p>
      </div>
      <p className="text-sm">
        Taxes and shipping charges calculate on checkout
      </p>
      <Link href="/checkout" className="w-full">
        <button className="py-2 px-3 bg-orange-500 rounded-lg text-sm w-full">
          Proceed to Checkout
        </button>{" "}
      </Link>
    </div>
  );
};

export default CartItemsTotal;
