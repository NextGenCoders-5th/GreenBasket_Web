'use client'; 
import Debugger from '@/app/_components/Debugger';
import { useGetMyOrdersQuery, useGetOrdersQuery, useGetVendorOrdersQuery } from '@/redux/api/order.api'
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import React, { useRef } from 'react'

const VendorOrdersPage = () => {
  const user = useAppSelector((state) => state.auth.user) as IUser | null;
  const { data, isLoading, error } = useGetVendorOrdersQuery(user?.vendor?.id ||"", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,


  });

  const contentRef = useRef<HTMLPreElement>(null);

  return (
    <div className='w-full bg-white flex items-center flex-col justify-start h-[55vh] gap-1.5 text-2xl font-semibold'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading orders</p>}
      <Debugger
        copyContentRef={contentRef}
      >
        <pre ref={contentRef}>
          {
            JSON.stringify(data?.data.data || error, null, 2)
          }
        </pre>
      </Debugger>
    </div>
  )
}

export default VendorOrdersPage