'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import SortDropdown from '@/app/_components/Dropdown';
import { ClassName } from '@/enums/classnames.enum';
import Link from 'next/link';
import { useDeleteVendorMutation, useGetVendorsQuery } from '@/redux/api/vendor.api';
import LoadingPage from '@/components/loading.page';
import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import UpdateVendorStatusModal from './_compnents/UpdateVendorStatus';
import { VendorStatus } from '@/enums/status.enum';
import EditVendorModal from './_compnents/EditVendor';
import VendorRegisterDialog from './_compnents/AddVendor';
import Image from 'next/image';
import { TooltipWrapper } from '@/components/tooltip.wrapper';

export default function VendorsPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading: loading } = useGetVendorsQuery('');

  if (loading) return <LoadingPage />;

  const vendors = data?.data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">Vendors</h1>

        <div className="flex flex-col items-center sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${ClassName.INPUT} w-full sm:w-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-accent-400 transition`}
          />
          <SortDropdown
            options={[
              { label: 'Name (A-Z)', value: 'name_asc' },
              { label: 'Name (Z-A)', value: 'name_desc' },
              { label: 'Email (A-Z)', value: 'email_asc' },
              { label: 'Email (Z-A)', value: 'email_desc' },
            ]}
          />
          <VendorRegisterDialog />
        </div>
      </div>

      {/* Vendor Cards */}
      {!!vendors?.length ? (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white flex flex-col justify-between rounded-2xl shadow-md p-5 hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                {/* Action Buttons */}
                <div className="w-full flex flex-wrap justify-end items-center gap-2 mb-4">
                  <UpdateVendorStatusModal
                    currentStatus={vendor.status as VendorStatus}
                    vendorId={vendor.id}
                  />
                  <DeleteFeature
                    featureId={vendor.id}
                    feature="Vendor"
                    useDelete={useDeleteVendorMutation as FeatureDeleteActionType}
                    redirectUrl="/admin/vendors"
                    iconOnly
                  />
                  <EditVendorModal vendor={vendor} />
                  <TooltipWrapper
                    title='View Vendor'

                    className="bg-green-600"
                    arroClassName='bg-green-600 fill-green-600'
                  >

                    <Link
                      href={`/admin/vendors/${vendor.id}`}
                      className={`${ClassName.BUTTON} bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition`}
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </TooltipWrapper>
                </div>

                {/* Vendor Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-2 sm:p-4">
                  <Image
                    src={vendor.logo_url}
                    width={100}
                    height={100}
                    alt={`${vendor.business_name} Logo`}
                    className="w-24 h-24 object-contain rounded-full shadow"
                  />
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full overflow-hidden">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      {vendor.business_name}
                    </h2>
                    <p className="text-sm text-gray-600 truncate">{vendor.business_email}</p>
                    <p className="text-sm text-gray-600 truncate">{vendor.phone_number}</p>
                    <div className="flex justify-center sm:justify-start mt-3">
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${vendor.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      ) : (
        <p className="text-gray-500 text-center mt-10">No vendors found.</p>
      )}
    </div>
  );
}
