"use client";

import { useProductsContext } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const HomeProducts = () => {
  const { products } = useProductsContext();

  if (!products) {
    return (
      <div className="w-full flex justify-center mt-20 text-lg">Loading...</div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full flex justify-center mt-20 text-lg">
        No products found
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row xl:flex-wrap items-center justify-center gap-4 mt-16 p-4 xl:p-0 max-w-[1600px] mx-auto">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default HomeProducts;
