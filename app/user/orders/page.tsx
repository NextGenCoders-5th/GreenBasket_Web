'use client';

import * as React from 'react';
import OrderTabs from './components/Tabs';


 function OrderPage() {

  return (
    <div defaultValue="All"  className="w-full bg-slate-50 flex-col justify-start gap-6">
      <OrderTabs />
    </div>
  );
}




export default OrderPage