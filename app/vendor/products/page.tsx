"use client";
import React from 'react';
import ProductList from './ProductList';
import { useAppSelector } from '@/redux/store';
import Debugger from '@/app/_components/Debugger';

const ProductPage = () => {
  const contentRef = React.useRef<HTMLPreElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="p-4 sm:p-6 w-full  bg-gray-50 h-[88vh] overflow-hidden">
      {/* <Debugger  copyContentRef={contentRef}>
        <pre ref={contentRef}>
          {JSON.stringify(
            {
              user: user,
            },
            null,
            2
          )}
        </pre>
      </Debugger> */}
      <div className="overflow-x-auto h-[88vh]  max-w-[100vw] overflow-y-auto rounded-lg shadow-lg bg-white">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
