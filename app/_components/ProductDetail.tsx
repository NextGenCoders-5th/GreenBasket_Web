"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Eye,
  Star,
  Package,
  Calendar,
  DollarSign,
  Tag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Share2,
  Heart,
  TrendingUp,
  BarChart3,
  Clock,
  Percent,
} from "lucide-react"
import { IProduct } from "@/types/product.type"

interface Product {
  id: string
  updatedAt: string
  createdAt: string
  name: string
  description: string
  price: number
  discount_price: number
  unit: string
  stock: number
  image_url: string | undefined;
  status: "ACTIVE" | "INACTIVE"
  is_featured: boolean
  categories?: Array<{ id: string; name: string }>
  vendor?: {
    id: string
    business_name: string
    business_email: string
    logo_url: string
  }
}

interface ProductDetailDrawerProps {
  product: IProduct
  children: React.ReactNode
}

export default function ProductDetailDrawer({ product, children }: ProductDetailDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle }
    if (stock < 10)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertTriangle }
    return { label: "In Stock", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle }
  }

  const calculateDiscount = () => {
    if (product.discount_price > 0 && product.discount_price < product.price) {
      return Math.round(((product.price - product.discount_price) / product.price) * 100)
    }
    return 0
  }

  const stockStatus = getStockStatus(product.stock)
  const StockIcon = stockStatus.icon
  const discountPercentage = calculateDiscount()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl p-0 bg-gradient-to-br  from-white via-accent-50 to-accent-100">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-accent-600 to-accent-700 p-6 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <SheetTitle className="text-2xl font-bold text-white mb-2">{product.name}</SheetTitle>
                    <SheetDescription className="text-accent-100 text-base">
                      Product Details & Information
                    </SheetDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        product.status === "ACTIVE"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      } border shadow-sm`}
                    >
                      {product.status}
                    </Badge>
                    {product.is_featured && (
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 border shadow-sm">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </SheetHeader>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-8">
              {/* Product Image and Basic Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Quick Actions Overlay */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white shadow-lg">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Discount Badge */}
                        {discountPercentage > 0 && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-red-500 text-white border-0 shadow-lg text-sm font-bold">
                              <Percent className="w-3 h-3 mr-1" />
                              {discountPercentage}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Info Section */}
                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
                          <p className="text-slate-600 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-accent-600">
                              {formatPrice(product.discount_price > 0 ? product.discount_price : product.price)}
                            </span>
                            {product.discount_price > 0 && product.discount_price < product.price && (
                              <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">per {product.unit}</p>
                          {discountPercentage > 0 && (
                            <p className="text-sm text-green-600 font-medium">
                              You save {formatPrice(product.price - product.discount_price)}
                            </p>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <StockIcon className="w-5 h-5 text-slate-600" />
                            <div>
                              <p className="font-medium text-slate-900">Stock Status</p>
                              <Badge className={`${stockStatus.color} border text-sm mt-1`}>{stockStatus.label}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900">{product.stock}</p>
                            <p className="text-sm text-slate-500">{product.unit} available</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Package className="w-5 h-5 text-accent-600" />
                      Product Information
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Tag className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-slate-600">Product ID</p>
                            <p className="font-mono text-sm text-slate-900">{product.id}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm text-slate-600">Unit of Measurement</p>
                            <p className="font-semibold text-slate-900">{product.unit}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="text-sm text-slate-600">Status</p>
                            <Badge
                              className={`${
                                product.status === "ACTIVE"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              } border mt-1`}
                            >
                              {product.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <div>
                            <p className="text-sm text-slate-600">Created</p>
                            <p className="text-sm text-slate-900">{formatDate(product.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Clock className="w-5 h-5 text-indigo-500" />
                          <div>
                            <p className="text-sm text-slate-600">Last Updated</p>
                            <p className="text-sm text-slate-900">{formatDate(product.updatedAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-sm text-slate-600">Featured Product</p>
                            <Badge
                              className={`${
                                product.is_featured
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              } border mt-1`}
                            >
                              {product.is_featured ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Categories Section */}
              {product.categories && product.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-accent-600" />
                        Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.categories.map((category) => (
                          typeof category === 'string'  ? category :<Badge
                            key={category.id}
                            variant="outline"
                            className="bg-accent-50 text-accent-700 border-accent-200 px-3 py-1"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Vendor Information */}
              {product.Vendor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-accent-600" />
                        Vendor Information
                      </h4>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                          <AvatarImage
                            src={product.Vendor.logo_url || "/placeholder.svg"}
                            alt={product.Vendor.business_name}
                          />
                          <AvatarFallback className="bg-accent-100 text-accent-700 font-bold text-lg">
                            {product.Vendor.business_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-900 text-lg">{product.Vendor.business_name}</h5>
                          <p className="text-slate-600">{product.Vendor.business_email}</p>
                          <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
                            Verified Vendor
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
