"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Package,
  Leaf,
  Plus,
  Minus,
  Store,
  Percent,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import AddToCartDialog from "@/app/user/orders/components/OrderProduct"
import { IProduct } from "@/types/product.type"
import { useGetProductsQuery } from "@/redux/api/product.api"
import LoadingPage from "@/components/loading.page"
import ProductDetailDrawer from "@/app/_components/ProductDetail"


const ProductsPage = () => {
  const {data, error, isLoading} = useGetProductsQuery("")
  const [searchTerm, setSearchTerm] = useState("")
  const [product, setProduct] = useState<IProduct | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVendor, setSelectedVendor] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [cart, setCart] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  
  // Extract unique categories and vendors
  const categories = useMemo(() => {
    const cats = new Set<string>()
    data?.data.data.forEach((product) => {
      product.categories?.forEach((cat) =>  typeof cat === 'string' ? cat : cats.add(cat.name))
    })
    return Array.from(cats)
  }, [data])

  const vendors = useMemo(() => {
    const vendorMap = new Map()
    data?.data.data.forEach((product) => {
      if (!vendorMap.has(product.Vendor.id)) {
        vendorMap.set(product.Vendor.id, product.Vendor.business_name)
      }
    })
    return Array.from(vendorMap.entries())
  }, [data])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = data?.data.data.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || product.categories?.some((cat) => typeof cat === 'string' ? cat : cat.name === selectedCategory)

      const matchesVendor = selectedVendor === "all" || product.Vendor.id === selectedVendor

      const matchesFeatured = !showFeaturedOnly || product.is_featured

      const currentPrice = product.discount_price > 0 ? product.discount_price : product.price
      const matchesPrice = currentPrice >= priceRange[0] && currentPrice <= priceRange[1]

      return matchesSearch && matchesCategory && matchesVendor && matchesFeatured && matchesPrice
    })

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          const priceA = a.discount_price > 0 ? a.discount_price : a.price
          const priceB = b.discount_price > 0 ? b.discount_price : b.price
          return priceA - priceB
        case "price-high":
          const priceA2 = a.discount_price > 0 ? a.discount_price : a.price
          const priceB2 = b.discount_price > 0 ? b.discount_price : b.price
          return priceB2 - priceA2
        case "featured":
          return b.is_featured ? 1 : -1
        case "stock":
          return b.stock - a.stock
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory,data, selectedVendor, sortBy, showFeaturedOnly, priceRange])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
    }).format(price)
  }

  const calculateDiscount = (originalPrice: number, discountPrice: number) => {
    if (discountPrice > 0 && discountPrice < originalPrice) {
      return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    }
    return 0
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle }
    if (stock < 50)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertTriangle }
    return { label: "In Stock", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle }
  }

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if(isLoading){
    return <LoadingPage/>
  }

  if(error){
    return <div className="text-center min-h-screen flex flex-col justify-center items-center h-screen py-16">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Error loading products</h2>
      <p className="text-gray-600">Please try again later.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Retry
        </Button>

    </div>
  }

  if (!data || !data.data || data.data.data.length === 0) {
    return (
      <div className="text-center min-h-screen flex flex-col justify-center items-center h-screen py-16">
        <h2 className="text-xl font-semibold text-gray-600 mb-4">No products available</h2>
        <p className="text-gray-500">Please check back later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen   bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r max-w-7xl from-green-600 via-green-700 to-green-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Fresh Products</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Discover the finest selection of fresh fruits and vegetables from our trusted local vendors
            </p>
            <div className="flex items-center justify-center gap-8 text-green-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>{data?.data.data.length} Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                <span>{vendors.length} Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                <span>100% Fresh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6  py-12">
        {/* Filters and Search */}
        <motion.div {...fadeInUp} className="mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Search */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-slate-200 focus:border-green-500 focus:ring-green-500/20"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-green-500 focus:ring-green-500/20">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vendor Filter */}
                <div>
                  <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-green-500 focus:ring-green-500/20">
                      <SelectValue placeholder="All Vendors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vendors</SelectItem>
                      {vendors.map(([id, name]) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-green-500 focus:ring-green-500/20">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="price-low">Price (Low to High)</SelectItem>
                      <SelectItem value="price-high">Price (High to Low)</SelectItem>
                      <SelectItem value="featured">Featured First</SelectItem>
                      <SelectItem value="stock">Stock Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-slate-200">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={
                    showFeaturedOnly
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }
                >
                  <Star className="w-4 h-4 mr-2" />
                  Featured Only
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-sm text-slate-600">
                  Showing {filteredProducts?.length} of {data?.data.data.length} products
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts?.map((product, index) => {
                const currentPrice = product.discount_price > 0 ? product.discount_price : product.price
                const discountPercentage = calculateDiscount(product.price, product.discount_price)
                const stockStatus = getStockStatus(product.stock)
                const StockIcon = stockStatus.icon
                const cartQuantity = cart[product.id] || 0
                const isInWishlist = wishlist.has(product.id)

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="group h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.is_featured && (
                            <Badge className="bg-yellow-500 text-white border-0 shadow-lg">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                          {discountPercentage > 0 && (
                            <Badge className="bg-red-500 text-white border-0 shadow-lg">
                              <Percent className="w-3 h-3 mr-1" />
                              {discountPercentage}% OFF
                            </Badge>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            variant="secondary"
                            className={`bg-white/90 hover:bg-white shadow-lg ${isInWishlist ? "text-red-500" : ""}`}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                          </Button>
                           <ProductDetailDrawer product={product}>
                                                            <Button
                                                              variant="outline"
                                                              size="sm"
                                                              className="border-accent-200 text-accent-600 hover:bg-accent-50"
                                                            >
                                                              <Eye className="w-4 h-4" />
                                                            </Button>
                                                          </ProductDetailDrawer>
                        </div>

                        {/* Stock Status */}
                        <div className="absolute bottom-3 left-3">
                          <Badge className={`${stockStatus.color} border shadow-sm text-xs`}>
                            <StockIcon className="w-3 h-3 mr-1" />
                            {stockStatus.label}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Product Info */}
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg line-clamp-1 mb-1">{product.name}</h3>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-3">{product.description}</p>

                            {/* Categories */}
                            {!!product.categories?.length  && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {product.categories?.map((category) => (
                                  typeof category === 'string' ? category :< Badge
                                    key={category.id}
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200"
                                  >
                                    {category.name}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <Separator />

                          {/* Pricing */}
                          <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-green-600">{formatPrice(currentPrice)}</span>
                              {product.discount_price > 0 && product.discount_price < product.price && (
                                <span className="text-sm text-slate-400 line-through">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">per {product.unit}</p>
                            <p className="text-sm text-slate-600">
                              {product.stock} {product.unit} available
                            </p>
                          </div>

                          {/* Vendor */}
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={product.Vendor.logo_url || "/placeholder.svg"}
                                alt={product.Vendor.business_name}
                              />
                              <AvatarFallback className="text-xs bg-green-100">
                                {product.Vendor.business_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-slate-600 truncate">{product.Vendor.business_name}</span>
                          </div>

                          {/* Cart Controls */}
                          <div className="flex items-center gap-2">
                            {cartQuantity > 0 ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromCart(product.id)}
                                  className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="text-sm font-medium px-3 py-1 bg-green-50 rounded">
                                  {cartQuantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToCart(product.id)}
                                  className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                onClick={() => addToCart(product.id)}
                                disabled={product.stock === 0}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredProducts?.map((product, index) => {
                const currentPrice = product.discount_price > 0 ? product.discount_price : product.price
                const discountPercentage = calculateDiscount(product.price, product.discount_price)
                const stockStatus = getStockStatus(product.stock)
                const StockIcon = stockStatus.icon
                const cartQuantity = cart[product.id] || 0
                const isInWishlist = wishlist.has(product.id)

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          {/* Product Image */}
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <img
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {product.is_featured && (
                              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white border-0 shadow-lg text-xs">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-slate-900 text-xl mb-1">{product.name}</h3>
                                <p className="text-slate-600 mb-2">{product.description}</p>

                                {/* Categories */}
                                {!!product.categories?.length  && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {product.categories.map((category) => (
                                     typeof category === 'string' ? category :  <Badge
                                        key={category.id}
                                        variant="outline"
                                        className="text-xs bg-green-50 text-green-700 border-green-200"
                                      >
                                        {category.name}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={`border-slate-200 ${isInWishlist ? "text-red-500" : "text-slate-600"} hover:bg-slate-50`}
                                  onClick={() => toggleWishlist(product.id)}
                                >
                                  <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-200 text-slate-600 hover:bg-slate-50"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              {/* Pricing */}
                              <div>
                                <span className="text-xs text-slate-500 block">Price</span>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xl font-bold text-green-600">{formatPrice(currentPrice)}</span>
                                  {product.discount_price > 0 && product.discount_price < product.price && (
                                    <span className="text-sm text-slate-400 line-through">
                                      {formatPrice(product.price)}
                                    </span>
                                  )}
                                </div>
                                {discountPercentage > 0 && (
                                  <Badge className="bg-red-100 text-red-700 border-red-200 text-xs mt-1">
                                    {discountPercentage}% OFF
                                  </Badge>
                                )}
                              </div>

                              {/* Stock */}
                              <div>
                                <span className="text-xs text-slate-500 block">Stock</span>
                                <div className="flex items-center gap-2">
                                  <Badge className={`${stockStatus.color} border text-xs`}>
                                    <StockIcon className="w-3 h-3 mr-1" />
                                    {product.stock} {product.unit}
                                  </Badge>
                                </div>
                              </div>

                              {/* Vendor */}
                              <div>
                                <span className="text-xs text-slate-500 block">Vendor</span>
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage
                                      src={product.Vendor.logo_url || "/placeholder.svg"}
                                      alt={product.Vendor.business_name}
                                    />
                                    <AvatarFallback className="text-xs bg-green-100">
                                      {product.Vendor.business_name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-slate-700 truncate">
                                    {product.Vendor.business_name}
                                  </span>
                                </div>
                              </div>

                              {/* Cart Controls */}
                              <div>
                                <span className="text-xs text-slate-500 block">Add to Cart</span>
                                {cartQuantity > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeFromCart(product.id)}
                                      className="border-green-200 text-green-700 hover:bg-green-50"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm font-medium px-2 py-1 bg-green-50 rounded">
                                      {cartQuantity}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => addToCart(product.id)}
                                      className="border-green-200 text-green-700 hover:bg-green-50"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                                    onClick={() => addToCart(product.id)}
                                    disabled={product.stock === 0}
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No products found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedVendor("all")
                setShowFeaturedOnly(false)
              }}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {Object.values(cart).reduce((sum, qty) => sum + qty, 0)} items in cart
                    </p>
                    <p className="text-sm text-slate-600">
                      Total:{" "}
                      {formatPrice(
                        Object.entries(cart).reduce((total, [productId, qty]) => {
                          const product = data?.data.data.find((p) => p.id === productId)
                          if (product) {
                            const price = product.discount_price > 0 ? product.discount_price : product.price
                            return total + price * qty
                          }
                          return total
                        }, 0),
                      )}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={()=>{
                      const productId = Object.keys(cart)[0]
                      setProduct(data?.data.data.find((p) => p.id === productId) || null)

                    }}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    View Cart
                  </Button>
                  {
                    product && (
                      <AddToCartDialog product={product}/>
                    )
                  }
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
