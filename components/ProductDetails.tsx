"use client";

import ReviewCard from "@/components/ReviewCard";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ProductType } from "./ProductCard";
import QuantityCounter from "./QuantityCounter";
import Link from "next/link";
import toast from "react-hot-toast";
import ReviewForm from "./ReviewForm";

export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  selectedImage: SelectedImageType;
};

const ProductDetails = ({
  currentProduct,
  user,
}: {
  currentProduct: ProductType;
  user: string;
}) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: currentProduct._id,
    name: currentProduct.name,
    description: currentProduct.desc,
    category: currentProduct.category,
    brand: currentProduct.brand,
    quantity: 1,
    price: currentProduct.price,
    selectedImage: currentProduct.images[0],
  });

  const { cartProducts, handleAddToCart } = useCart();

  useEffect(() => {
    const isAdded = cartProducts?.find(
      (product) => product.id === currentProduct?._id
    );

    if (isAdded) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [cartProducts, currentProduct]);

  const initialValue = () => {
    const ratingsArray = currentProduct.reviews.map((review) => review.rating);

    if (ratingsArray.length === 0) {
      return 0;
    } else {
      const avgRating =
        ratingsArray.reduce((acc, curr) => acc + curr, 0) / ratingsArray.length;
      return avgRating;
    }
  };

  const handleColorChange = (image: {
    color: string;
    colorCode: string;
    image: string;
  }) => {
    setCartProduct((prev) => ({ ...prev, selectedImage: image }));
  };

  const handleIncreaseQuantity = () => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  };

  const handleDecreaseQuantity = () => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  };

  return (
    <div className="px-4 py-8 max-w-[1600px] mx-auto">
      <div className="lg:flex lg:gap-8 lg:justify-between lg:items-start">
        <div className="flex flex-col-reverse gap-8 lg:w-[500px] lg:flex-shrink-0 xl:flex-row xl:h-[500px] xl:flex-grow">
          <div className="w-full border h-[100px] xl:h-full xl:w-[200px] rounded-lg flex xl:flex-col justify-between p-2">
            {currentProduct.images.map((image) => {
              return (
                <div
                  key={image.color}
                  className={`${
                    cartProduct.selectedImage?.color === image.color &&
                    "border border-green-500"
                  } rounded-lg p-2 cursor-pointer`}
                  onClick={() => handleColorChange(image)}
                >
                  <div
                    className={`relative w-[60px] sm:w-[100px] xl:w-full h-[60px] xl:h-[100px]`}
                  >
                    <Image
                      src={image.image}
                      alt="product image"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative w-full h-[400px] xl:h-[500px]">
            <Image
              src={
                cartProduct.selectedImage?.image ||
                currentProduct.images[0].image
              }
              alt={cartProduct.name || currentProduct.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 lg:mt-0 lg:max-w-[850px]">
          <h1 className="text-2xl">{currentProduct.name}</h1>
          <p className="font-semibold">{`$${currentProduct.price}`}</p>
          <div className="flex items-center gap-2">
            <Rating
              readonly
              initialValue={initialValue()}
              allowFraction={true}
              style={{
                width: "100%",
              }}
              SVGstyle={{ display: "inline", width: "25px" }}
            />
            <p>{`${currentProduct.reviews.length} reviews`}</p>
          </div>
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          <p className="text-sm max-w-[500px]">{currentProduct.desc}</p>
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Category: </span>
              <span className="text-gray-500">{currentProduct.category}</span>
            </p>
            <p>
              <span className="font-semibold">Brand: </span>
              <span className="text-gray-500">{currentProduct.brand}</span>
            </p>
            <p>
              {currentProduct.inStock ? (
                <span className="text-green-500">In stock</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>
          </div>
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          <div className="flex items-center gap-4">
            <p>Color: </p>
            <div className="flex items-center gap-2">
              {currentProduct.images.map((image) => {
                return (
                  <div
                    key={image.color}
                    className={`p-1 rounded-full cursor-pointer border border-black ${
                      cartProduct.selectedImage?.color === image.color &&
                      "border border-green-500"
                    }`}
                    onClick={() => handleColorChange(image)}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: image.colorCode }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          {isAddedToCart ? (
            <p className="text-green-500">Already added to cart</p>
          ) : (
            <div className="flex items-center gap-4">
              <p>Quantity: </p>
              <QuantityCounter
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
                quantity={cartProduct.quantity}
                productId={cartProduct.id}
              />
            </div>
          )}
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          {isAddedToCart ? (
            <Link
              href="/cart"
              className="px-3 py-2 bg-orange-500 rounded-xl w-[200px] text-center"
            >
              View Cart
            </Link>
          ) : (
            <button
              className="px-3 py-2 bg-orange-500 rounded-xl w-[200px]"
              onClick={
                JSON.parse(user)
                  ? () => handleAddToCart(cartProduct, cartProduct.quantity)
                  : () => toast.error("You have to Sign In first")
              }
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="mt-20 2xl:mt-24">
        <h2 className="text-xl my-8">Add a Review</h2>
        <ReviewForm user={user} currentProduct={currentProduct} />
        <h2 className="text-xl my-12">Product reviews</h2>
        {currentProduct.reviews.length === 0 && <div>No reviews available</div>}
        <div className="flex flex-col gap-20">
          {currentProduct.reviews.map((review) => {
            return <ReviewCard key={review._id} review={review} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
