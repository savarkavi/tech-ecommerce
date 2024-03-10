"use server";

import User from "../models/user";
import { connectDB } from "../mongoose";

type userParams = {
  clerkId: string;
  username: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  role: string;
};

export const getUser = async (userId: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ clerkId: userId });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: userParams) => {
  try {
    await connectDB();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};
