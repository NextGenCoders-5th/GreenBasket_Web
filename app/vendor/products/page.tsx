
"use client";
import React from 'react';
import AddProductDialog from './_components/AddProduct';
import SearchInput from '@/app/_components/SearchInput';
import ProductList from './ProductList';

const ProductPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-green-600">Product List</h1>
        <AddProductDialog />
      </div>

      <div className="flex justify-between items-center mb-4">
        <SearchInput/>
        <select
          className="ml-4 p-3 border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <ProductList/>
      </div>
    </div>
  );
};

export default ProductPage;
