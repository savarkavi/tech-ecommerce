import { CartProductType } from "@/app/product/[id]/page";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type cartContextType = {
  cartQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddToCart: (product: CartProductType, qty: number) => void;
  handleIncCartQty: (productId: string) => void;
  handleDecCartQty: (productId: string) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
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
    let cartQty = cartQuantity + qty;
    if (!cartProducts) {
      updatedCart = [product];
      setCartProducts(updatedCart);
    } else {
      updatedCart = [...cartProducts, product];
      setCartProducts(updatedCart);
    }

    setCartQuantity(cartQty);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartQty", JSON.stringify(cartQty));
    toast.success("Product added to cart");
  };

  const handleRemoveFromCart = (product: CartProductType) => {
    let updatedCart = cartProducts?.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    let cartQty = cartQuantity - product.quantity;

    if (!updatedCart) return;

    setCartProducts(updatedCart);
    setCartQuantity(cartQty);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartQty", JSON.stringify(cartQty));
    toast.success("Product removed from cart");
  };

  const handleIncCartQty = (productId: string) => {
    let updatedCart;
    let cartQty = cartQuantity + 1;

    if (!cartProducts) {
      return;
    }

    if (cartProducts) {
      const product = cartProducts?.find((product) => product.id === productId);
      product.quantity = product.quantity + 1;
      updatedCart = cartProducts.filter((product) => product.id !== productId);
      updatedCart = [...updatedCart, product];
      setCartProducts(updatedCart);
      setCartQuantity(cartQty);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cartQty", JSON.stringify(cartQty));
    }
  };

  const handleDecCartQty = (productId: string) => {
    let updatedCart;
    let cartQty = cartQuantity - 1;

    if (!cartProducts) {
      return;
    }

    if (cartProducts) {
      const product = cartProducts?.find((product) => product.id === productId);
      if (product.quantity === 1) return;
      product.quantity = product.quantity - 1;
      updatedCart = cartProducts.filter((product) => product.id !== productId);
      updatedCart = [...updatedCart, product];
      setCartProducts(updatedCart);
      setCartQuantity(cartQty);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cartQty", JSON.stringify(cartQty));
    }
  };

  const value = {
    cartQuantity,
    cartProducts,
    handleAddToCart,
    handleIncCartQty,
    handleDecCartQty,
    handleRemoveFromCart,
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
