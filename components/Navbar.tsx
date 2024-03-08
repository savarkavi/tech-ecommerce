"use client";

import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/nextjs";
import Profile from "./Profile";

const Navbar = () => {
  const [isSearchHidden, setIsSearchHidden] = useState(true);

  const { cartQuantity } = useCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchHidden(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchHidden((prev) => !prev);
  };

  return (
    <div className="p-4 bg-gray-200 shadow-lg sticky top-0 z-[99]">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className="font-semibold text-xl hidden lg:block">Tech Cart</h1>
        </Link>
        <form className="w-full max-w-[500px] mx-auto hidden md:flex">
          <input
            placeholder="search items..."
            type="text"
            className="p-3 rounded-l-lg outline-none w-full"
          />
          <button className="p-3 bg-orange-500 rounded-r-lg">Search</button>
        </form>
        <form
          className={`w-full max-w-[350px] sm:max-w-[500px] mx-auto flex md:hidden absolute ${
            isSearchHidden ? "-top-20" : "top-20"
          } left-1/2 -translate-x-1/2 shadow-lg transition-all`}
        >
          <input
            placeholder="search items..."
            type="text"
            className="p-3 rounded-l-lg outline-none w-full"
          />
          <button className="p-3 bg-orange-500 rounded-r-lg">Search</button>
        </form>
        <div className="flex items-center gap-8 text-2xl">
          <CiSearch
            className="md:hidden cursor-pointer"
            onClick={handleSearchClick}
          />
          <Link href="/cart" className="relative">
            <CiShoppingCart />
            <SignedIn>
              <span className="w-6 h-6 text-white text-[12px] rounded-full bg-black flex justify-center items-center absolute -top-3 -right-4">
                {cartQuantity}
              </span>
            </SignedIn>
          </Link>
          <div>
            <SignedOut>
              <Link
                href="/sign-in"
                className="bg-white px-3 py-2 text-sm rounded-lg shadow-lg"
              >
                Log In
              </Link>
            </SignedOut>
            <SignedIn>
              <Profile />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
