import Image from "next/image";
import { ProductType } from "./ProductCard";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: null | string; // Assuming emailVerified can be null or a string
  image: string;
  hashedPassword: null | string; // Assuming hashedPassword can be null or a string
  createdAt: string;
  updatedAt: string;
  role: "USER"; // Assuming role is always "USER"
};

type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div>
      <div>
        <Image
          src={review.user.image}
          alt="user image"
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
