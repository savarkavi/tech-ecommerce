import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.log("Mongo URL not found");
    return;
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
