"use client";

import ProductDetails from "@/components/ProductDetails";
import { products } from "@/constants";
import { useParams } from "next/navigation";

const Product = () => {
  const { id } = useParams();
  const currentProduct = products.find((product) => product.id === id);

  if (!currentProduct) {
    return null;
  }

  return <ProductDetails currentProduct={currentProduct} />;
};

export default Product;
