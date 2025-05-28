'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MyCartsList from './CartList';
import OrdersList from './OrdersList';

const orderTabs = [
  { value: 'pending', label: 'Pending', content:  <OrdersList /> },
  { value: 'active', label: 'Active' , content: <MyCartsList /> },
  { value: 'not_paid', label: 'Not Paid Yet'  , content: <MyCartsList /> },
  { value: 'canceled', label: 'Canceled' , content: <MyCartsList /> },
  { value: 'completed', label: 'Completed' , content: <MyCartsList /> },
];

export default function OrderTabs() {  
  
  return (
    <div className="w-auto mx-auto mt-8 p-4">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex flex-row gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-2">
          {orderTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
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
