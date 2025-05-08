import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUpdateVendorMutation } from '@/redux/api/vendor.api';
import { toast } from 'sonner';
import DropDownInput from '@/app/_components/DropdownInput';
import { useForm } from 'react-hook-form';
import { ClassName } from '@/enums/classnames.enum';
import { editVendorSchema, VendorFormData } from '@/schema/vendor.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useGetUsersQuery } from '@/redux/api/user.api';
import { IVendor } from '@/types/vendor.type';
import { Pencil } from 'lucide-react';

interface Props {
  vendor: IVendor;
}

export default function EditVendorModal({ vendor }: Props) {
  const [open, setOpen] = useState(false);
  const [editVendor, { isLoading }] = useUpdateVendorMutation();
  const router = useRouter();
  const { data } = useGetUsersQuery('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<VendorFormData>({
    resolver: zodResolver(editVendorSchema),
    defaultValues: { ...vendor },
  });

  const onSubmit = async (data: VendorFormData) => {
    if (!data.phone_number.includes('+251')) {
      data.phone_number = '+251' + data.phone_number.slice(1);
    }
    const toastId = toast.loading('Updating vendor...');
    await editVendor({ vendorId: vendor.id, vendorData: data })
      .unwrap()
      .then(() => {
        toast.success('Vendor updated successfully', { id: toastId });
        reset();
        router.push('/admin/vendors');
        setOpen(false);
      })
      .catch((error) => {
        if (error.status === 'UNKOWN_ERROR') {
          toast.error('Updating failed. Please try again.');
        } else {
          toast.dismiss(toastId);
        }
      });
  };

  const users = data?.data;

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={`${ClassName.BUTTON} bg-blue-500/90 hover:bg-blue-500`}
          title="Edit User"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Update Vendor Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={ClassName.LABEL}>Business Name *</label>
            <input type="text" {...register('business_name')} className={ClassName.INPUT} />
            {errors.business_name && (
              <p className="text-sm text-red-600">{errors.business_name.message}</p>
            )}
          </div>

          <div>
            <label className={ClassName.LABEL}>Business Email *</label>
            <input type="email" {...register('business_email')} className={ClassName.INPUT} />
            {errors.business_email && (
              <p className="text-sm text-red-600">{errors.business_email.message}</p>
            )}
          </div>

          <div>
            <label className={ClassName.LABEL}>Phone Number *</label>
            <input type="tel" {...register('phone_number')} className={ClassName.INPUT} />
            {errors.phone_number && (
              <p className="text-sm text-red-600">{errors.phone_number.message}</p>
            )}
          </div>

          <div>
            <label className={ClassName.LABEL}>Vendor Manager</label>
            <DropDownInput
              placeholder="Select User"
              {...register('userId')}
              setValue={(value: string) => setValue('userId', value)}
              options={
                users?.map((user) => ({
                  label: `${user.first_name || ''} ${user.email}`,
                  value: user.id,
                })) || [{ label: 'No user found', value: '_' }]
              }
            />
            {errors.userId && (
              <p className="text-sm text-red-600">{errors.userId.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              onClick={handleCancel}
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
              {isLoading ? 'Editing...' : 'Edit Vendor'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
