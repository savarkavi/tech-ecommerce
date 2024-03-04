import React from "react";

type QuantityCounterProps = {
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
  quantity: number;
};

const QuantityCounter = ({
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  quantity,
}: QuantityCounterProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="border-2 p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
        onClick={handleDecreaseQuantity}
      >
        -
      </div>
      <span>{quantity}</span>
      <div
        className="border-2 p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
        onClick={handleIncreaseQuantity}
      >
        +
      </div>
    </div>
  );
};

export default QuantityCounter;
