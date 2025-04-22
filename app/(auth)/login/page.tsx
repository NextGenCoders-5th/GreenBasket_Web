'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/auth.schema';
import { ILoginRequest } from '@/types/auth.type';
import Link from 'next/link';
import { useLoginMutation } from '@/redux/api/auth.api';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const onSubmit = (data: ILoginRequest) => {
    login(data)
      .unwrap()
      .then((response) => {
        console.log('Login successful:', response);
        dispatch(
          setCredentials({
            user: response.data.data.user,
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
          }),
        );
        toast.success('Login successful!');
        router.push('/marketplace'); // Redirect to the home page or any other page
      })
      .catch((error) => {
        if (error.status === 'UNKOWN_ERROR') {
          toast.error('Login failed. Please try again.');
        }
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className=" bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <pre>{error && JSON.stringify(error, null, 2)}</pre>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Email or Phone Number</label>
            <input
              {...register('identifier')}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="example@gmail.com or +2519xxxxxxx"
            />
            {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full cursor-pointer   bg-green-400/95 hover:bg-green-400 text-white py-2 px-4 rounded-md">
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
