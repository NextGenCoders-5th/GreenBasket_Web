import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const vendors = [
  {
    id: 1,
    name: "Nature's Farm",
    location: 'Maharashtra',
    image: '/images/profile.png',
    products: 32,
  },
  {
    id: 2,
    name: 'Green Valley Organics',
    location: 'Punjab',
    image: '/images/profile.png',
    products: 24,
  },
  {
    id: 3,
    name: 'Urban Harvest',
    location: 'Delhi',
    image: '/images/profile.png',
    products: 18,
  },
  {
    id: 4,
    name: 'FreshKart',
    location: 'Karnataka',
    image: '/images/profile.png',
    products: 40,
  },
  {
    id: 5,
    name: 'Tropical Treats',
    location: 'Kerala',
    image: '/images/profile.png',
    products: 20,
  },
  {
    id: 6,
    name: 'Healthy Harvest',
    location: 'West Bengal',
    image: '/images/profile.png',
    products: 15,
  },

  {
    id: 7,
    name: 'Tropical Treats',
    location: 'Kerala',
    image: '/images/profile.png',
    products: 20,
  },
  {
    id: 8,
    name: 'Healthy Harvest',
    location: 'West Bengal',
    image: '/images/profile.png',
    products: 15,
  },
];

export default function VendorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Heading */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700">Our Trusted Vendors</h1>
        <p className="mt-2 text-gray-600">Meet the local farmers and producers bringing you the freshest fruits and vegetables.</p>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 gap-y-8 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="bg-white p-0 rounded-lg shadow hover:shadow-md transition overflow-hidden">
            <CardHeader className="p-0">
              <div className="flex justify-center items-center bg-green-500 w-full h-48">
                <Image src={vendor.image} alt={vendor.name} width={160} height={160} className="rounded-full object-cover" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
                <p className="text-sm text-gray-600">{vendor.location}</p>
                <p className="mt-2 text-sm text-green-600">{vendor.products} products</p>
                <Link href={`/vendor/${vendor.id}`} className="mt-4 inline-block text-green-700 font-medium hover:underline">
                  View Products →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-green-600 text-white rounded-lg py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Become a GreenBasket Vendor</h2>
        <p className="mt-2 text-sm md:text-base">Sell your fresh produce online and reach more customers easily.</p>
        <Link href="/vendors/add" className="mt-6 inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Register yout business as a vendor
        </Link>
      </div>
    </div>
  );
}
