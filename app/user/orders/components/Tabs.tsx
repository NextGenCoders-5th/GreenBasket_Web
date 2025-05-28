'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OrdersList from './OrdersList';
import { useSearchParams } from 'next/navigation';


const orderTabs = [
  { value: 'ALL', label: 'All', content: <OrdersList /> },
  { value: 'PENDING', label: 'Pending', content:  <OrdersList /> },
  { value: 'CONFIRMED', label: 'Confirmed' , content: <OrdersList /> },
];

export default function OrderTabs() {  
  const searchParams = useSearchParams();
  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'ALL') {
      params.delete(key);
    }else
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newUrl);
  };
  
  return (
    <div className="w-auto mx-auto mt-8 p-4">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex flex-row gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
          {orderTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() =>  setSearchParam('status', tab.value || "")}
              className=" py-4 font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition"
            >
              <span className='py-2'>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {orderTabs.map((tab) => (
            <OrderTab key={tab.value} tab={tab} />
        ))}
      </Tabs>
    </div>
  );
}

const OrderTab = ({tab}: {tab: { value: string; label: string; content: React.ReactNode }}) => {
  return (
    <TabsContent value={tab.value}>
        {tab.content}
    </TabsContent>  
  );
}
