import { MdDashboard, MdAddToPhotos } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

export const AdminItems = [
  // { name: "Summary", icon: <MdDashboard />, link: "/admin" },
  {
    name: "Add Products",
    icon: <MdAddToPhotos />,
    link: "/admin/add-products",
  },
  {
    name: "Manage Products",
    icon: <AiFillDatabase />,
    link: "/admin/manage-products",
  },
  {
    name: "Manage Orders",
    icon: <BsLayoutTextSidebarReverse />,
    link: "/admin/manage-orders",
  },
];
