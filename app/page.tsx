import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" bg-gradient-to-b from-green-50 to-white text-gray-900">
      
      {/* Hero Section */}
      <section className="w-full px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Fresh From the Farm to Your Doorstep
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
          Shop a variety of fruits and vegetables from trusted local vendors.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/marketplace"
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/vendors"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-full hover:bg-green-50 transition"
          >
            Become a Vendor
          </Link>
        </div>
      </section>


      {/* Category Highlights */}
      <section className="px-4 py-12 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Fresh Fruits", image: "/images/fruits.png" },
            { name: "Organic Veggies", image: "/images/veggies.png" },
            { name: "Leafy Greens", image: "/images/leafy.png" },
            { name: "Seasonal Picks", image: "/images/seasonal.png" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={400}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center font-medium">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 bg-green-50 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Farm Fresh", desc: "We source directly from local farms for peak freshness." },
            { title: "Multiple Vendors", desc: "Buy from various trusted sellers all in one place." },
            { title: "Fast Delivery", desc: "Get your orders delivered the same day in select areas." },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to taste the freshness?</h2>
        <p className="mt-2 text-lg">Browse our marketplace now or become a vendor!</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/marketplace" className="bg-white text-green-600 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
            Shop Now
          </Link>
          <Link href="/vendors" className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-600 transition">
            Become a Vendor
          </Link>
        </div>
      </section>
    </main>
  );
}
