"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type productsData = {
  _id: string;
  name: string;
  desc: string;
  brand: string;
  category: string;
  price: number;
  inStock: boolean;
  images: {
    _id: string;
    color: string;
    colorCode: string;
    image: string;
  };
  reviews: [];
};

import { MdOutlineChangeCircle } from "react-icons/md";
import { FaTrash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  updateProductStockStatus,
} from "@/lib/actions/product";
import Link from "next/link";

const ProductsTable = () => {
  const [productsData, setProductsData] = useState<productsData[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      console.log(data);
      setProductsData(data);
    };

    fetchProducts();
  }, []);

  if (!productsData) {
    return (
      <div className="flex justify-center items-center mt-8 w-full">
        <span>Loading...</span>
      </div>
    );
  }

  const handleInStockToggle = async (id: string) => {
    await updateProductStockStatus(id);
    const updatedProducts = productsData.map((product) => {
      if (product._id === id) {
        return { ...product, inStock: !product.inStock };
      } else {
        return product;
      }
    });
    setProductsData(updatedProducts);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const updatedProducts = productsData.filter(
      (product) => product._id !== id
    );

    setProductsData(updatedProducts);
  };

  return (
    <Table className="mt-12 border shadow-lg text-sm max-w-[1280px] mx-auto">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[500px]">Name</TableHead>
          <TableHead>Price(₹)</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>inStock</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsData.map((product: productsData) => {
          return (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.inStock ? (
                  <span className="bg-green-500 px-2 py-1 rounded-lg text-white">
                    in stock
                  </span>
                ) : (
                  <span className="bg-red-500 px-2 py-1 rounded-lg text-white">
                    out of stock
                  </span>
                )}
              </TableCell>
              <TableCell className="text-center flex justify-center gap-3 text-xl">
                <div className="p-2 border-2 rounded-lg">
                  <MdOutlineChangeCircle
                    className="cursor-pointer"
                    onClick={() => handleInStockToggle(product._id)}
                  />
                </div>
                <div className="p-2 border-2 rounded-lg">
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                </div>
                <Link
                  href={`/product/${product._id}`}
                  className="p-2 border-2 rounded-lg"
                >
                  <FaEye className="cursor-pointer" />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
