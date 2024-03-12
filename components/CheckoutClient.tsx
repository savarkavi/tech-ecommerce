"use client";

import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useEffect } from "react";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  console.log(paymentIntent);

  useEffect(() => {
    if (cartProducts) {
      const priceArr = cartProducts.map(
        (product) => product.price * product.quantity
      );
      const total = priceArr.reduce((acc, curr) => {
        return acc + curr;
      }, 0);

      const fetchPaymentIntent = async () => {
        try {
          const res = await axios.post("/api/create_payment_intent", {
            items: cartProducts,
            total,
            payment_intent_id: paymentIntent,
          });

          handleSetPaymentIntent(res.data.paymentIntent.id);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPaymentIntent();
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent]);

  return <div>CheckoutClient</div>;
};

export default CheckoutClient;
