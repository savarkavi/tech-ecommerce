"use client";

import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

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
          setClientSecret(res.data.paymentIntent.client_secret);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPaymentIntent();
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent]);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-28">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutClient;
