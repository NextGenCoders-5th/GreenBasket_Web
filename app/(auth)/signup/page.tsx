'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema, SignupSchemaType } from '@/app/schema/auth.schema';
import { useSignUpMutation } from '@/app/redux/api/auth.api';
import { toast } from 'sonner';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();
  const [signUp, {isLoading, error}] = useSignUpMutation()
  const onSubmit = async (data: SignupSchemaType) => {
    console.log('Submitted Data:', data);
    try {
       await signUp(data).unwrap()
      .then((response) => {
        console.log("Login successful:", response);
        toast.success("Login successful!");
        router.push('/login');
      })
      .catch((error) => {
        if (error.status === 'UNKOWN_ERROR') {
          toast.error("Login failed. Please try again.");
        }
        console.error("Login failed:", error);
      });
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              {...register('phoneNumber')}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="+251..."
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="********"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register('passwordConfirm')}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
              placeholder="********"
            />
            {errors.passwordConfirm && <p className="text-sm text-red-500">{errors.passwordConfirm.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-400/95 disabled:cursor-not-allowed disabled:bg-green-400/90 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
