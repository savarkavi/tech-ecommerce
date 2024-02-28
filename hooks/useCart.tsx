import { CartProductType } from "@/app/product/[id]/page";
import { createContext, useContext, useState } from "react";

type cartContextType = {
  cartQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType) => void;
};

export const cartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: any) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const handleAddToCart = (product: CartProductType) => {
    if (!cartProducts) {
      setCartProducts([product]);
    } else {
      setCartProducts([...cartProducts, product]);
    }
  };

  const value = {
    cartQuantity,
    cartProducts,
    handleAddToCart,
  };

  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);

  if (context === null) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
