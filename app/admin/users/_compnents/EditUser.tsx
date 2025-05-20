'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/schema/user.schema';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/user.api';
import { useToast } from '@/providers/toast.provider';
import { Loader2, Pencil, Plus, UserCircle2 } from 'lucide-react';
import { ClassName } from '@/enums/classnames.enum';
import { useParams, useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Role } from '@/enums/role.enum';
import { IUser } from '@/types/user.type';


export default function EditUserDialog() {
  // TOAST:- toast instance to toast message

  const toast = useToast();
  const [open, setOpen] = useState(false)
  const router = useRouter();

  const { userId } = useParams();
  const { data, isLoading: fetching } = useGetUserQuery(userId as string, { skip: !userId });

  const user = data?.data.data as IUser

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,

  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phoneNumber: user?.phone_number,
      role: user?.role,
    },
  });

  // useffect to set default values
  useEffect(() => {
    reset({
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phoneNumber: user?.phone_number,
      role: user?.role,
    })
  }, [user])

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (data: UserFormData) => {
    const toastId = toast.loading('Saving  user...');
    try {
      if (!data.phoneNumber.includes('+')) {
        data.phoneNumber = '+251' + data.phoneNumber.slice(1);
      }
      await updateUser({
        userId: user.id,
        userData: { ...data, role: data.role as Role }
      })
        .unwrap()
        .then(() => {
          toast.success('User saved successfully', { id: toastId });
          reset();
          setOpen(false)
          router.push('/admin/users');
        })
        .catch((error) => {
          if (error.status === 'UNKOWN_ERROR')
            toast.error(' Saving user failed, please try again.', { id: toastId });
          else {
            toast.error(error.message || ' Saving user failed, please try again.', { id: toastId });
          }
        });
    } catch (error) {
      console.error('User saving failed:', error);
      toast.error(' Saving user failed, please try again.', { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={` ${ClassName.BUTTON} bg-blue-500/90 hover:bg-blue-500`} title="Edit User">
          <Pencil className="w-4 h-4" />
          <span className="hidden sm:inline">Edit User</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className='flex flex-row items-center justify-between px-2.5' >
          <DialogTitle className="flex items-center gap-2 text-green-700">
            <UserCircle2 className="w-6 h-6" />
            Edit New User
          </DialogTitle>
          {isDirty && <button
            onClick={() => {
              reset({
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                phoneNumber: user?.phone_number,
                role: user?.role,
              })
            }}
            className={` ${ClassName.BUTTON} py-0 text-sm bg-red-500/90 hover:bg-red-500`}
          >
            Discard Changes
          </button>
          }
        </DialogHeader>

        {
          fetching ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='animate-spin text-accent-500' />
            </div>
          )
            :
            (
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

                <div className="flex flex-col items-center justify-end sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-accent-600 text-white hover:bg-accent-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </form>
            )
        }
      </DialogContent>
    </Dialog>
  );
}
