'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vendorSchema, VendorFormData } from '@/schema/vendor.schema';
import { useCreateVendorMutation } from '@/redux/api/vendor.api';
import { useGetUsersQuery } from '@/redux/api/user.api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DropDownInput from '@/app/_components/DropdownInput';
import { ClassName } from '@/enums/classnames.enum';
import { Plus } from 'lucide-react';
import { TooltipWrapper } from '@/components/tooltip.wrapper';
import { useToast } from '@/providers/toast.provider';
import { ErrorEnum } from '@/enums/error.enum';

export default function VendorRegisterDialog() {
    const toast = useToast();
    const router = useRouter();
    const { data } = useGetUsersQuery('');
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const users = data?.data

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
    });

    const [addVendor, { isLoading }] = useCreateVendorMutation();

    const onSubmit = async (formDataRaw: VendorFormData) => {
        const formData = new FormData();
        if (!formDataRaw.phone_number.includes('+251')) {
            formDataRaw.phone_number = '+251' + formDataRaw.phone_number.slice(1);
        }
        for (const key in formDataRaw) {
            if (key !== 'logo') formData.append(key, (formDataRaw as any)[key]);
        }
        if (logo) formData.append('logo', logo);

        const toastId = toast.loading('Registering vendor...');
        await addVendor(formData)
            .unwrap()
            .then(() => {
                toast.success('Vendor registered successfully', { id: toastId });
                reset();
                setLogoPreview(null);
                setOpen(false);
                router.push('/admin/vendors');
            })
            .catch((error) => {
                if (error.status === ErrorEnum.UNKOWN_ERROR)
                    toast.error('Registration failed. Please try again.', { id: toastId });
                else {
                    toast.error(error.message || 'An error occurred', {
                        id: toastId,
                    });
                }
            });
    };

    const handleLogoPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('logo', file);
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <TooltipWrapper
                title="Add Vendor"
                className="bg-green-600"
                arroClassName='bg-green-600 fill-green-600'
            >

                <DialogTrigger asChild>
                    <button
                        className="inline-flex py-2 items-center text-sm justify-center px-4  gap-2 bg-green-500 text-white  rounded-lg hover:bg-green-600 duration-100 transition"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add</span>
                        <span className='hidden md:inline'>Vendor</span>
                    </button>
                </DialogTrigger>
            </TooltipWrapper>
            <DialogContent className="max-w-lg w-full p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-green-600">Register Vendor</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className={ClassName.LABEL}>Business Name *</label>
                        <input type="text" {...register('business_name')} className={ClassName.INPUT} />
                        {errors.business_name && <p className="text-sm text-red-600">{errors.business_name.message}</p>}
                    </div>

                    <div>
                        <label className={ClassName.LABEL}>Business Email *</label>
                        <input type="email" {...register('business_email')} className={ClassName.INPUT} />
                        {errors.business_email && <p className="text-sm text-red-600">{errors.business_email.message}</p>}
                    </div>

                    <div>
                        <label className={ClassName.LABEL}>Phone Number *</label>
                        <input type="tel" {...register('phone_number')} className={ClassName.INPUT} />
                        {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number.message}</p>}
                    </div>

                    <div>
                        <label className={ClassName.LABEL}>Business Logo *</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoPreview}
                            className="mt-1 px-2 py-2 w-full border rounded-md"
                        />
                        {errors.logo && <p className="text-sm text-red-600">{errors.logo.message as string}</p>}
                        {logoPreview && (
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="mt-2 h-16 w-16 object-cover rounded-md border"
                            />
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
                        {errors.userId && <p className="text-sm text-red-600">{errors.userId.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 transition duration-100 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register Vendor'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
