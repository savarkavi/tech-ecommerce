import React, { useEffect } from "react";

const Checkout = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button
          type="submit"
          role="link"
          className="py-2 px-3 bg-orange-500 rounded-lg text-sm"
        >
          Checkout
        </button>
      </section>
    </form>
  );
};

export default Checkout;
