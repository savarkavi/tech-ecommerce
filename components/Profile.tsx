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

const Profile = ({ currentUser }: { currentUser: any }) => {
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
        <DropdownMenuItem>Your Orders</DropdownMenuItem>
        {currentUser?.role === "ADMIN" && (
          <DropdownMenuItem>
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <SignOutButton>Sign Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
