import { OrdersData } from "@/app/orders/page";
import Image from "next/image";
import React from "react";

const ProductsOrdered = ({ order }: { order: OrdersData }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl">Products Ordered</h2>

      <div className="mt-8">
        {order.products.map((product) => {
          return (
            <div key={product._id} className="p-4 flex gap-12 border-y">
              <div className="relative w-[120px] h-[150px]">
                <Image
                  src={product.images[0].image}
                  alt="product image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <h1 className="font-semibold text-lg">{product.name}</h1>
                  <p>{`₹${product.price}`}</p>
                  <p className="text-sm text-gray-600">{product.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsOrdered;
