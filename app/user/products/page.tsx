"use client";
import React from 'react';
import AddProductDialog from './_components/AddProduct';
import SearchInput from '@/app/_components/SearchInput';
import ProductList from './ProductList';
import DropDownInput from '@/app/_components/DropdownInput';

const ProductPage = () => {
  return (
    <div className="p-4 sm:p-6 w-full  bg-gray-50 h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex  justify-between items-center mb-3 sm:mb-4 gap-4">
        <h1 className="text-3xl sm:text-4xl font-semibold text-green-600">Product List</h1>
        <AddProductDialog />
      </div>

      {/* Search & Sort */}
      <div className="flex   justify-between items-center mb-4 gap-1.5 sm:gap-4">
        <SearchInput className="w-full sm:w-1/2" />
        <DropDownInput
          options={[
            { label: 'Sort by Name', value: 'name' },
            { label: 'Sort by Price', value: 'price' },
            { label: 'Sort by Date', value: 'date' },
          ]}
          placeholder="Sort by"
          className="w-full sm:w-44"
          setValue={(value) => console.log(value)}
        />
      </div>

      {/* Product List */}
      <div className="overflow-x-auto sm:h-[70vh]  max-w-[100vw] overflow-y-auto rounded-lg shadow-lg bg-white">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
