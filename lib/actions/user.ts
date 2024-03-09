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

export const createUser = async (user: userParams) => {
  try {
    await connectDB();
    const newUser = await User.create(user);

    return newUser;
  } catch (error) {
    console.log(error);
  }
};
