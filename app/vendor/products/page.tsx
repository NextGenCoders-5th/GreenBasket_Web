
"use client";
import React, { useState } from 'react';
import AddProductDialog from './_components/AddProduct';

const productsData = [
  {
    id: "fde40b2b-b28b-4cfc-b772-5c0340c15fce",
    name: "Test Product 2",
    description: "Test Product 2 Description",
    price: 200,
    discount_price: 0,
    unit: "kg",
    stock: 100,
    image_url: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1744938280/d8fbhim9ixedbebaxf28.jpg",
    status: "ACTIVE",
  },
  {
    id: "7a9a0ab4-489b-4789-9d5d-845fe21d06b8",
    name: "Test Product 1",
    description: "Test Product 1 Description",
    price: 100,
    discount_price: 0,
    unit: "kg",
    stock: 100,
    image_url: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1744938280/axrcyeudhipiu0e1mvem.jpg",
    status: "ACTIVE",
  },
  // More products...
];

const ProductPage = () => {
  const [products, setProducts] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-green-600">Product List</h1>
        <AddProductDialog />
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="w-full max-w-xs p-3 border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="ml-4 p-3 border-2 border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={sortBy}
          onChange={handleSort}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Product Image</th>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-left font-semibold">Price</th>
              <th className="px-6 py-4 text-left font-semibold">Stock</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className="border-t hover:bg-green-50 transition-colors duration-300">
                <td className="px-6 py-4">
                  <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-md shadow-md" />
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-gray-700">{product.description}</td>
                <td className="px-6 py-4 text-green-600">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-green-500">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;
