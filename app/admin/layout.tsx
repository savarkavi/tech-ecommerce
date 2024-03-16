import AdminNavbar from "@/components/AdminNavbar";
import { getUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const user = await getUser(clerkUser.id);

  if (user.role === "USER") {
    redirect("/");
  }

  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
};

export default AdminLayout;
