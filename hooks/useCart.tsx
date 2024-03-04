import { CartProductType } from "@/app/product/[id]/page";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type cartContextType = {
  cartQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType, qty: number) => void;
};

export const cartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: any) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    const totalCartItems = localStorage.getItem("cartQty");
    if (!cartItems) {
      return;
    } else if (!totalCartItems) {
      setCartQuantity(0);
    } else {
      setCartProducts(JSON.parse(cartItems));
      setCartQuantity(JSON.parse(totalCartItems));
    }
  }, []);

  const handleAddToCart = (product: CartProductType, qty: number) => {
    let updatedCart;
    let CartQty = cartQuantity + qty;
    if (!cartProducts) {
      updatedCart = [product];
      setCartProducts(updatedCart);
    } else {
      updatedCart = [...cartProducts, product];
      setCartProducts(updatedCart);
    }

    setCartQuantity(CartQty);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartQty", JSON.stringify(CartQty));
    toast.success("Product added to cart");
  };

  const handleIncCartQty = (productId: string, qty: number) => {
    let updatedCart;
    let CartQty = cartQuantity + qty;

    if (!cartProducts) {
    }

    const product = cartProducts?.find((product) => product.id === productId);
    updatedCart = [...cartProducts];
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
