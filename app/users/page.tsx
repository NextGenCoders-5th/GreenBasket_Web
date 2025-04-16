import React, {  } from 'react';
import Image from 'next/image';
import {  useGetUsersQuery } from '../redux/api/user.api';
import LoadingPage from '../_components/Loading';
import { UserStatus } from '../types/user.type';

const UsersPage = () => {

    const {data , isLoading: loading} = useGetUsersQuery(''); 
    const  users = data?.data.data


    if(loading)
        return <LoadingPage />


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">User List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users?.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden">
                {user.profile_picture ? (
                  <Image
                    src={user.profile_picture}
                    alt={`${user.firstName} ${user.lastName}`}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 text-xl text-gray-600">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600">{user.email}</p>
              <p className={`text-sm ${user.status === UserStatus.ACTIVE ? 'text-green-500' : 'text-red-500'}`}>
                {user.status === UserStatus.ACTIVE ? 'Active' : 'Inactive'}
              </p>
              <p className="text-xs text-gray-500">
                {user.is_verified ? 'Verified' : 'Not Verified'}
              </p>

              <div className="mt-4 space-x-2">
                <button
                  className="bg-accent-500 text-white px-4 py-2 rounded-md text-sm"
                  onClick={() => alert(`Viewing user ${user.id}`)} // Replace with actual functionality
                >
                  View
                </button>
                {user.need_reset_password && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                    onClick={() => alert(`Resetting password for ${user.id}`)} // Replace with actual functionality
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default UsersPage;
