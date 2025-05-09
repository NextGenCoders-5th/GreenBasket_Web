"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import UpdateVendorStatusModal from '../_compnents/UpdateVendorStatus';
import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import { useDeleteVendorMutation, useGetVendorQuery } from '@/redux/api/vendor.api';
import { VendorStatus } from '@/enums/status.enum';
import EditVendorModal from '../_compnents/EditVendor';
import { useParams } from 'next/navigation';
import LoadingPage from '@/components/loading.page';
import NetworkErrorSection from '@/components/network-error';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VendorDetail() {

    const { vendorId } = useParams()
    const { data, isLoading, error } = useGetVendorQuery(vendorId as string)

    const vendor = data?.data.data


    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    if (error) (
        <NetworkErrorSection />
    )

    if (!vendor) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <h1 className='text-2xl font-bold text-gray-800'>Vendor Not Found</h1>
                <p className='text-gray-600'>
                    The vendor you are looking for does not exist or has been deleted.
                </p>
                <Link href="/admin/vendors" className='text-accent-500 hover:underline'>
                    Go back to vendors
                </Link>
            </div>
        )
    }

    return (
        <div className="flex justify-center flex-col items-center min-h-screen  bg-gradient-to-br from-accent-100/30 to-accent-100/45 p-4">
            <div className=" absolute top-2 px-4 md:p-8 flex items-center justify-between mb-4 w-full">
                
                <Link
                    className="inline-flex items-center justify-center px-4 py-2 gap-1 bg-accent-600/85 text-white font-medium rounded-md hover:bg-accent-600 transition"
                    href={'/admin/vendors'}
                >
                <ArrowLeft/>    Back to Vendors
                </Link>
                <div className="flex  items-center  gap-2">
                    <UpdateVendorStatusModal
                        currentStatus={vendor.status as VendorStatus}
                        vendorId={vendor.id}
                    />
                    <DeleteFeature
                        featureId={vendor.id}
                        feature="Vendor"
                        useDelete={useDeleteVendorMutation as FeatureDeleteActionType}
                        redirectUrl='/admin/vendors'
                        iconOnly
                    />
                    <EditVendorModal
                        vendor={{
                            ...vendor,
                            logo: null
                        }}
                    />

                </div>
            </div>
            <motion.div
                className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.div
                    className="flex justify-center  mb-4"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={vendor.logo_url}
                        alt={vendor.business_name}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-accent-300"
                    />
                </motion.div>

                <motion.h2
                    className="text-2xl font-bold text-center text-accent-700 mb-2"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {vendor.business_name}
                </motion.h2>

                <motion.p
                    className="text-center text-gray-600 mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    📧 {vendor.business_email}
                </motion.p>
                <motion.p
                    className="text-center text-gray-600 mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    📞 {vendor.phone_number}
                </motion.p>
                <motion.p
                    className={`text-center font-semibold ${vendor.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    {vendor.status}
                </motion.p>
            </motion.div>
        </div>
    );
}
