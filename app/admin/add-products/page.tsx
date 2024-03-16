"use client";

import { categories, colors } from "@/constants";
import React, { useState } from "react";

type ImageType = {
  color: string;
  colorCode: string;
  image: string;
};

type ProductDataType = {
  name: string;
  desc: string;
  price: string;
  brand: string;
  category: string;
  inStock: boolean;
  images: ImageType[] | [];
};

const AddProducts = () => {
  const [productData, setProductData] = useState<ProductDataType>({
    name: "",
    desc: "",
    price: "",
    brand: "",
    category: "Phone",
    inStock: true,
    images: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setProductData((prevState) => ({
        ...prevState!,
        inStock: !prevState.inStock,
      }));

      return;
    }

    setProductData((prevState) => ({
      ...prevState!,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setProductData((prevState) => ({
      ...prevState!,
      category: value,
    }));
  };

  const handleImageChange = (val: ImageType) => {
    setProductData((prevState) => ({
      ...prevState!,
      images: [...prevState.images, val],
    }));
  };

  console.log(productData);
  return (
    <div className="flex justify-center mt-16 p-2">
      <form className="w-full p-4 border rounded-lg shadow-xl flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            className="p-3 outline-none border border-black rounded-lg w-full bg-white"
            onChange={handleInputChange}
            value={productData?.name}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            onChange={handleInputChange}
            value={productData?.price}
            className="p-3 outline-none border border-black rounded-lg w-full bg-white"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            onChange={handleInputChange}
            value={productData?.brand}
            className="p-3 outline-none border border-black rounded-lg w-full bg-white"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            onChange={handleInputChange}
            value={productData?.desc}
            className="p-3 outline-none border border-black rounded-lg w-full h-[200px] bg-white"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={productData.inStock}
            onChange={handleInputChange}
          />
          <p className="text-green-500">Is this product in stock?</p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-semibold">Select a category</h2>
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3">
            {categories
              .filter((category) => category.name !== "All")
              .map((cat) => {
                return (
                  <div
                    key={cat.name}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-3 cursor-pointer ${
                      productData.category === cat.name && "border-black"
                    }`}
                    onClick={() => handleCategoryChange(cat.name)}
                  >
                    <div>{cat.icon}</div>
                    <h2>{cat.name}</h2>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-semibold">
            Select the available colors for your product
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {colors.map((color) => {
              return (
                <div
                  key={color.name}
                  className="flex flex-col gap-2 border-b pb-4"
                >
                  <h2 className="font-semibold">{color.name}</h2>
                  <input type="file" className="text-sm" />
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProducts;
