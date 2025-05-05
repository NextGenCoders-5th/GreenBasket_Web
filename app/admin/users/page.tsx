'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import SortDropdown from '@/app/_components/Dropdown'
import { useGetUsersQuery } from '@/redux/api/user.api'
import LoadingPage from '@/components/loading.page'
import Link from 'next/link'

const users = [
  {
    id: "cccb579f-e3ce-4a1d-9c44-f02bcdf0f510",
    first_name: "Edmealem",
    last_name: "Kassahun",
    email: "admin@test.com",
    phone_number: "+251908005801",
    profile_picture: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png",
    role: "ADMIN",
    status: "ACTIVE",
    is_onboarding: false,
  },
  {
    id: "4aa07551-9dd9-4169-8277-323eaa780dd2",
    first_name: "Abebe",
    last_name: "Kebede",
    email: "test@test.com",
    phone_number: "+251948006129",
    profile_picture: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png",
    role: "CUSTOMER",
    status: "ACTIVE",
    is_onboarding: false,
  },
  {
    id: "16693821-9088-44bc-a851-7fd5edef498b",
    first_name: "VAbebe",
    last_name: "Kebede",
    email: "vendor@test.com",
    phone_number: "+251908005802",
    profile_picture: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png",
    role: "VENDOR",
    status: "ACTIVE",
    is_onboarding: false,
  },
  {
    id: "b25c8290-b38b-4b98-b2b4-3381634be9a4",
    first_name: null,
    last_name: null,
    email: "ezratgab@gmail.com",
    phone_number: "+251 97 701 8300",
    profile_picture: null,
    role: "CUSTOMER",
    status: "ACTIVE",
    is_onboarding: true,
  },
]

const getRoleColor = (role: string) => {
  switch (role) {
    case 'ADMIN': return 'bg-red-100 text-red-700'
    case 'VENDOR': return 'bg-yellow-100 text-yellow-700'
    default: return 'bg-blue-100 text-blue-700'
  }
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Fetch users from the API
  const { data, isLoading: loading } = useGetUsersQuery('');
  const users = data?.data || [];


  if (loading) return <LoadingPage />;  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex items-center justify-between w-full mb-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md focus:ring-1 focus:ring-accent-100/50 focus:border-accent-100/50"
        />
        <SortDropdown />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-accent-100/25 shadow rounded-xl">
          <thead className="bg-accent-100 text-gray-600 text-left text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">
                  Name 
              </th>
              <th className="px-6 py-3">
                  Email 
              </th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Onboarding</th>
              <th className="px-6 py-3">Actions </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {users?.map(user => (
              <tr key={user.id} className='hover:bg-accent-100/60 cursor-pointer'>
                <td className="px-6 py-1">
                  <Image
                    src={user.profile_picture || 'https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-1">{user.first_name || 'Unnamed'} {user.last_name || ''}</td>
                <td className="px-6 py-1">{user.email}</td>
                <td className="px-6 py-1">{user.phone_number}</td>
                <td className="px-6 py-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-1">{user.status}</td>
                <td className="px-6 py-1">
                  {user.is_onboarding ? (
                    <span className="text-orange-600 font-medium text-xs">Yes</span>
                  ) : (
                    <span className="text-gray-400 text-xs">No</span>
                  )}
                </td>
                <td className="px-6 py-1">
                  <Link href={'/admin/users/'+user.id}  className="text-xs">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
