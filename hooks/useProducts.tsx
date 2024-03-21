"use client";

import { getProducts } from "@/lib/actions/product";
import React, { createContext, useContext, useEffect, useState } from "react";

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

type ProductsContextType = {
  products: productsData[] | null;
  setProducts: React.Dispatch<React.SetStateAction<productsData[] | null>>;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );
  }
  return context;
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<productsData[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
