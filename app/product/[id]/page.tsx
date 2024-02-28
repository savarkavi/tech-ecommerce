"use client";

import ReviewCard from "@/components/ReviewCard";
import { products } from "@/constants";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export type CartProductType = {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  category: string | undefined;
  brand: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
  selectedImage: SelectedImageType | undefined;
};

const Product = () => {
  const { id } = useParams();
  const currentProduct = products.find((product) => product.id === id);

  const [rating, setRating] = useState(0);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: currentProduct?.id,
    name: currentProduct?.name,
    description: currentProduct?.description,
    category: currentProduct?.category,
    brand: currentProduct?.brand,
    quantity: 1,
    price: currentProduct?.price,
    selectedImage: currentProduct?.images[0],
  });
  const [quantity, setQuantity] = useState(1);

  const { cartQuantity, cartProducts, handleAddToCart } = useCart();

  if (!currentProduct) {
    return null;
  }

  console.log(cartQuantity, cartProducts);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleColorChange = (image: {
    color: string;
    colorCode: string;
    image: string;
  }) => {
    setCartProduct((prev) => ({ ...prev, selectedImage: image }));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

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

  return (
    <div className="px-4 py-8 2xl:px-0 max-w-[1600px] mx-auto">
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
              onClick={handleRating}
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
          <p className="text-sm max-w-[500px]">{currentProduct.description}</p>
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
                    className={`p-1 rounded-full cursor-pointer ${
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
          <div className="flex items-center gap-4">
            <p>Quantity: </p>
            <div className="flex items-center gap-3">
              <div
                className="border p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
                onClick={handleDecreaseQuantity}
              >
                -
              </div>
              <span>{quantity}</span>
              <div
                className="border p-2 rounded-md w-6 h-6 flex justify-center items-center cursor-pointer"
                onClick={handleIncreaseQuantity}
              >
                +
              </div>
            </div>
          </div>
          <div className="w-[150px] sm:w-[300px] h-[2px] bg-gray-300 my-4"></div>
          <button
            className="px-3 py-2 bg-orange-500 rounded-xl w-[200px]"
            onClick={() => handleAddToCart(cartProduct)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-20 2xl:mt-24">
        <h2 className="text-2xl my-8">Reviews</h2>
        <div className="flex flex-col gap-20">
          {currentProduct.reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
