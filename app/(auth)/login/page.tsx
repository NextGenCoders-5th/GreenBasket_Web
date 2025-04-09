'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/schema/autg.schema";
import { ILoginRequest } from "@/app/@types/auth.type";




export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILoginRequest) => {
    console.log("Form submitted:", data);
    // You can send the data to your API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email or Phone Number
          </label>
          <input
            {...register("identifier")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="example@gmail.com or +2519xxxxxxx"
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer   bg-accent-600/95 hover:bg-accent-600 text-white py-2 px-4 rounded-md"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
