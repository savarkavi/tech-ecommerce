"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/actions/product";

type productsData = {
  _id: string;
  name: string;
  desc: string;
  brand: string;
  category: string;
  price: number;
  inStock: boolean;
  images: Array<{
    _id: string;
    color: string;
    colorCode: string;
    image: string;
  }>;
  reviews: Array<{
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdDate: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      createdAt: string;
      updatedAt: string;
      role: string;
    };
  }>;
};

const HomeProducts = () => {
  const [products, setProducts] = useState<productsData[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  if (products === null) {
    return <div>Loading...</div>;
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
