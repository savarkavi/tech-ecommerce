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
import { CgProfile } from "react-icons/cg";

const Profile = ({ currentUser }: { currentUser: any }) => {
  const user = JSON.parse(currentUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user ? (
          <Image
            src={user.profilePhoto}
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
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton>Sign Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
