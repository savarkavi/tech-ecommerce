import Image from "next/image";
import { ProductType } from "./ProductCard";
import { Rating } from "react-simple-star-rating";
import moment from "moment";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

type Review = {
  _id: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
};

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image
          src={review.userId.profilePhoto}
          alt="user image"
          width={24}
          height={24}
          className="rounded-full"
        />
        <h2 className="font-semibold">{review.userId.username}</h2>
        <p className="text-gray-500 text-sm sm:text-base">{`${moment(
          review.createdAt
        ).fromNow()}`}</p>
      </div>
      <Rating
        readonly
        initialValue={review.rating}
        allowFraction={true}
        style={{
          width: "100%",
        }}
        SVGstyle={{ display: "inline", width: "20px" }}
      />
      <p className="text-sm">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
