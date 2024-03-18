"use client";

import { categories, colors } from "@/constants";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "@/lib/firebase";
import toast from "react-hot-toast";
import { createProduct } from "@/lib/actions/product";

type ImageType = {
  color: string;
  colorCode: string;
  image: File | string | null;
};

type ProductDataType = {
  name: string;
  desc: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: ImageType[];
};

const AddProducts = () => {
  const [productData, setProductData] = useState<ProductDataType>({
    name: "",
    desc: "",
    price: 0,
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
    if (productData.images.length === 0) {
      setProductData((prev) => ({
        ...prev,
        images: [val],
      }));

      return;
    }

    const updatedImages = productData.images.map((img) => {
      if (img.color === val.color) {
        return { ...img, image: val.image };
      } else {
        return img;
      }
    });

    const isValPresent = updatedImages.some((img) => img.color === val.color);

    if (!isValPresent) {
      setProductData((prev) => ({
        ...prev,
        images: [...updatedImages, val],
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (productData.images.length === 0) {
      return toast.error("Please add atleast one product image");
    }

    const handleImageUpload = async () => {
      toast("Adding product, please wait...");

      let imageUrls: ImageType[] = [];

      try {
        for (const item of productData.images) {
          if (item.image !== null && typeof item.image !== "string") {
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${item.image.name}`);

            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log(error);
                  reject(error);
                },
                async () => {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  imageUrls.push({ ...item, image: downloadURL });
                  resolve(downloadURL);
                  setProductData((prev) => ({
                    ...prev,
                    images: imageUrls,
                  }));
                }
              );
            });
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload the product image");
      }
    };

    await handleImageUpload();

    try {
      await createProduct(productData);
      toast.success("Product created!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the product");
    }
  };

  const handleRemoveImage = (img: string) => {
    const updatedImages = productData.images.filter(
      (item) => item.color !== img
    );

    setProductData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  return (
    <div className="flex justify-center mt-16 p-2 max-w-[800px] mx-auto">
      <form
        className="w-full p-4 border rounded-lg shadow-xl flex flex-col gap-8"
        onSubmit={handleSubmitForm}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            className="p-3 outline-none border border-black rounded-lg w-full bg-white"
            onChange={handleInputChange}
            value={productData?.name}
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={handleInputChange}
            value={productData?.price}
            className="p-3 outline-none border border-black rounded-lg w-full bg-white"
            required
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
            required
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
            required
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
                  <div>
                    <label htmlFor={color.name}>
                      {productData.images.find(
                        (img) => img.color === color.name
                      ) ? (
                        <div className="flex items-center gap-6">
                          <p>Image selected</p>
                          <button
                            className="border border-gray-500 text-sm p-1 rounded-lg"
                            onClick={() => handleRemoveImage(color.name)}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <input
                          type="file"
                          id={color.name}
                          className="text-sm"
                          onChange={(e) =>
                            handleImageChange({
                              color: color.name,
                              colorCode: color.code,
                              image: e.target.files && e.target.files[0],
                            })
                          }
                        />
                      )}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button className="bg-orange-500 px-3 py-2 rounded-lg">Submit</button>
      </form>
    </div>
  );
};
export default AddProducts;
