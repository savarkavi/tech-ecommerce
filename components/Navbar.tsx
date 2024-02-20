import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="p-4 bg-gray-200 shadow-lg">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className="font-semibold text-xl hidden sm:block">Tech Cart</h1>
        </div>
        <form className="w-full max-w-[600px] mx-auto hidden lg:flex">
          <input
            placeholder="search items..."
            type="text"
            className="p-3 rounded-l-lg outline-none w-full"
          />
          <button className="p-3 bg-orange-500 rounded-r-lg">Search</button>
        </form>
        <div className="flex items-center gap-8 text-2xl">
          <CiSearch className="lg:hidden" />
          <CiShoppingCart />
          <CgProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
