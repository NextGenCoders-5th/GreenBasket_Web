'use client';

import LoadingPage from '@/components/loading.page';
import { useGetProductsQuery } from '@/redux/api/product.api';
import React from 'react';

const ProductList = () => {
  const { data, error, isLoading } = useGetProductsQuery("");

  if (isLoading) return <LoadingPage />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="text-red-600 bg-red-50 p-6 rounded-md shadow">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <pre className="text-sm overflow-x-auto text-left">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  const products = data?.data?.data || [];

  if (!products.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">No Products Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 overflow-x-auto">
      <div className="min-w-[768px] w-full">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Image</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Description</th>
              <th className="px-4 py-3 text-left font-semibold">Price</th>
              <th className="px-4 py-3 text-left font-semibold">Stock</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-green-50 transition duration-200">
                <td className="px-4 py-3">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-6 h-6 object-cover rounded-sm shadow"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{product.description}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">${product.price}</td>
                <td className="px-4 py-3 text-gray-700">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
