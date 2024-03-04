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
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import QuantityCounter from "./QuantityCounter";
import Link from "next/link";

const CartTable = () => {
  const { cartProducts } = useCart();

  if (!cartProducts) return <div>Cart is empty</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartProducts.map((product) => {
          return (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex gap-6 items-center">
                  <div className="relative w-[50px] h-[100px] flex-shrink-0">
                    <Image
                      src={product.selectedImage.image}
                      alt="product image"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-sm hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="underline">Remove</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{`$${product.price}`}</TableCell>
              <TableCell>
                <QuantityCounter quantity={product.quantity} />
              </TableCell>
              <TableCell className="text-right">{`$${
                product.price * product.quantity
              }`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CartTable;
