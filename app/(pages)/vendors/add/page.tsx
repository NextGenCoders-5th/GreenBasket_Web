'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorSchema, VendorFormData } from "@/schema/vendor.schema";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SessionEnum } from "@/enums/session.enum";
import { useCreateVendorMutation } from "@/redux/api/vendor.api";
import { IUser } from "@/types/user.type";

export default function VendorRegisterPage() {

    // Getting router instance
    const router = useRouter();

    // Getting logged in user
    const user = useAppSelector(state => state.auth.user) as IUser| null;

    // Getting the vendor form handler instance and setting up the form validation
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors,  },
        reset,
    } = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
    });

    // State to handle logo preview
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    // Getting mutation for vendor registration
    const [addVendor, {isLoading, error}] = useCreateVendorMutation();
    // Function to handle form submission
    const onSubmit = async (data: VendorFormData) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, (data as any)[key]);
        }
        formData.append('userId', user?.id  as unknown as string);

        const toastId = toast.loading('Registering vendor...');
       await addVendor(formData)
            .unwrap()
            .then(() => {
                toast.success('Vendor registered successfully', {
                    id: toastId,
                });
                router.push('/vendors');
            })
            .catch((error) => {
                if (error.status === 'UNKOWN_ERROR') {
                    toast.error('Registration failed. Please try again.');
                }
                else{
                    toast.dismiss(toastId);
                }
            });
        reset();
        setLogoPreview(null);
    };

    const handleLogoPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("logo", file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    if (!user) {
        sessionStorage.setItem(SessionEnum.REDIRECT_URL, '/vendors/add');
        sessionStorage.setItem(SessionEnum.REDIRECT_MESSAGE, 'Please login to register your business as vendor');
        router.push(`/login`);
    }
    else{
        sessionStorage.removeItem(SessionEnum.REDIRECT_URL);
        sessionStorage.removeItem(SessionEnum.REDIRECT_MESSAGE);
    }

    useEffect(() => {
        console.log("Form data", getValues());
    }, [logoPreview]);

   

    return (
        <div className="  flex items-center justify-center p-4">
            <div className="w-full min-w-lg max-w-xl border  bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-green-600">Register your business as vendor</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-green-700">Business Name *</label>
                        <input
                            type="text"
                            {...register("business_name")}
                            className="mt-1 px-2 py-2 w-full rounded-md border-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.business_name && (
                            <p className="text-sm text-red-600">{errors.business_name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-700">Business Email *</label>
                        <input
                            type="email"
                            {...register("business_email")}
                            className="mt-1 px-2 py-2 w-full rounded-md border-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.business_email && (
                            <p className="text-sm text-red-600">{errors.business_email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-green-700">Phone Number *</label>
                        <input
                            type="tel"
                            {...register("phone_number")}
                            className="mt-1 px-2 py-2 w-full rounded-md border-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                        {errors.phone_number && (
                            <p className="text-sm text-red-600">{errors.phone_number.message}</p>
                        )}
                    </div>

                    

                    <div>
                        <label className="block text-sm font-medium text-green-700">Business Logo *</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("logo")}

                            onChange={handleLogoPreview}
                            className="mt-1 px-2 py-2 w-full"
                        />
                        {errors.logo && (
                            <p className="text-sm text-red-600">{errors.logo.message as string}</p>
                        )}
                        {logoPreview && (
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="mt-2 h-16 w-16 object-cover rounded-md border"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent-500 text-white font-semibold py-2 rounded-md hover:bg-accent-600 transition"
                    >
                        Register Vendor
                    </button>
                </form>
            </div>
        </div>
    );
}
