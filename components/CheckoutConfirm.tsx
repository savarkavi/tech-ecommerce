import React from "react";

const CheckoutConfirm = ({
  handleCheckoutButton,
}: {
  handleCheckoutButton: () => Promise<void>;
}) => {
  return (
    <div className="flex items-center justify-center mt-24 w-full">
      <button onClick={handleCheckoutButton}>Checkout</button>
    </div>
  );
};

export default CheckoutConfirm;
