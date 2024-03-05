import React from "react";

type QuantityCounterProps = {
  handleDecreaseQuantity: (productId: string) => void;
  handleIncreaseQuantity: (productId: string) => void;
  quantity: number;
  productId: string;
};

const QuantityCounter = ({
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  quantity,
  productId,
}: QuantityCounterProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="border-2 p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
        onClick={() => handleDecreaseQuantity(productId)}
      >
        -
      </div>
      <span>{quantity}</span>
      <div
        className="border-2 p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
        onClick={() => handleIncreaseQuantity(productId)}
      >
        +
      </div>
    </div>
  );
};

export default QuantityCounter;
