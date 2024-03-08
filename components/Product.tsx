"use client";

import { products } from "@/constants";
import { useParams } from "next/navigation";
import React from "react";
import ProductDetails from "./ProductDetails";

const Product = ({ user }: { user: string }) => {
  const { id } = useParams();
  const currentProduct = products.find((product) => product.id === id);

  if (!currentProduct) {
    return null;
  }

  return <ProductDetails currentProduct={currentProduct} user={user} />;
};

export default Product;
