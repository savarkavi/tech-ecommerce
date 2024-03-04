import CartItems from "@/components/CartItems";
import CartItemsTotal from "@/components/CartItemsTotal";
import CartTable from "@/components/CartTable";

const Cart = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="w-full flex items-center justify-center p-8">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      </div>
      <div className="mt-10">
        <CartItems />
        <div className="hidden lg:block">
          <CartTable />
        </div>
      </div>
      <div className="w-full flex lg:justify-end">
        <CartItemsTotal />
      </div>
    </div>
  );
};

export default Cart;
