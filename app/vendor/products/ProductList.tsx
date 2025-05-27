"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import LoadingPage from "@/components/loading.page"
import { useDeleteProductMutation, useGetProductsQuery, useGetVendorProductsQuery } from "@/redux/api/product.api"
import AddProductDialog from "./_components/AddProduct"
import DeleteFeature, { type FeatureDeleteActionType } from "@/components/modals/DeleteFetureDialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Trash2,
  Search,
  Filter,
  Grid3X3,
  List,
  Package,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Tag,
} from "lucide-react"
import ProductDetailDrawer from "../../_components/ProductDetail"

const ProductList = () => {
  const { data, error, isLoading } = useGetVendorProductsQuery("")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState<"all" | "ACTIVE" | "INACTIVE">("all")

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="border-red-200 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-800 mb-2">Something went wrong</h1>
              <p className="text-red-600 mb-4">We encountered an error while loading your products.</p>
              <details className="text-left">
                <summary className="cursor-pointer text-red-700 font-medium mb-2">View Error Details</summary>
                <pre className="text-xs bg-red-50 p-3 rounded border overflow-x-auto text-red-800">
                  {JSON.stringify(error, null, 2)}
                </pre>
              </details>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const products = data?.data?.data || []

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (!products.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-accent-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-accent-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">No Products Yet</h1>
          <p className="text-slate-600 mb-8">Start building your inventory by adding your first product.</p>
          <AddProductDialog />
        </motion.div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle }
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertTriangle }
    return { label: "In Stock", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-accent-50 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-600 via-accent-700 to-accent-800 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-3xl font-bold mb-2"
              >
                Product Inventory
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent-100 text-lg"
              >
                Manage your product catalog and inventory
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-6 mt-4"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span className="text-accent-100">{products.length} Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-accent-100">
                    {products.filter((p: any) => p.status === "ACTIVE").length} Active
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AddProductDialog />
            </motion.div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-slate-200 focus:border-accent-500 focus:ring-accent-500/20"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="h-12 px-4 border border-slate-200 rounded-lg focus:border-accent-500 focus:ring-accent-500/20 bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-accent-600 hover:bg-accent-700" : ""}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-accent-600 hover:bg-accent-700" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {filteredProducts.length !== products.length && (
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <span>
                    Showing {filteredProducts.length} of {products.length} products
                  </span>
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-accent-100 text-accent-700">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                  {filterStatus !== "all" && (
                    <Badge variant="secondary" className="bg-accent-100 text-accent-700">
                      Status: {filterStatus}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Display */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product: any, index: number) => {
                const stockStatus = getStockStatus(product.stock)
                const StockIcon = stockStatus.icon

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                      <div className="relative">
                        <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={`${
                              product.status === "ACTIVE"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            } border shadow-sm`}
                          >
                            {product.status}
                          </Badge>
                        </div>

                        {/* Featured Badge */}
                        {product.is_featured && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border shadow-sm">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <ProductDetailDrawer product={product}>
                              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </ProductDetailDrawer>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{product.name}</h3>
                            <p className="text-slate-600 text-sm line-clamp-2 mt-1">{product.description}</p>
                          </div>

                          {/* Categories */}
                          {product.categories && product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {product.categories.slice(0, 2).map((category: any) => (
                                <Badge
                                  key={category.id}
                                  variant="outline"
                                  className="text-xs bg-accent-50 text-accent-700 border-accent-200"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {category.name}
                                </Badge>
                              ))}
                              {product.categories.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.categories.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          <Separator />

                          {/* Pricing */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-accent-600">
                                  {formatPrice(product.discount_price || product.price)}
                                </span>
                                {product.discount_price && product.discount_price < product.price && (
                                  <span className="text-sm text-slate-400 line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-slate-500">per {product.unit}</span>
                            </div>
                          </div>

                          {/* Stock Status */}
                          <div className="flex items-center justify-between">
                            <Badge className={`${stockStatus.color} border text-xs`}>
                              <StockIcon className="w-3 h-3 mr-1" />
                              {stockStatus.label}
                            </Badge>
                            <span className="text-sm font-medium text-slate-700">
                              {product.stock} {product.unit}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <AddProductDialog product={product} />
                            <DeleteFeature
                              featureId={product.id}
                              feature="Product"
                              useDelete={useDeleteProductMutation as FeatureDeleteActionType}
                              redirectUrl="/vendor/products"
                              triggerContent={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200  hover:text-white text-red-600 hover:bg-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              }
                            />
                            <ProductDetailDrawer product={product}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-accent-200 text-accent-600 hover:bg-accent-500 hover:text-white"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </ProductDetailDrawer>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent-50 to-accent-100 border-b border-accent-200">
                  <CardTitle className="text-lg font-bold text-slate-800">Product List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="divide-y divide-slate-100">
                      {filteredProducts.map((product: any, index: number) => {
                        const stockStatus = getStockStatus(product.stock)
                        const StockIcon = stockStatus.icon

                        return (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            className="p-6 hover:bg-accent-50/50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-6">
                              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                                <AvatarImage
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-accent-100 text-accent-700 font-bold">
                                  {product.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
                                    <p className="text-slate-600 text-sm line-clamp-1">{product.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={`${
                                        product.status === "ACTIVE"
                                          ? "bg-green-100 text-green-700 border-green-200"
                                          : "bg-gray-100 text-gray-700 border-gray-200"
                                      } border`}
                                    >
                                      {product.status}
                                    </Badge>
                                    {product.is_featured && (
                                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border">
                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                  <div>
                                    <span className="text-xs text-slate-500 block">Price</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-accent-600">
                                        {formatPrice(product.discount_price || product.price)}
                                      </span>
                                      {product.discount_price && product.discount_price < product.price && (
                                        <span className="text-xs text-slate-400 line-through">
                                          {formatPrice(product.price)}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-xs text-slate-500 block">Stock</span>
                                    <div className="flex items-center gap-2">
                                      <Badge className={`${stockStatus.color} border text-xs`}>
                                        <StockIcon className="w-3 h-3 mr-1" />
                                        {product.stock} {product.unit}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-xs text-slate-500 block">Categories</span>
                                    <div className="flex flex-wrap gap-1">
                                      {product.categories?.slice(0, 1).map((category: any) => (
                                        <Badge
                                          key={category.id}
                                          variant="outline"
                                          className="text-xs bg-accent-50 text-accent-700 border-accent-200"
                                        >
                                          {category.name}
                                        </Badge>
                                      ))}
                                      {product.categories?.length > 1 && (
                                        <span className="text-xs text-slate-500">
                                          +{product.categories.length - 1} more
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <span className="text-xs text-slate-500 block">Updated</span>
                                    <span className="text-sm text-slate-700">{formatDate(product.updatedAt)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <AddProductDialog product={product} />
                                <DeleteFeature
                                  featureId={product.id}
                                  feature="Product"
                                  useDelete={useDeleteProductMutation as FeatureDeleteActionType}
                                  redirectUrl="/vendor/products"
                                  triggerContent={
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  }
                                />
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
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
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
                setFilterStatus("all")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ProductList
