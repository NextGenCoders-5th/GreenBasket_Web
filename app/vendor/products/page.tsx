
"use client";
import React from 'react';
import AddProductDialog from './_components/AddProduct';
import SearchInput from '@/app/_components/SearchInput';
import ProductList from './ProductList';
import DropDownInput from '@/app/_components/DropdownInput';

const ProductPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-green-600">Product List</h1>
        <AddProductDialog />
      </div>

      <div className="flex justify-between items-center mb-4">
        <SearchInput/>
      <DropDownInput
        options={[
          { label: 'Sort by Name', value: 'name' },
          { label: 'Sort by Price', value: 'price' },
          { label: 'Sort by Date', value: 'date' },
        ]}
        placeholder="Sort by"
        className="w-44 rounded-md"
        setValue={(value) => console.log(value)} // Handle sort change
      />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <ProductList/>
      </div>
    </div>
  );
};

export default ProductPage;
