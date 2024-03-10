import { currentUser } from "@clerk/nextjs";
import NavbarItems from "./NavbarItems";

const Navbar = async () => {
  const clerkUser = await currentUser();

  return <NavbarItems clerkUser={JSON.stringify(clerkUser)} />;
};

export default Navbar;
