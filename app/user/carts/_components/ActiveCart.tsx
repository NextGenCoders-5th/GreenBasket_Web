"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Tag, Package, AlertCircle } from "lucide-react"
import Link from "next/link"
import orderApi, { useCheckOutOrderMutation } from "@/redux/api/order.api"
import { useToast } from "@/providers/toast.provider"
import { IUser } from "@/types/user.type"
import { useAppSelector } from "@/redux/store"
import cartApi, { CartTags, useGetMyCartQuery } from "@/redux/api/cart.api"
import { Cart } from "@/types/cart.type"
import LoadingPage from "@/components/loading.page"
import { ErrorEnum } from "@/enums/error.enum"
import { useRouter } from "next/navigation"


// // Mock data from your API response
// const mockCartData: Cart = {
//   id: "58c9e169-3c6f-426a-b441-3cec8907f12c",
//   total_price: 846.76,
//   status: "ACTIVE",
//   userId: "3ba8af05-6ee3-46e0-9bfe-8a7ced4edf36",
//   CartItems: [
//     {
//       id: "16a159af-00dd-4e9a-a3a0-24e0a3a0cf04",
//       price: 39.03,
//       quantity: 9,
//       sub_total: 351.27,
//       productId: "3c722767-e07e-44e7-ae2d-b5b48188e518",
//       cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
//       Product: {
//         id: "3c722767-e07e-44e7-ae2d-b5b48188e518",
//         name: "Pineapple",
//         description: "Tropical pineapples, sweet and tangy.",
//         price: 39.03,
//         discount_price: 18.72,
//         unit: "kg",
//         stock: 972,
//         image_url:
//           "https://images.unsplash.com/photo-1572859704906-ab0716da285f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFBpbmVhcHBsZXxlbnwwfHwwfHx8MA%3D%3D",
//         status: "ACTIVE",
//         is_featured: true,
//         vendorId: "45dd5772-d967-4a80-a6a7-e611a0d83687",
//       },
//     },
//     {
//       id: "8207deb5-2e8f-4f89-94d1-03d82c09d18f",
//       price: 28.43,
//       quantity: 13,
//       sub_total: 369.59,
//       productId: "c243b166-ee73-492e-a316-fe9b23dc7b42",
//       cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
//       Product: {
//         id: "c243b166-ee73-492e-a316-fe9b23dc7b42",
//         name: "Potato",
//         description: "Organic potatoes, versatile for many dishes.",
//         price: 28.43,
//         discount_price: 5.64,
//         unit: "kg",
//         stock: 676,
//         image_url:
//           "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UG90YXRvfGVufDB8fDB8fHww",
//         status: "ACTIVE",
//         is_featured: true,
//         vendorId: "48ea7eee-19be-4359-bec3-f3b6e6466510",
//       },
//     },
//     {
//       id: "1d24b343-f0b0-4240-b664-4df73070dd99",
//       price: 25.18,
//       quantity: 5,
//       sub_total: 125.9,
//       productId: "56833fc3-b3a9-4c62-9798-0973e42361a9",
//       cartId: "58c9e169-3c6f-426a-b441-3cec8907f12c",
//       Product: {
//         id: "56833fc3-b3a9-4c62-9798-0973e42361a9",
//         name: "Strawberry",
//         description: "Fresh strawberries, perfect for desserts.",
//         price: 25.18,
//         discount_price: 5.71,
//         unit: "kg",
//         stock: 450,
//         image_url:
//           "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
//         status: "ACTIVE",
//         is_featured: false,
//         vendorId: "45dd5772-d967-4a80-a6a7-e611a0d83687",
//       },
//     },
//   ],
// }

export default function ActiveCart() {
  const router = useRouter()

  const {data, isLoading: fetching, error} = useGetMyCartQuery()
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user)  as IUser | null;
  const [cartData, setCartData] = useState<Cart | null>(null)
  const [checkOutOrder, {isLoading}] = useCheckOutOrderMutation()

  // Set cart data when fetched
  useEffect(() => {
    const cart = data?.data.data || null;
    if (!!cart) {
      setCartData(cart)
    }
  }
  , [data])

  const handleCheckout = async () => {
    if (!user){
      toast.error("Please login to checkout")
      return
    }
    if(!user.address){
      toast.error("Please add your address before checking out")
      return
    }
    const toastId = toast.loading("Checking out order...")
    const address = user.address.id;
    try {
      await checkOutOrder({ cartId: cartData?.id || "", addressId: address }).unwrap().then(() => {
          toast.success("Order checked out successfully", { id: toastId });
          cartApi.util.invalidateTags([CartTags.MY_CART])
          router.refresh()
      })
        .catch((err) => {
          if (err.status === 'UNKOWN_ERROR')
            toast.error('Checking out order failed, please try again.', { id: toastId });
          else {
            toast.error(err.message || 'Checking out order failed, please try again.', { id: toastId });
          }
        });

    } catch (err) {
      toast.error( 'Checking out order failed, please try again.', { id: toastId });
    }
  }
 
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartData((prev) => prev && ({
      ...prev,
      CartItems: prev.CartItems.map((item) => {
        if (item.productId === itemId) {
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
      setCartData((prev) => prev && ({
        ...prev,
        total_price: prev.CartItems.reduce((total, item) => total + item.sub_total, 0),
      }))
    }, 0)
  }

  const removeItem = (itemId: string) => {
    setCartData((prev) => {
      if (!prev) return prev
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
    return cartData?.CartItems.reduce((savings, item) => {
      const originalPrice = item.Product.price * item.quantity
      const discountPrice = item.Product.discount_price * item.quantity
      return savings + (originalPrice - discountPrice)
    }, 0)
  }

  const totalSavings = calculateSavings() || 0

  //  Display loading

  if(fetching){
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


  if (!cartData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm p-12">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your  haven't active cart </h1>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/marketplace">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData?.CartItems.map((item) => {
              const hasDiscount = item.Product.discount_price > 0
              const currentPrice = hasDiscount ? item.Product.discount_price : item.Product.price

              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative">
                        <Image
                          src={item.Product.image_url || "/placeholder.svg"}
                          alt={item.Product.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover border-2 border-gray-100"
                        />
                        {hasDiscount && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">Sale</Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.Product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.Product.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                Stock: {item.Product.stock} {item.Product.unit}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {hasDiscount ? (
                                <>
                                  <span className="text-lg font-bold text-emerald-600">{currentPrice.toFixed(2)} ETB</span>
                                  <span className="text-sm text-gray-400 line-through">
                                    {item.Product.price.toFixed(2)} ETB
                                  </span>
                                  <Badge variant="secondary" className="text-xs">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {Math.round(((item.Product.price - currentPrice) / item.Product.price) * 100)}% off
                                  </Badge>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-emerald-600">{currentPrice.toFixed(2)} ETB</span>
                              )}
                              <span className="text-sm text-gray-500">/ {item.Product.unit}</span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>

                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 text-center h-8 border-2"
                              min={1}
                              max={item.Product.stock}
                            />

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.Product.stock}
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-sm text-gray-600">Subtotal:</span>
                          <span className="text-lg font-semibold text-gray-900">{item.sub_total.toFixed(2)} ETB</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartData?.CartItems.length} items)</span>
                    <span className="font-medium">{(cartData?.total_price + totalSavings).toFixed(2)} ETB</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Total Savings
                      </span>
                      <span className="font-medium">-{totalSavings.toFixed(2)} ETB</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-emerald-600">{cartData?.total_price.toFixed(2)} ETB</span>
                  </div>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        You're saving {totalSavings.toFixed(2)} ETB on this order!
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                  disabled={isLoading}
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link href="/products">
                    <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  )
}
