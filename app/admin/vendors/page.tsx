'use client';
import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import SortDropdown from '@/app/_components/Dropdown';
import { ClassName } from '@/enums/classnames.enum';
import Link from 'next/link';
import { useDeleteVendorMutation, useGetVendorsQuery } from '@/redux/api/vendor.api';
import LoadingPage from '@/components/loading.page';
import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import UpdateVendorStatusModal from './_compnents/UpdateVendorStatus';
import { VendorStatus } from '@/enums/status.enum';
import EditVendorModal from './_compnents/EditVendor';

const vendors = [
  {
    id: '1a59c18a-0915-49d0-ac99-805c4591b402',
    business_name: 'Test Business',
    business_email: 'busines@test.com',
    phone_number: '+251908005802',
    logo_url: 'https://res.cloudinary.com/dvp1mjhd9/image/upload/v1744938281/ysmaqbtkrwaftn40j6i2.png',
    status: 'APPROVED',
  },
  // Add more vendors if needed
];

export default function VendorsPage() {
  const [search, setSearch] = useState('');

  // Fetch users from the API
  const { data, isLoading: loading } = useGetVendorsQuery('');

  if (loading) return <LoadingPage />;

  const vendors = data?.data.data;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Vendors</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${ClassName.INPUT} w-full sm:w-64 px-4 py-2 border rounded-md shadow-sm `}
          />
          <SortDropdown
            options={[
              { label: 'Name (A-Z)', value: 'name_asc' },
              { label: 'Name (Z-A)', value: 'name_desc' },
              { label: 'Email (A-Z)', value: 'email_asc' },
              { label: 'Email (Z-A)', value: 'email_desc' },
            ]}
          />
          <Link
            className="inline-flex items-center justify-center px-4 py-0 gap-1 bg-accent-600/85 text-white font-medium rounded-md hover:bg-accent-600 transition"
            href={'/admin/vendors/add'}
          >
            <Plus className="w-4 h-4 " />
            <span className='hidden sm:inline'>Add </span>
          </Link>
        </div>
      </div>

      {/* Vendor Cards */}
      {!!vendors?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white  relative rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex absolute items-center top-2 right-2 gap-2">
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
                vendor={vendor}
                />

              </div>
              <img src={vendor.logo_url} alt={`${vendor.business_name} Logo`} className="w-20 h-20 object-contain mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 text-center">{vendor.business_name}</h2>
              <p className="text-sm text-gray-600 text-center">{vendor.business_email}</p>
              <p className="text-sm text-gray-600 text-center">{vendor.phone_number}</p>
              <div className="flex justify-center mt-4">
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${vendor.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {vendor.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No vendors found.</p>
      )}
    </div>
  );
}
