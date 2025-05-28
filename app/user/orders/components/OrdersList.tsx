    import Debugger from '@/app/_components/Debugger';
    import SearchInput from '@/app/_components/SearchInput';
    import LoadingPage from '@/components/loading.page';
    import NetworkErrorSection from '@/components/network-error';
    import { Button } from '@/components/ui/button';
    import { ClassName } from '@/enums/classnames.enum';
    import { useGetMyCartsQuery } from '@/redux/api/cart.api';
    import { ResponseError } from '@/types/general.types';
    import { ArrowRight, Link } from 'lucide-react';
    import React from 'react'
    import OrderTracking from './OrderTraking';
import { useGetMyOrdersQuery } from '@/redux/api/order.api';

    const OrdersList = () => {

        const { data, isLoading, error } = useGetMyOrdersQuery(undefined, {
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        });

        if (isLoading) return <LoadingPage />
        if (error) return <NetworkErrorSection error={error as ResponseError} />

        const orders = data?.data.data || [];

        if (!orders) return (
            <div className='text-center flex items-center flex-col  border border-red-500 justify-center h-[55vh] gap-1.5    w-full text-2xl font-semibold'>
                <p>No orders found</p>
                <Link href={"/marketplace"} className={`${ClassName.BUTTON_LINK} text-white hover:text-white hover:underline text-sm bg-accent-600/90 hover:bg-accent-600`}>
                    Order Now <ArrowRight size={16} />
                </Link>
            </div>
        )

        return (
            <div className='w-full bg-white flex  items-center flex-col  border border-red-500 justify-start h-[55vh] gap-1.5    text-2xl font-semibold'>
                <Debugger
            >
                <pre>
                    {
                        JSON.stringify(orders || error , null, 2)
                    }
                </pre>
            </Debugger>

                {/* <Debugger>
                    <img src="/image.png" alt="" className='w-5xl object-top object-cover' />
                </Debugger> */}

                <div className="flex items-start justify-center">

                    <div className="flex flex-col items-center justify-start">

                        <div className="flex w-full items-center justify-between p-4">
                            <p className='font-normal'>Order List</p>

                            {/* Search */}
                            <div className="flex items-center gap-1">
                                <SearchInput className='text-sm' />
                                <Button>Add</Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto p-6 bg-white rounded-xl shadow-md">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="text-sm font-semibold text-gray-500 border-b">
                                        <th className="px-4 py-2 text-left">Item</th>
                                        <th className="px-4 py-2 text-left">Category</th>
                                        <th className="px-4 py-2 text-left">Tracking ID</th>
                                        <th className="px-4 py-2 text-left">Price</th>
                                        <th className="px-4 py-2 text-left">Color</th>
                                        <th className="px-4 py-2 text-left">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-700">
                                    <tr className="border-b hover:bg-gray-50 transition">
                                        <td className="flex items-center gap-4 px-4 py-3">
                                            <img src="/profile.png" alt="Alarm Clock" className="w-12 h-12 rounded-md object-cover" />
                                            <div>
                                                <div className="font-medium text-gray-900">Alarm Clock</div>
                                                <div className="text-xs text-gray-400">Dolce &amp; Gabbana</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">Electronics</td>
                                        <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">SPK1218153635</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">$1,249</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">Navy Blue</span>
                                        </td>
                                        <td className="px-4 py-3">1</td>
                                    </tr>

                                    <tr className="border-b hover:bg-gray-50 transition">
                                        <td className="flex items-center gap-4 px-4 py-3">
                                            <img src="/profile.png" alt="Ladies Stylish Shoe" className="w-12 h-12 rounded-md object-cover" />
                                            <div>
                                                <div className="font-medium text-gray-900">Ladies Stylish Shoe</div>
                                                <div className="text-xs text-gray-400">Adidas</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">Footware</td>
                                        <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">SPK3789423789</td>
                                        <td className="px-4 py-3 font-semibold text-gray-900">$499</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">Orange</span>
                                        </td>
                                        <td className="px-4 py-3">2</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>

                    </div>
                    <OrderTracking />
                </div>
            </div>

        )
    }

    export default OrdersList