import UserOrders from "@/components/UserOrders";
import { getUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs";

const Orders = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }

  const user = await getUser(clerkUser.id);

  return <UserOrders user={user} />;
};

export default Orders;
