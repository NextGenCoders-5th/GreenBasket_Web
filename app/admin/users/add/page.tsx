'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/schema/user.schema';
import { useCreateUserMutation } from '@/redux/api/user.api';
import { toast } from 'sonner';
import { Loader2, UserCircle2 } from 'lucide-react';
import { ClassName } from '@/enums/classnames.enum';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  // Getting router instance
  const router = useRouter();

  // Getting form handler
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

  const [updateProfile, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data: UserFormData) => {
    try {
      const toastId = toast.loading('Adding new user...');
      if (!data.phoneNumber.includes('+')) {
        data.phoneNumber = '+251' + data.phoneNumber.slice(1);
      }
      await updateProfile(data)
        .unwrap()
        .then(() => {
          toast.success('New user added successfully', {
            id: toastId,
          });
          router.push('/admin/users');
        })
        .catch((error) => {
          if (error.status === 'UNKOWN_ERROR') toast.error('New user add failed please try again.', { id: toastId });
          else {
            toast.dismiss(toastId);
          }
        });
    } catch (error) {
      console.error('New user add failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <UserCircle2 className="w-10 h-10 text-accent-600" />
          <h1 className="text-3xl font-semibold text-gray-800">Add new user</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={ClassName.LABEL}>First Name</label>
              <input {...register('firstName')} className={ClassName.INPUT} />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className={ClassName.LABEL}>Last Name</label>
              <input {...register('lastName')} className={ClassName.INPUT} />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label className={ClassName.LABEL}>Email</label>
            <input type="email" {...register('email')} className={ClassName.INPUT} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className={ClassName.LABEL}>Phone Number</label>
            <input type="tel" {...register('phoneNumber')} className={ClassName.INPUT} />
            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className={ClassName.LABEL}>Role</label>
            <select {...register('role')} className={ClassName.INPUT}>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent-600/85 hover:bg-accent-600/90 text-white font-medium py-3 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
