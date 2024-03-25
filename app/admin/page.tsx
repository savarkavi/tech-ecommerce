"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Admin = () => {
  const path = usePathname();
  const router = useRouter();

  return <div className="flex justify-center w-full">Admin</div>;
};

export default Admin;
