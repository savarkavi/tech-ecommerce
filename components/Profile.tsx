import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useClerk } from "@clerk/clerk-react";

const Profile = ({ currentUser }: { currentUser: any }) => {
  const { signOut } = useClerk();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {currentUser ? (
          <Image
            src={currentUser.profilePhoto}
            alt="profile photo"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <CgProfile />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/orders">Your Orders</Link>
        </DropdownMenuItem>
        {currentUser?.role === "ADMIN" && (
          <DropdownMenuItem>
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <button
            onClick={() =>
              signOut(() => {
                localStorage.removeItem("cart");
                localStorage.removeItem("cartQty");
              })
            }
          >
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
