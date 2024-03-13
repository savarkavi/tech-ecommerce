import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { handleClearCart } = useCart();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Payment successful");
          handleClearCart();
        } else {
          if (
            res.error.type === "card_error" ||
            res.error.type === "validation_error"
          ) {
            if (res.error.message) {
              setMessage(res.error.message);
            }
          } else {
            setMessage("An unexpected error occurred.");
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="border p-4 rounded-xl shadow-lg"
    >
      <h2 className="text-xl mb-4 font-semibold">Address Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
        }}
      />
      <h2 className="text-xl my-4 font-semibold">Card Information</h2>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-2 py-2 rounded-lg bg-orange-500 text-sm mt-4"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
