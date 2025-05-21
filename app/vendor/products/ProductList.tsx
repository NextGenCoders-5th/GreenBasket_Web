'use client';

import LoadingPage from '@/components/loading.page';
import { useDeleteProductMutation, useGetProductsQuery } from '@/redux/api/product.api';
import React from 'react';
import AddProductDialog from './_components/AddProduct';
import DeleteFeature, { FeatureDeleteActionType } from '@/components/modals/DeleteFetureDialog';
import { Trash2 } from 'lucide-react';

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
      <div className="min-w-full md:min-w-[768px]">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm text-sm md:text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Image</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Name</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Description</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Price</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Stock</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Status</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-green-50 transition duration-200">
                <td className="px-2 md:px-4 py-2">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-8 h-8 object-cover rounded shadow"
                  />
                </td>
                <td className="px-2 md:px-4 py-2 font-medium text-gray-800">{product.name}</td>
                <td className="px-2 md:px-4 py-2 text-gray-600">{product.description}</td>
                <td className="px-2 md:px-4 py-2 text-green-600 font-semibold">${product.price}</td>
                <td className="px-2 md:px-4 py-2 text-gray-700">{product.stock}</td>
                <td className="px-2 md:px-4 py-2">
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
                <td className="px-2 md:px-4 py-2 flex  gap-1.5 justify-center items-center">
                  <AddProductDialog product={product} />
                  <DeleteFeature
                    featureId={product.id}
                    feature={'Product'}
                    useDelete={useDeleteProductMutation as FeatureDeleteActionType}
                    redirectUrl="/vendor/products"
                    triggerContent={
                      <span className="px-3 py-1.5 border border-red-600 hover:bg-red-500/90 bg-white text-red-500 hover:text-white transition-colors duration-75 rounded-md text-sm flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                      </span>
                    }
                  />
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
