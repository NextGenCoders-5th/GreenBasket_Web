'use client';
import Debugger from '@/app/_components/Debugger';
import { useGetVendorOrdersQuery } from '@/redux/api/order.api'
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import React, { useEffect, useRef } from 'react'
import VendorOrdersList from './components/order-list';
import LoadingPage from '@/components/loading.page';
import { useGetProductsQuery } from '@/redux/api/product.api';
import { Order } from '@/types/or.type';

const VendorOrdersPage = () => {
  const user = useAppSelector((state) => state.auth.user) as IUser | null;
  const { data, isLoading, error } = useGetVendorOrdersQuery(user?.vendor?.id || "", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });


  const orders = data?.data.data || [];





  const contentRef = useRef<HTMLPreElement>(null);
  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    <div className="flex h-screen items-center justify-center flex-col">
      <p className="text-red-500">
        Error loading orders: {('message' in error && error.message) || 'An unknown error occurred'}
      </p>
      <button onClick={() => window.location.reload()} className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
        Retry
      </button>
    </div>
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='w-full bg-white flex items-center flex-col justify-start h-[55vh] gap-1.5 text-2xl font-semibold'>
        <p>No orders found</p>
      </div>
    );
  }


  return (
    <div className='w-full bg-white flex items-center flex-col justify-start h-[55vh] gap-1.5 text-2xl font-semibold'>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error loading orders</p>}
      <Debugger
        copyContentRef={contentRef}
      >
        <pre ref={contentRef}>
          {
            JSON.stringify(orders || error, null, 2)
          }
        </pre>
      </Debugger> */}
      <VendorOrdersList orders={orders} />
    </div>
  )
}

export default VendorOrdersPage