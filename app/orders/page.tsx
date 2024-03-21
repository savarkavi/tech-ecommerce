"use client";

import { getOrders } from "@/lib/actions/order";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

type OrdersData = {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  deliveryStatus: string;
  paymentIntentId: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersData[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full flex justify-center mt-20">
        You currently dont have any orders.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl mt-20">Your Orders</h1>
      <div className="w-full mt-12">
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
                  <FaEye className="text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
