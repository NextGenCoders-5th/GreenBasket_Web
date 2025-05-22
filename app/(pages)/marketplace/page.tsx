'use client'

import LoadingPage from '@/components/loading.page';
import NetworkErrorSection from '@/components/network-error';
import { useGetProductsQuery } from '@/redux/api/product.api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ProductDetailDrawer from './_components/ProductDetail';
import { ClassName } from '@/enums/classnames.enum';
import { trimmer } from '@/util/string';

export default function Marketplace() {
  const { data, error, isLoading } = useGetProductsQuery("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (isLoading) return <LoadingPage />;
  if (error) {
    return <NetworkErrorSection error={error as unknown as { status: number; message: string }} />;
  }

  const products = data?.data.data || [];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">


      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700">Explore the Marketplace</h1>
        <p className="mt-3 text-gray-600 text-lg">Fresh picks from local farms and trusted vendors.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex flex-wrap gap-3">
          {['All', 'Fruits', 'Vegetables', 'Organic', 'Seasonal', 'Leafy'].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm hover:bg-green-100 transition"
            >
              {tag}
            </button>
          ))}
        </div>
        <select className="w-full md:w-auto px-4 py-2 border rounded-md text-sm bg-white shadow-sm">
          <option value="">Sort by</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="vendor">Vendor Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image_url || '/images/fruits.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3.5 flex flex-col justify-between flex-grow">
              <div className="mb-3 w-full">
                {/* About Product */}
                <div className="flex w-full px-0 items-center justify-between py-1">
                  <div className="flex flex-col  gap-0 py-0.5">

                    <h3 className="text-lg p-0 font-semibold text-gray-800 truncate">{trimmer(product.name, 10)}</h3>
                    <p className="text-sm text-gray-500 mb-1">{trimmer(product.description, 10)}</p>
                  </div>
                  <button className={`${ClassName.BUTTON} text-sm bg-green-600 text-white rounded-full px-2.5 py-2 hover:bg-green-700 transition`}>
                    Order Now
                  </button>
                </div>
                <p className="text-green-700 font-bold text-lg">
                  ${product.discount_price && product.discount_price !== product.price ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">${product.price}</span>
                      {product.discount_price}
                    </>
                  ) : (
                    product.price
                  )}
                  / {product.unit}
                </p>
                <p className="text-xs text-gray-400">Stock: {product.stock}</p>
                <div className="flex items-center justify-between mt-2">
                  <Image
                    src={product.Vendor.logo_url || '/images/vendor.png'}
                    alt={product.Vendor.business_name}
                    width={50}
                    height={50}
                    className="rounded-full border border-slate-400 mr-2"
                  />
                  <span className="text-sm text-gray-600">{product.Vendor.business_name}</span>
                </div>
              </div>
            </div>

            {/* Animated Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10">
              <div className="flex justify-between gap-1">
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="flex-grow  cursor-pointer px-3 py-2 text-sm  bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Detail
                </button>
                <button
                  className="flex-grow  cursor-pointer py-2 text-sm  bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ProductDetailDrawer
          initialIndex={selectedIndex}
          products={products}
          onClose={() => setSelectedIndex(null)}
        />
      )}

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold text-green-700">Want to sell your produce?</h2>
        <p className="mt-2 text-gray-600">Join our growing network of vendors.</p>
        <Link
          href="/vendors"
          className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Become a Vendor
        </Link>
      </div>
    </div>
  );
}
