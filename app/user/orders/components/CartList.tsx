'use client'
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LoadingPage from '@/components/loading.page';
import NetworkErrorSection from '@/components/network-error';
import { useGetMyCartsQuery } from '@/redux/api/cart.api';
import { ResponseError } from '@/types/general.types';
import { ClassName } from '@/enums/classnames.enum';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MyCartsList = () => {

    const { data, isLoading, error } = useGetMyCartsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    if (isLoading) return <LoadingPage />
    if (error) return <NetworkErrorSection error={error as ResponseError} />

    const carts = data?.data.data || [];

    if (!carts.length) return (
        <div className='text-center flex items-center flex-col  border border-red-500 justify-center h-[55vh] gap-1.5    w-full text-2xl font-semibold'>
            <p>No orders found</p>
            <Link href={"/marketplace"} className={`${ClassName.BUTTON_LINK} text-white hover:text-white hover:underline text-sm bg-accent-600/90 hover:bg-accent-600`}>
                Order Now <ArrowRight size={16} />
            </Link>
        </div>
    )

    return (
        <div className="max-w-6xl w-full mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {carts.map((item) => (
                <Card key={item.id} className="shadow-md px-0 pt-0 hover:shadow-lg transition duration-300 rounded-xl overflow-hidden">
                    <CardHeader className='p-0 flex flex-col items-stretch gap-0'>
                        <CardTitle className="text-lg p-2 bg-green-500 text-white text-center">{item.Product.name}</CardTitle>
                        <img
                            src={item.Product.image_url}
                            alt={item.Product.name}
                            className="w-full  bg-green-50  h-32 object-fill"
                        />
                    </CardHeader>
                    <CardContent className="space-y-2 p-4  flex flex-row items-start text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex flex-col p-0">
                            <div>
                                <span className="font-semibold">Price:</span> ${item.price}
                            </div>
                            <div>
                                <span className="font-semibold">Quantity:</span> {item.quantity}
                            </div>
                            <div>
                                <span className="font-semibold">Subtotal:</span> ${item.sub_total}
                            </div>
                            <div>
                                <span className="font-semibold">Created At:</span>{' '}
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                         <div className="flex flex-col justify-start">
                         <Link href={`/user/orders/${item.id}`} className={`${ClassName.BUTTON_LINK} text-white hover:text-white hover:underline text-sm bg-accent-600/90 hover:bg-accent-600`}>
                            Finish Order
                        </Link>
                        <span> Status: <span className='bg-orange-400/40 p-2 italic py-1 rounded-lg mt-2 hover:shadow-lg  text-nowrap text-sm'> Not Finished </span> </span>
                         </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default MyCartsList