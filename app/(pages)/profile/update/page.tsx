'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { userSchema, UserFormData } from '@/schema/user.schema';
import { useCreateUserMutation } from '@/redux/api/user.api';
import { toast } from 'sonner';

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: 'CUSTOMER',
    },
  });

  const [success, setSuccess] = useState(false);

  const [updateProfile, { isLoading, error }] = useCreateUserMutation();
  const onSubmit = async (data: UserFormData) => {
    try {
      console.log('Submitted:', data);

      const toastId = toast.loading('Updating profile...');
      await updateProfile(data)
        .unwrap()
        .then(() => {
          toast.success('Profile updated successfully', {
            id: toastId,
          });
        })
        .catch((error) => {
          if (error.status === 'UNKOWN_ERROR') {
            toast.error('Profile update failed. Please try again.');
          } else {
            toast.dismiss(toastId);
          }
        });
      // await updateProfile(data); // your API call here
      setSuccess(true);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="w-full min-w-lg max-w-xl border  bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-green-600">Update Profile</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input {...register('firstName')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input {...register('lastName')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register('email')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input type="tel" {...register('phoneNumber')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select {...register('role')} className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>

          {success && <p className="text-green-600 mt-2 text-sm">Profile updated successfully!</p>}
        </form>
      </div>
    </div>
  );
}
