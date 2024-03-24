"use client";

import { getOrder } from "@/lib/actions/order";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OrdersData } from "../page";
import moment from "moment";
import ProductsOrdered from "@/components/ProductsOrdered";

const OrderDetails = () => {
  const [order, setOrder] = useState<OrdersData | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!Array.isArray(id)) {
        const data = await getOrder(id);
        setOrder(data);
      }
    };

    fetchOrder();
  }, [id]);

  console.log(order);

  if (!order) {
    return null;
  }

  return (
    <div className="px-8 max-w-[1280px] mx-auto">
      <h2 className="text-2xl mt-20">Order Details</h2>
      <div className="mt-8 flex flex-col gap-4 text-sm">
        <p className=" flex gap-2">
          <span className="font-semibold">Order Id:</span>
          <span>{order._id}</span>
        </p>
        <p className=" flex gap-2">
          <span className="font-semibold">Total Amount(₹):</span>
          <span>{order.amount}</span>
        </p>
        <p className=" flex gap-2">
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
        <p className=" flex gap-2">
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
        <p className="text-sm sm:text-base">{`${moment(
          order.createdAt
        ).fromNow()}`}</p>
      </div>
      <ProductsOrdered order={order} />
    </div>
  );
};

export default OrderDetails;
