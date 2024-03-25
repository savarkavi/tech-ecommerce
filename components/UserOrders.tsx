"use client";

import { getOrdersById } from "@/lib/actions/order";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ProductType } from "@/components/ProductCard";

export type OrdersData = {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  deliveryStatus: string;
  paymentIntentId: string;
  products: ProductType[];
  createdAt: string;
  updatedAt: string;
};

const UserOrders = ({ user }: { user: any }) => {
  const [orders, setOrders] = useState<OrdersData[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersById(user._id);
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  if (!orders) {
    return <div className="w-full flex justify-center mt-20">Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="w-full flex justify-center mt-20">
        You currently dont have any orders.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mt-20">Your Orders</h1>
      <div className="w-full mt-12 md:hidden">
        {orders.map((order) => {
          return (
            <div key={order._id} className="max-w-[1024px] mx-auto">
              <div className="flex flex-col gap-3 border p-4">
                <p className="text-sm flex gap-2">
                  <span className="font-semibold">Order Id:</span>
                  <span>{order._id}</span>
                </p>
                <p className="text-sm flex gap-2">
                  <span className="font-semibold">Amount(₹):</span>
                  <span>{order.amount}</span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="font-semibold">Payment status:</span>
                  <span
                    className={`${
                      order.status === "pending"
                        ? "bg-gray-300"
                        : "bg-green-500 text-white"
                    } py-1 px-2 rounded-md`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm flex items-center gap-2">
                  <span className="font-semibold">Delivery status:</span>
                  <span
                    className={`${
                      order.deliveryStatus === "pending"
                        ? "bg-gray-300"
                        : "bg-green-500 text-white"
                    } py-1 px-2 rounded-md`}
                  >
                    {order.deliveryStatus}
                  </span>
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <p className="text-gray-500 text-sm sm:text-base">{`${moment(
                    order.createdAt
                  ).fromNow()}`}</p>
                  <Link href={`/orders/${order._id}`}>
                    <FaEye className="text-xl" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 max-w-[1024px] mx-auto hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Amount(₹)</TableHead>
              <TableHead>Payment status</TableHead>
              <TableHead>Delivery status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{`${order.amount}`}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        order.status === "pending"
                          ? "bg-gray-300"
                          : "bg-green-500 text-white"
                      } py-1 px-2 rounded-md`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        order.deliveryStatus === "pending"
                          ? "bg-gray-300"
                          : "bg-green-500 text-white"
                      } py-1 px-2 rounded-md`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-500 text-sm">{`${moment(
                      order.createdAt
                    ).fromNow()}`}</p>
                  </TableCell>
                  <TableCell>
                    <Link href={`/orders/${order._id}`}>
                      <FaEye className="text-xl" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserOrders;
