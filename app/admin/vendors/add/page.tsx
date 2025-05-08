'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vendorSchema, VendorFormData } from '@/schema/vendor.schema';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCreateVendorMutation } from '@/redux/api/vendor.api';
import { useGetUsersQuery } from '@/redux/api/user.api';
import DropDownInput from '@/app/_components/DropdownInput';
import { ClassName } from '@/enums/classnames.enum';

export default function VendorRegisterPage() {
    // Getting router instance
    const router = useRouter();

    const { data } = useGetUsersQuery('');

    // Getting the vendor form handler instance and setting up the form validation
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
    });

    // State to handle logo preview
    const [logo ,setLogo] = useState<File| null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    // Getting mutation for vendor registration
    const [addVendor, { isLoading, error }] = useCreateVendorMutation();
    // Function to handle form submission
    const onSubmit = async (data: VendorFormData) => {
        const formData = new FormData();
        if(!data.phone_number.includes("+251")){
            data.phone_number = "+251"+data.phone_number.slice(1)
        }
        for (const key in data  ) {
            if(key !== 'logo')
            formData.append(key, (data as any)[key]);
        }
        if(logo)
        formData.append("logo", logo)

        const toastId = toast.loading('Registering vendor...');
        await addVendor(formData)
            .unwrap()
            .then(() => {
                toast.success('Vendor registered successfully', {
                    id: toastId,
                });
                reset();
                router.push('/admin/vendors');
            })
            .catch((error) => {
                if (error.status === 'UNKOWN_ERROR') {
                    toast.error('Registration failed. Please try again.');
                } else {
                    toast.dismiss(toastId);
                }
            });
        setLogoPreview(null);
    };

    const handleLogoPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('logo', file);
            setLogo(file)
            setLogoPreview(URL.createObjectURL(file));
        }
    };
    const users = data?.data;

    return (
        <div className="  flex items-center justify-center p-4">
            <div className="w-full min-w-lg max-w-xl border  bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-green-600">Register  vendor as vendor</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className={ClassName.LABEL}>Business Name *</label>
                        <input type="text" {...register('business_name')}
                            className={ClassName.INPUT}
                        />
                        {errors.business_name && <p className="text-sm text-red-600">{errors.business_name.message}</p>}
                    </div>

                    <div>

                        <label className={ClassName.LABEL}>Business Email *</label>
                        <input
                            type="email"
                            {...register('business_email')}
                            className={ClassName.INPUT}
                        />
                        {errors.business_email && <p className="text-sm text-red-600">{errors.business_email.message}</p>}
                    </div>

                    <div>
                        <label className={ClassName.LABEL}>Phone Number *</label>
                        <input type="tel" {...register('phone_number')} className={ClassName.INPUT} />
                        {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number.message}</p>}
                    </div>

                    <div>
                        <label className={ClassName.LABEL}>Business Logo *</label>
                        <input  type="file" accept="image/*" {...register('logo')} onChange={handleLogoPreview} className="mt-1 px-2 border  py-2 w-full" />
                        {errors.logo && <p className="text-sm text-red-600">{errors.logo.message as string}</p>}
                        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 h-16 w-16 object-cover rounded-md border" />}
                    </div>
                    <div>
                        <label className={ClassName.LABEL}>Vendor Manager</label>
                        <DropDownInput
                            placeholder="Select User"
                            {...register("userId")}
                            setValue={(value: string) => {
                                setValue('userId', value);
                            }}
                            options={
                                users?.map((user) => ({
                                    label: `${user.first_name || ""} ${user.email}`,
                                    value: user.id,
                                })) || [
                                    {
                                        label: 'No user found',
                                        value: '_',
                                    },
                                ]
                            }
                        />

                        {errors.userId && <p className="text-sm text-red-600">{errors.userId.message}</p>}
                    </div>

                    <button disabled={isLoading} type="submit" className={ ` ${ClassName.BUTTON} w-full items-center justify-center bg-accent-600/80 text-white  hover:bg-accent-600 transition`}>
                        {
                            isLoading 
                            ?
                            "Registering"
                            :
                            "Register Vendor"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
