"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import ActiveCart from "./_components/ActiveCart"
import CartList from "./_components/CartList"

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

interface Cart {
  id: string
  updatedAt: string
  createdAt: string
  total_price: number
  status: "ACTIVE" | "INACTIVE" | "COMPLETED"
  userId: string
  CartItems: CartItem[]
}

interface DetailedCart extends Omit<Cart, "CartItems"> {
  CartItems: CartItemWithProduct[]
}



export default function CartsPage() {
  const [activeTab, setActiveTab] = useState("active-cart")


  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-slate-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-emerald-600" />
              My Carts
            </h1>
            <p className="text-gray-600 mt-1">Manage your shopping carts</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="active-cart" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Active Cart
            </TabsTrigger>
            <TabsTrigger value="all-carts" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              All Carts 
            </TabsTrigger>
          </TabsList>

          {/* Active Cart Tab */}
          <TabsContent value="active-cart" className="mt-6">
              <ActiveCart/>
          </TabsContent>

          {/* All Carts Tab */}
          <TabsContent value="all-carts" className="mt-6">
            <CartList/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
