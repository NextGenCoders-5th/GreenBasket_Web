'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/schema/user.schema';
import { useCreateUserMutation } from '@/redux/api/user.api';
import { useToast } from '@/providers/toast.provider';
import { Loader2, Plus, UserCircle2 } from 'lucide-react';
import { ClassName } from '@/enums/classnames.enum';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AddUserDialog() {
  // TOAST: toast instance to toast messages
  const toast = useToast();
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    const toastId = toast.loading('Adding new user...');
    try {
      if (!data.phoneNumber.includes('+')) {
        data.phoneNumber = '+251' + data.phoneNumber.slice(1);
      }
      await updateProfile(data)
        .unwrap()
        .then(() => {
          toast.success('New user added successfully', { id: toastId });
          reset();
          setOpen(false)
          router.push('/admin/users');
        })
        .catch((error) => {
          if (error.status === 'UNKOWN_ERROR')
            toast.error('New user add failed, please try again.', { id: toastId });
          else {
            toast.error(error.message || 'New user add failed, please try again.', { id: toastId });
          }
        });
    } catch (error) {
      console.error('New user add failed:', error);
      toast.error('New user add failed, please try again.', { id: toastId });

    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <button  className={`${ClassName.BUTTON} bg-accent-600/90 text-white hover:bg-accent-600`}>
            <Plus size={20} /> Add
       </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-700">
            <UserCircle2 className="w-6 h-6" />
            Add New User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={ClassName.LABEL}>First Name</label>
              <input {...register('firstName')} className={ClassName.INPUT} />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className={ClassName.LABEL}>Last Name</label>
              <input {...register('lastName')} className={ClassName.INPUT} />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className={ClassName.LABEL}>Email</label>
            <input type="email" {...register('email')} className={ClassName.INPUT} />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={ClassName.LABEL}>Phone Number</label>
            <input type="tel" {...register('phoneNumber')} className={ClassName.INPUT} />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className={ClassName.LABEL}>Role</label>
            <select {...register('role')} className={ClassName.INPUT}>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 text-white"
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : (
              'Add User'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
