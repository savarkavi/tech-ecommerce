"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

type InputType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<InputType> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex flex-col gap-6 mt-28 items-center">
        <h1 className="text-2xl font-semibold">Sign In for Tech Cart</h1>
        <div className="flex gap-2 justify-center bg-slate-100 px-2 py-4 rounded-lg w-full shadow-lg">
          <Image
            src="/google-icon.svg"
            alt="google logo"
            width={12}
            height={12}
          />
          <span>Sign In with Google</span>
        </div>
        <p>OR</p>
        <form
          className="flex flex-col gap-10 bg-gray-100 shadow-xl p-6 rounded-lg"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              className="p-2 border w-full rounded-lg outline-none"
            />
            <p className="text-sm text-red-500">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              className="p-2 border w-full rounded-lg outline-none"
            />
            <p className="text-sm text-red-500">
              {errors.password && errors.password.message}
            </p>
          </div>
          <button className="bg-orange-500 p-2 rounded-lg">Sign In</button>
        </form>
        <p>
          New user? <span className="underline">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
