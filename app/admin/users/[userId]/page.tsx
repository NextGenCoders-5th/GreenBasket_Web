'use client';
import Image from 'next/image';
import { BadgeCheck, ShieldCheck, Mail, Phone, Calendar, KeyRound, Link } from 'lucide-react';
import { useGetUserQuery } from '@/redux/api/user.api';
import { useParams } from 'next/navigation';
import LoadingPage from '@/components/loading.page';
import { IUser } from '@/types/user.type';

const user = {
    id: 'cccb579f-e3ce-4a1d-9c44-f02bcdf0f510',
    updatedAt: '2025-04-22T06:34:55.036Z',
    createdAt: '2025-04-22T06:34:55.036Z',
    first_name: 'Edmealem',
    last_name: 'Kassahun',
    email: 'admin@test.com',
    phone_number: '+251908005801',
    password: '$2b$10$TW3sJOK4qSKQjjdhwaIA7e.pRqowkjx2fDwF1Xa4STfqVL1yiTb9S',
    profile_picture:
        'https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png',
    role: 'ADMIN',
    status: 'ACTIVE',
    authProvider: 'EMAIL',
    is_onboarding: false,
    need_reset_password: false,
};

export default function AdminUserProfile() {
    const { userId } = useParams()
    const { data, isLoading } = useGetUserQuery(userId as string, { skip: !userId })
    if (isLoading) {
        return <LoadingPage />
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="flex flex-col items-center gap-6 p-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            User not found
                        </h2>
                        <p className="text-sm text-gray-500">
                            The user you are looking for does not exist.
                        </p>
                        <Link href="/admin/users" className="text-accent-500 hover:underline">
                            Go back to users list
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    const user = data?.data.data as IUser
    return (
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col  md:flex-row items-center gap-6 p-8">
                <div className="shrink-0">
                    <Image
                        src={user.profile_picture || 'https://res.cloudinary.com/dvp1mjhd9/image/upload/v1714690850/default_profile_image.png'}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-green-500 object-cover"
                    />
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1">
                        <Phone className="w-4 h-4" />
                        {user.phone_number}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            <ShieldCheck className="w-4 h-4" />
                            {user.role}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            <BadgeCheck className="w-4 h-4" />
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                <div className="grid grid-cols-1 px-4 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className='flex items-center gap-2'>
                        <span className="font-medium text-gray-600">User ID:</span>
                        <p className="text-accent-700 italic break-all">{user.id}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className="font-medium text-gray-600">Created At:</span>
                        <p className="text-accent-700 italic">
                            {new Date(user.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className="font-medium text-gray-600">Updated At:</span>
                        <p className="text-accent-700 italic">
                            {new Date(user.updatedAt).toLocaleString()}
                        </p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className="font-medium text-gray-600">Reset Password:</span>
                        <p className="text-accent-700 italic">{user.need_reset_password ? 'Yes' : 'No'}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className="font-medium text-gray-600">Onboarding Completed:</span>
                        <p className="text-accent-700 italic">{user.is_onboarding ? 'No' : 'Yes'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
