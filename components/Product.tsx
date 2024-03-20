"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { getProduct } from "@/lib/actions/product";
import { ProductType } from "./ProductCard";

const Product = ({ user }: { user: string }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!Array.isArray(id)) {
        const res = await getProduct(id);
        setCurrentProduct(res);
      }
    };

    fetchProduct();
  }, [id]);

  if (!currentProduct) {
    return null;
  }

  return <ProductDetails currentProduct={currentProduct} user={user} />;
};

export default Product;
