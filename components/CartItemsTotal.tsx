"use client";

import { useCart } from "@/hooks/useCart";

const CartItemsTotal = () => {
  const { cartProducts } = useCart();

  if (!cartProducts) return null;

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
        <p>{`$${total}`}</p>
      </div>
      <p className="text-sm">
        Taxes and shipping charges calculate on checkout
      </p>
      <button className="p-2 bg-orange-500 rounded-lg">Checkout</button>
    </div>
  );
};

export default CartItemsTotal;
