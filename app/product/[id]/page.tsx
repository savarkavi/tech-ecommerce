import Product from "@/components/Product";
import { currentUser } from "@clerk/nextjs";

const ProductPage = async () => {
  const user = await currentUser();

  return <Product user={JSON.stringify(user)} />;
};

export default ProductPage;
