"use client";

import { getOrders, updateOrderDelivery } from "@/lib/actions/order";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEye, FaCheck } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";

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
  userId: any;
  amount: number;
  currency: string;
  status: string;
  deliveryStatus: string;
  paymentIntentId: string;
  products: ProductType[];
  createdAt: string;
  updatedAt: string;
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<OrdersData[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  if (!orders) {
    return <div className="w-full flex justify-center mt-20">Loading...</div>;
  }

  const handleDeliveryStatus = async (id: string, status: string) => {
    await updateOrderDelivery(id, status);
    const updatedOrders = orders.map((order) => {
      if (order._id === id) {
        return { ...order, deliveryStatus: status };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  };

  if (orders.length === 0) {
    return (
      <div className="w-full flex justify-center mt-20">
        You currently dont have any orders.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mt-20">Manage Orders</h1>
      <div className="mt-12 max-w-[1280px] mx-auto hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Order Id</TableHead>
              <TableHead>Customer</TableHead>
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
                  <TableCell>{order.userId.username}</TableCell>

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
                          : order.deliveryStatus === "dispatched"
                          ? "bg-fuchsia-400 text-white"
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
                  <TableCell className="flex items-center gap-3">
                    <div
                      className="p-2 border-2 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleDeliveryStatus(order._id, "dispatched")
                      }
                    >
                      <RiEBike2Fill className="text-xl" />
                    </div>
                    <div
                      className="p-2 border-2 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleDeliveryStatus(order._id, "delivered")
                      }
                    >
                      <FaCheck className="text-xl" />
                    </div>
                    <Link
                      href={`/orders/${order._id}`}
                      className="p-2 border-2 rounded-lg"
                    >
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

export default AdminOrders;
