"use client";
import React from 'react';
import ProductList from './ProductList';

const ProductPage = () => {
  return (
    <div className="p-4 sm:p-6 w-full  bg-gray-50 h-[88vh] overflow-hidden">
      <div className="overflow-x-auto h-[88vh]  max-w-[100vw] overflow-y-auto rounded-lg shadow-lg bg-white">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
