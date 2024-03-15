import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

const AdminNavItem = ({
  icon,
  text,
  link,
}: {
  icon: IconType;
  text: string;
  link: string;
}) => {
  return <Link href={link}></Link>;
};

export default AdminNavItem;
