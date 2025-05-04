import Image from 'next/image';

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-green-100 p-6 rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold text-green-700">Welcome back!</h2>
        <p className="text-gray-700 mt-2">Here's a quick look at your recent activity.</p>
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 bg-white shadow rounded-lg">
              <div className="flex items-center gap-4">
                <Image src="/images/fruits.png" alt="Product" width={60} height={60} className="rounded object-cover" />
                <div>
                  <h4 className="font-semibold">Fruit Basket #{item}</h4>
                  <p className="text-sm text-gray-600">Delivered on Apr 10</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div>
        <h3 className="text-xl font-bold mb-4">Your Favorites</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Apples', 'Tomatoes', 'Spinach', 'Grapes'].map((item) => (
            <div key={item} className="p-4 bg-white shadow rounded-lg text-center">
              <Image src="/images/fruits.png" alt={item} width={80} height={80} className="mx-auto rounded-full object-cover" />
              <p className="mt-2 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
