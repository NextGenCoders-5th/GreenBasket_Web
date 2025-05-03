import Image from 'next/image';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Fresh Strawberries', image: '/images/fruits/strawberries.png', price: 4.99, vendor: "Nature's Farm" },
  { id: 2, name: 'Organic Carrots', image: '/images/fruits/carrots.png', price: 2.49, vendor: 'Green Valley' },
  { id: 3, name: 'Crispy Spinach', image: '/images/fruits/spinach.png', price: 3.99, vendor: 'Leafy Lane' },
  { id: 4, name: 'Juicy Mangoes', image: '/images/fruits/mangoes.png', price: 5.99, vendor: 'Tropical Harvest' },
  { id: 5, name: 'Sweet Corn', image: '/images/fruits/corn.png', price: 2.99, vendor: 'Farm Fresh Co.' },
  { id: 6, name: 'Red Tomatoes', image: '/images/fruits/tomatoes.png', price: 3.29, vendor: 'Urban Harvest' },
  { id: 7, name: 'Green Apples', image: '/images/fruits/green-apples.png', price: 4.49, vendor: "Nature's Basket" },
  { id: 8, name: 'Organic Bananas', image: '/images/fruits/bananas.png', price: 1.99, vendor: 'Tropico' },
];

export default function Marketplace() {
  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">Explore the Marketplace</h1>
        <p className="mt-2 text-gray-600">Handpicked fruits and vegetables from trusted local vendors.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Fruits', 'Vegetables', 'Organic', 'Seasonal', 'Leafy'].map((tag) => (
            <button key={tag} className="px-4 py-1.5 rounded-full bg-white border text-sm hover:bg-green-100 transition">
              {tag}
            </button>
          ))}
        </div>
        <select className="w-full sm:w-auto px-3 py-2 border rounded text-sm shadow-sm bg-white">
          <option value="">Sort by</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="vendor">Vendor Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col">
            <Image src={product.image} alt={product.name} width={400} height={300} className="w-full h-40 object-fit" />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">By: {product.vendor}</p>
              </div>
              <Link href={`/product/${product.id}`} className="mt-4 bg-green-600 text-white py-2 rounded text-center hover:bg-green-700 transition">
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-green-700">Want to sell your produce?</h2>
        <p className="mt-2 text-gray-600">Join our vendor community and grow your reach.</p>
        <Link href="/vendors" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
          Become a Vendor
        </Link>
      </div>
    </div>
  );
}
