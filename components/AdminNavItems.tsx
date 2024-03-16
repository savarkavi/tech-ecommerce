"use client";

import { AdminItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNavItems = () => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 gap-6 sm:flex items-center sm:gap-12 justify-center">
      {AdminItems.map((item) => {
        return (
          <Link
            href={item.link}
            key={item.name}
            className={`flex gap-3 items-center text-sm md:text-base pb-2 ${
              pathname === item.link && "border-b border-black"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminNavItems;
