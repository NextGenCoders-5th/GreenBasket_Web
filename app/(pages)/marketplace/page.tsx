"use client"

import LoadingPage from "@/components/loading.page"
import NetworkErrorSection from "@/components/network-error"
import { useGetProductsQuery } from "@/redux/api/product.api"
import Image from "next/image"
import Link from "next/link"
import ProductDetailDrawer from "./_components/ProductDetail"
import AddToCartDialog from "@/app/user/orders/components/OrderProduct"
import { useState } from "react"
import { Search, Grid, List, Star, ShoppingCart, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Marketplace() {
  const { data, error, isLoading } = useGetProductsQuery("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (isLoading) return <LoadingPage />
  if (error) {
    return <NetworkErrorSection error={error as unknown as { status: number; message: string }} />
  }

  const products = data?.data.data || []
  const categories = ["All", "Fruits", "Vegetables", "Organic", "Seasonal", "Leafy"]

  return (
    <div className="min-h-screen overflow-auto scrollbar-custom bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Fresh Market
              <span className="block text-green-200">Marketplace</span>
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Discover premium fresh produce from local farms and trusted vendors. Quality guaranteed, delivered fresh
              to your doorstep.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for fresh produce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                      : "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-md"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-md"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Sort by</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="vendor">Vendor Name</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-2xl"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <div className="relative w-full h-56">
                    <Image
                      src={product?.image_url || "/placeholder.svg?height=224&width=400"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <ProductDetailDrawer initialIndex={index} products={products}/>
                    </div>

                    {/* Discount Badge */}
                    {product.discount_price && product.discount_price !== product.price && (
                      <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                        {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {/* Vendor Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={product.Vendor?.logo_url || "/placeholder.svg?height=32&width=32"}
                        alt={product.Vendor?.business_name}
                        fill
                        className="rounded-full object-cover border-2 border-green-100"
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{product.Vendor?.business_name}</span>
                  </div>

                  {/* Product Name & Description */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                  </div>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {product.discount_price && product.discount_price !== product.price ? (
                          <>
                            <span className="text-xl font-bold text-green-600">${product.discount_price}</span>
                            <span className="text-sm text-gray-400 line-through">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-green-600">${product.price}</span>
                        )}
                        <span className="text-sm text-gray-500">/ {product.unit}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </p>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex gap-2">
                    <AddToCartDialog product={product}/>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our thriving community of local vendors and reach thousands of customers looking for fresh, quality
            produce.
          </p>
          <Link href="/vendors">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-green-600 hover:bg-gray-50 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Become a Vendor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
