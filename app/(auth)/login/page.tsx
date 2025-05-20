'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/auth.schema';
import { ILoginRequest } from '@/types/auth.type';
import Link from 'next/link';
import { useLoginMutation } from '@/redux/api/auth.api';
import { useToast } from '@/providers/toast.provider';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useRouter } from 'next/navigation';
import { SessionEnum } from '@/enums/session.enum';
import { useAppSelector } from '@/redux/store';

export default function LoginPage() {
    // TOAST: toast instance to toast messages
    const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);

  console.log(user);

  // Getting dispacher from redux
  const dispatch = useDispatch();

  // Getting router instance
  const router = useRouter();

  // Getting redirect url from session storage
  const redirect = sessionStorage.getItem(SessionEnum.REDIRECT_URL);

  // Getting the login form handler instance and setting up the form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  // Using the login mutation from the auth api slice
  const [login, { isLoading, error }] = useLoginMutation();
  const onSubmit = (data: ILoginRequest) => {
    const toastId = toast.loading('Logging in...');
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
        toast.success('Login successful', {
          id: toastId,
        });


        if (redirect && redirect !== '/login' && typeof redirect === 'string') {
          sessionStorage.removeItem(SessionEnum.REDIRECT_URL);
          router.push(redirect);
          return;
        }
        router.push('/marketplace'); // Redirect to the home page or any other page
      })
      .catch((err) => {
        console.log('Login failed:', err);
        if (err.status === 'UNKOWN_ERROR') {
          toast.error('Login failed. Please try again.', {
            id: toastId,
          });
        } else {
          toast.error(err.message || "Login failed. Please try again", {id: toastId})
        }
      });
  };

  // useEffect to show redirect reason
  useEffect(() => {
    if (redirect) {
      const message = sessionStorage.getItem(SessionEnum.REDIRECT_MESSAGE);
      if (message) {
        toast.error(message);
        sessionStorage.removeItem(SessionEnum.REDIRECT_MESSAGE);
      }
    }
  }, [redirect]);

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

          <button
            disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer   bg-accent-500/95 hover:bg-green-500 text-white py-2 px-4 rounded-md disabled:bg-accent-500/50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              onClick={() => {
                if (redirect) {
                  sessionStorage.removeItem(SessionEnum.REDIRECT_MESSAGE);
                }
              }}
              href={`/signup`}
              className="text-blue-500 hover:underline"
            >
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
