"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Package,
  Calendar,
  Eye,
  MoreVertical,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useGetMyCartsQuery } from "@/redux/api/cart.api"
import { Cart } from "@/types/cart.type"
import LoadingPage from "@/components/loading.page"
import { ErrorEnum } from "@/enums/error.enum"

// Types
interface CartItem {
  id: string
  price: number
  quantity: number
  sub_total: number
  productId: string
  cartId: string
  updatedAt: string
  createdAt: string
}

interface CartItemWithProduct extends CartItem {
  Product: {
    id: string
    name: string
    description: string
    price: number
    discount_price: number
    unit: string
    stock: number
    image_url: string
    status: string
    is_featured: boolean
    vendorId: string
  }
}


interface DetailedCart extends Omit<Cart, "CartItems"> {
  CartItems: CartItemWithProduct[]
}


export default function CartList() {
  const {data, isLoading,error} = useGetMyCartsQuery();
  const [allCarts, setAllCarts] = useState<any[]>([])


  useEffect(() => {
    if (data) {
      setAllCarts(data.data.data)
    }
  }, [data])
  // Active cart functions
 


  // All carts functions
  const activateCart = (cartId: string) => {
    setAllCarts((prev) =>
      prev.map((cart) => ({
        ...cart,
        status: cart.id === cartId ? "ACTIVE" : cart.status === "ACTIVE" ? "INACTIVE" : cart.status,
      })),
    )
  }

  const deleteCart = (cartId: string) => {
    setAllCarts((prev) => prev.filter((cart) => cart.id !== cartId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }


  if(isLoading){
    <LoadingPage/>
  }

  // if an error occurs
  if (error && 'status' in error && error.status !== ErrorEnum.NOT_FOUND) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading cart</h1>
          <p className="text-gray-600 mb-6">There was an error loading your cart. Please try again later.</p>
          <Link href="/marketplace">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }


  return (
    
            allCarts.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-sm p-12">
                  <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No carts found</h2>
                  <p className="text-gray-600 mb-8">You haven't created any carts yet.</p>
                  <Link href="/marketplace">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCarts.map((cart) => (
                  <Card key={cart.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">Cart #{cart.id.slice(-8)}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          {/* <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setActiveTab("active-cart")}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {cart.status !== "ACTIVE" && (
                              <DropdownMenuItem onClick={() => activateCart(cart.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate Cart
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => deleteCart(cart.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Cart
                            </DropdownMenuItem>
                          </DropdownMenuContent> */}
                        </DropdownMenu>
                      </div>
                      <Badge className={`w-fit ${getStatusColor(cart.status)}`}>{cart.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {formatDate(cart.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package className="w-4 h-4" />
                        <span>
                          {cart.CartItems.length} {cart.CartItems.length === 1 ? "item" : "items"}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="text-xl font-bold text-emerald-600">{cart.total_price.toFixed(2)} ETB  </span>
                      </div>

                      <div className="flex gap-2">
                        {/* <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setActiveTab("active-cart")}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button> */}
                        {cart.status === "ACTIVE" ? (
                          <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Checkout
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => activateCart(cart.id)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
  )
}
