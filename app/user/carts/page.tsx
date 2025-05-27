"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Tag,
  Package,
  AlertCircle,
  Calendar,
  Eye,
  MoreVertical,
  CheckCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

// Mock data for all carts (list view)
const mockCartsData: Cart[] = [
  {
    id: "58c9e169-3c6f-426a-b441-3cec8907f12c",
    updatedAt: "2025-05-27T16:17:04.212Z",
    createdAt: "2025-05-27T16:16:20.245Z",
    total_price: 846.76,
    status: "ACTIVE",
    userId: "3ba8af05-6ee3-46e0-9bfe-8a7ced4edf36",
    CartItems: [
      {
        id: "16a159af-00dd-4e9a-a3a0-24e0a3a0cf04",
        updatedAt: "2025-05-27T16:16:20.315Z",
        createdAt: "2025-05-27T16:16:20.315Z",
        price: 39.03,
        quantity: 9,
        sub_total: 351.27,
        productId: "3c722767-e07e-44e7-ae2d-b5b48188e518",
        cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      },
      {
        id: "8207deb5-2e8f-4f89-94d1-03d82c09d18f",
        updatedAt: "2025-05-27T16:16:54.959Z",
        createdAt: "2025-05-27T16:16:54.959Z",
        price: 28.43,
        quantity: 13,
        sub_total: 369.59,
        productId: "c243b166-ee73-492e-a316-fe9b23dc7b42",
        cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      },
      {
        id: "1d24b343-f0b0-4240-b664-4df73070dd99",
        updatedAt: "2025-05-27T16:17:04.210Z",
        createdAt: "2025-05-27T16:17:04.210Z",
        price: 25.18,
        quantity: 5,
        sub_total: 125.9,
        productId: "56833fc3-b3a9-4c62-9798-0973e42361a9",
        cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      },
    ],
  },
  {
    id: "48d8e169-3c6f-426a-b441-3cec8907f11a",
    updatedAt: "2025-05-26T14:30:15.123Z",
    createdAt: "2025-05-26T14:25:10.456Z",
    total_price: 245.5,
    status: "COMPLETED",
    userId: "3ba8af05-6ee3-46e0-9bfe-8a7ced4edf36",
    CartItems: [
      {
        id: "26b159af-00dd-4e9a-a3a0-24e0a3a0cf05",
        updatedAt: "2025-05-26T14:25:10.500Z",
        createdAt: "2025-05-26T14:25:10.500Z",
        price: 15.75,
        quantity: 4,
        sub_total: 63.0,
        productId: "4d722767-e07e-44e7-ae2d-b5b48188e519",
        cartId: "48d8e169-3c6f-426a-b441-3cec8907f11a",
      },
      {
        id: "36c159af-00dd-4e9a-a3a0-24e0a3a0cf06",
        updatedAt: "2025-05-26T14:26:20.600Z",
        createdAt: "2025-05-26T14:26:20.600Z",
        price: 22.5,
        quantity: 8,
        sub_total: 180.0,
        productId: "5e722767-e07e-44e7-ae2d-b5b48188e520",
        cartId: "48d8e169-3c6f-426a-b441-3cec8907f11a",
      },
    ],
  },
  {
    id: "38f7e169-3c6f-426a-b441-3cec8907f22b",
    updatedAt: "2025-05-25T10:45:30.789Z",
    createdAt: "2025-05-25T10:40:25.123Z",
    total_price: 156.25,
    status: "INACTIVE",
    userId: "3ba8af05-6ee3-46e0-9bfe-8a7ced4edf36",
    CartItems: [
      {
        id: "46d159af-00dd-4e9a-a3a0-24e0a3a0cf07",
        updatedAt: "2025-05-25T10:40:25.200Z",
        createdAt: "2025-05-25T10:40:25.200Z",
        price: 31.25,
        quantity: 5,
        sub_total: 156.25,
        productId: "6f722767-e07e-44e7-ae2d-b5b48188e521",
        cartId: "38f7e169-3c6f-426a-b441-3cec8907f22b",
      },
    ],
  },
]

// Mock detailed cart data (for active cart view)
const mockActiveCartData: DetailedCart = {
  id: "58c9e169-3c6f-426a-b441-3cec8907f12c",
  updatedAt: "2025-05-27T16:17:04.212Z",
  createdAt: "2025-05-27T16:16:20.245Z",
  total_price: 846.76,
  status: "ACTIVE",
  userId: "3ba8af05-6ee3-46e0-9bfe-8a7ced4edf36",
  CartItems: [
    {
      id: "16a159af-00dd-4e9a-a3a0-24e0a3a0cf04",
      updatedAt: "2025-05-27T16:16:20.315Z",
      createdAt: "2025-05-27T16:16:20.315Z",
      price: 39.03,
      quantity: 9,
      sub_total: 351.27,
      productId: "3c722767-e07e-44e7-ae2d-b5b48188e518",
      cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      Product: {
        id: "3c722767-e07e-44e7-ae2d-b5b48188e518",
        name: "Pineapple",
        description: "Tropical pineapples, sweet and tangy.",
        price: 39.03,
        discount_price: 18.72,
        unit: "kg",
        stock: 972,
        image_url:
          "https://images.unsplash.com/photo-1572859704906-ab0716da285f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFBpbmVhcHBsZXxlbnwwfHwwfHx8MA%3D%3D",
        status: "ACTIVE",
        is_featured: true,
        vendorId: "45dd5772-d967-4a80-a6a7-e611a0d83687",
      },
    },
    {
      id: "8207deb5-2e8f-4f89-94d1-03d82c09d18f",
      updatedAt: "2025-05-27T16:16:54.959Z",
      createdAt: "2025-05-27T16:16:54.959Z",
      price: 28.43,
      quantity: 13,
      sub_total: 369.59,
      productId: "c243b166-ee73-492e-a316-fe9b23dc7b42",
      cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      Product: {
        id: "c243b166-ee73-492e-a316-fe9b23dc7b42",
        name: "Potato",
        description: "Organic potatoes, versatile for many dishes.",
        price: 28.43,
        discount_price: 5.64,
        unit: "kg",
        stock: 676,
        image_url:
          "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UG90YXRvfGVufDB8fDB8fHww",
        status: "ACTIVE",
        is_featured: true,
        vendorId: "48ea7eee-19be-4359-bec3-f3b6e6466510",
      },
    },
    {
      id: "1d24b343-f0b0-4240-b664-4df73070dd99",
      updatedAt: "2025-05-27T16:17:04.210Z",
      createdAt: "2025-05-27T16:17:04.210Z",
      price: 25.18,
      quantity: 5,
      sub_total: 125.9,
      productId: "56833fc3-b3a9-4c62-9798-0973e42361a9",
      cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
      Product: {
        id: "56833fc3-b3a9-4c62-9798-0973e42361a9",
        name: "Strawberry",
        description: "Fresh strawberries, perfect for desserts.",
        price: 25.18,
        discount_price: 5.71,
        unit: "kg",
        stock: 450,
        image_url:
          "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
        status: "ACTIVE",
        is_featured: false,
        vendorId: "45dd5772-d967-4a80-a6a7-e611a0d83687",
      },
    },
  ],
}

export default function CartsPage() {
  const [allCarts, setAllCarts] = useState<Cart[]>(mockCartsData)
  const [activeCart, setActiveCart] = useState<DetailedCart>(mockActiveCartData)
  const [activeTab, setActiveTab] = useState("active-cart")

  // Active cart functions
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setActiveCart((prev) => ({
      ...prev,
      CartItems: prev.CartItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            quantity: newQuantity,
            sub_total: newQuantity * item.price,
          }
          return updatedItem
        }
        return item
      }),
    }))

    // Recalculate total
    setTimeout(() => {
      setActiveCart((prev) => ({
        ...prev,
        total_price: prev.CartItems.reduce((total, item) => total + item.sub_total, 0),
      }))
    }, 0)
  }

  const removeItem = (itemId: string) => {
    setActiveCart((prev) => {
      const updatedItems = prev.CartItems.filter((item) => item.id !== itemId)
      const newTotal = updatedItems.reduce((total, item) => total + item.sub_total, 0)

      return {
        ...prev,
        CartItems: updatedItems,
        total_price: newTotal,
      }
    })
  }

  const calculateSavings = () => {
    return activeCart.CartItems.reduce((savings, item) => {
      const originalPrice = item.Product.price * item.quantity
      const discountPrice = item.Product.discount_price * item.quantity
      return savings + (originalPrice - discountPrice)
    }, 0)
  }

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

  const totalSavings = calculateSavings()

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
              All Carts ({allCarts.length})
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
