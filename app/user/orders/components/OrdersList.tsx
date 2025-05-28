"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Package, CreditCard, Clock, CheckCircle, Truck, Star, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGetMyOrdersQuery } from "@/redux/api/order.api"
import LoadingPage from "@/components/loading.page"
import { ResponseError } from "@/types/general.types"
import NetworkErrorSection from "@/components/network-error"
import Link from "next/link"
import { ClassName } from "@/enums/classnames.enum"
import { useInitializePaymentMutation } from "@/redux/api/payment.api"
import { useToast } from "@/providers/toast.provider"
import { useSearchParams } from "next/navigation"

// Sample data based on your format
// const ordersData = [
//   {
//     id: "4a493fd5-73aa-4577-9e16-5ace6d1835b3",
//     updatedAt: "2025-05-27T18:56:44.017Z",
//     createdAt: "2025-05-27T18:51:11.510Z",
//     total_price: 600,
//     status: "CONFIRMED",
//     shippedAt: null,
//     deliveredAt: null,
//     receivedAt: null,
//     Adress: {
//       street: "Bahir Dar, St George",
//       city: "Bahir Dar",
//       sub_city: "Bahir Dar",
//       zip_code: "6000",
//       country: "Ethiopia",
//     },
//     OrderItems: [
//       {
//         price: 200,
//         quantity: 3,
//         sub_total: 600,
//         Product: {
//           name: "Test Product 2",
//           description: "Test Product 2 Description",
//           price: 200,
//           unit: "kg",
//           image_url: "https://res.cloudinary.com/dvp1mjhd9/image/upload/v1744938280/d8fbhim9ixedbebaxf28.jpg",
//         },
//       },
//     ],
//   },
//   {
//     id: "e225dac0-2bc6-4aa3-b0b5-676dd9ec00fc",
//     updatedAt: "2025-05-28T06:39:47.919Z",
//     createdAt: "2025-05-28T06:39:47.919Z",
//     total_price: 3430,
//     status: "PENDING",
//     shippedAt: null,
//     deliveredAt: null,
//     receivedAt: null,
//     Adress: {
//       street: "Bahir Dar, St George",
//       city: "Bahir Dar",
//       sub_city: "Bahir Dar",
//       zip_code: "6000",
//       country: "Ethiopia",
//     },
//     OrderItems: [
//       {
//         price: 490,
//         quantity: 7,
//         sub_total: 3430,
//         Product: {
//           name: "Banana",
//           description: "Sweet bananas, rich in potassium.",
//           price: 490,
//           unit: "killogram",
//           image_url: "/placeholder.svg?height=80&width=80",
//         },
//       },
//     ],
//   },
//   {
//     id: "2d988fa9-1980-4431-b56b-08a8b877c4d5",
//     updatedAt: "2025-05-28T07:02:57.507Z",
//     createdAt: "2025-05-28T07:02:57.507Z",
//     total_price: 4002,
//     status: "PENDING",
//     shippedAt: null,
//     deliveredAt: null,
//     receivedAt: null,
//     Adress: {
//       street: "Bahir Dar, St George",
//       city: "Bahir Dar",
//       sub_city: "Bahir Dar",
//       zip_code: "6000",
//       country: "Ethiopia",
//     },
//     OrderItems: [
//       {
//         price: 490,
//         quantity: 5,
//         sub_total: 2450,
//         Product: {
//           name: "Banana",
//           description: "Sweet bananas, rich in potassium.",
//           price: 490,
//           unit: "killogram",
//           image_url: "/placeholder.svg?height=80&width=80",
//         },
//       },
//       {
//         price: 388,
//         quantity: 4,
//         sub_total: 1552,
//         Product: {
//           name: "Strawberry",
//           description: "Fresh strawberries, perfect for desserts.",
//           price: 388,
//           unit: "killogram",
//           image_url: "/placeholder.svg?height=80&width=80",
//         },
//       },
//     ],
//   },
// ]

const getStatusIcon = (status: string) => {
    switch (status) {
        case "PENDING":
            return <Clock className="h-4 w-4" />
        case "CONFIRMED":
            return <CheckCircle className="h-4 w-4" />
        case "SHIPPED":
            return <Truck className="h-4 w-4" />
        default:
            return <Package className="h-4 w-4" />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "CONFIRMED":
            return "bg-green-100 text-green-800 border-green-200"
        case "SHIPPED":
            return "bg-blue-100 text-blue-800 border-blue-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
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

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ETB",
        minimumFractionDigits: 0,
    }).format(amount)
}

export default function OrdersPage() {
    const searchParams = useSearchParams()
    const toast = useToast()
    const [url, setUrl] = useState<string>("")
    console.log("url", url)
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const contentRef = useRef<HTMLPreElement>(null);
    const [initialize, { isLoading: isSubmitting }] = useInitializePaymentMutation()
    console.log("searcParams", searchParams.get('status'))

    const { data, isLoading, error } = useGetMyOrdersQuery(searchParams?.toString(), {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    if (isLoading) return <LoadingPage />
    if (error) return <NetworkErrorSection error={error as ResponseError} />

    const orders = data?.data.data || [];

    if (!orders) return (
        <div className='text-center flex items-center flex-col justify-center h-[55vh] gap-1.5    w-full text-2xl font-semibold'>
            <p>No orders found</p>
            <Link href={"/marketplace"} className={`${ClassName.BUTTON_LINK} text-white hover:text-white hover:underline text-sm bg-accent-600/90 hover:bg-accent-600`}>
                Order Now <ArrowRight size={16} />
            </Link>
        </div>
    )


    const handlePayment = (orderId: string) => {
        const toastId = toast.loading("Processing payment...")
        try {
            initialize({ orderId })
                .unwrap()
                .then((response) => {
                    toast.success("Payment initialized successfully!", { id: toastId })
                    console.log("Payment initialized:", response)
                    setUrl(response.data.data.checkout_url)
                    console.log(response.data.data)
                    setSelectedOrder(orders.find(order => order.id === orderId) || null)
                }
                ).catch((error) => {
                    toast.error(`Payment initialization failed: ${error.data.message}`, { id: toastId })
                    console.error("Payment initialization error:", error)
                }
                )
            // Redirect to payment gateway or handle further actions
        } catch (error) {
            console.log("Error initializing payment:", error)

        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-600 mt-2">Track and manage your orders</p>
                </div>

                {/* Orders Grid */}
                <div className="space-y-6">
                    {orders.map((order) => (
                        <>
                            <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-white border-b">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </Badge>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(order.total_price)}</p>
                                                <p className="text-sm text-gray-500">Total</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    {/* Shipping Address */}
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-gray-900">Shipping Address</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.Adress.street}, {order.Adress.city}, {order.Adress.sub_city}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {order.Adress.zip_code}, {order.Adress.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-gray-900">Order Items</h3>
                                        {order.OrderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                                                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={item.Product.image_url || "/placeholder.svg"}
                                                        alt={item.Product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{item.Product.name}</h4>
                                                    <p className="text-sm text-gray-600">{item.Product.description}</p>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <span className="text-sm text-gray-500">
                                                            Qty: {item.quantity} {item.Product.unit}
                                                        </span>
                                                        <span className="text-sm text-gray-500">{formatCurrency(item.price)} each</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">{formatCurrency(item.sub_total)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="my-6" />

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                                        <Button variant="outline" onClick={() => setSelectedOrder(order)} className="sm:w-auto">
                                            View Details
                                        </Button>

                                        {order.status === "PENDING" && (
                                            <Button onClick={() => handlePayment(order.id)} className="sm:w-auto bg-green-600 hover:bg-green-700">
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Pay Now
                                            </Button>
                                        )
                                        }



                                        {order.status === "CONFIRMED" && (
                                            <Button variant="outline" className="sm:w-auto">
                                                <Star className="h-4 w-4 mr-2" />
                                                Leave Review
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                        </>
                    ))}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                                <DialogDescription>
                                    Order #{selectedOrder.id.slice(-8)} - {formatDate(selectedOrder.createdAt)}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium">Status</p>
                                        <Badge className={`${getStatusColor(selectedOrder.status)} w-fit`}>
                                            {getStatusIcon(selectedOrder.status)}
                                            {selectedOrder.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="font-medium">Total</p>
                                        <p className="text-xl font-bold">{formatCurrency(selectedOrder.total_price)}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium mb-2">Shipping Address</p>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <p>{selectedOrder.Adress.street}</p>
                                        <p>
                                            {selectedOrder.Adress.city}, {selectedOrder.Adress.sub_city}
                                        </p>
                                        <p>
                                            {selectedOrder.Adress.zip_code}, {selectedOrder.Adress.country}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-medium mb-2">Items</p>
                                    <div className="space-y-2">
                                        {selectedOrder.OrderItems.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center p-2 border rounded">
                                                <div>
                                                    <p className="font-medium">{item.Product.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {item.quantity} {item.Product.unit} × {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                                <p className="font-medium">{formatCurrency(item.sub_total)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            {selectedOrder && <Dialog open={!!url} onOpenChange={() => setUrl("")}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Payment</DialogTitle>
                        <DialogDescription>Complete payment for order #{selectedOrder.id.slice(-8)}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total Amount:</span>
                                <span className="text-2xl font-bold text-green-600">
                                    {formatCurrency(selectedOrder.total_price)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Link
                            href={`${url}`}
                            target="_blank"
                            onClick={() => handlePayment(selectedOrder.id)}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay with Chapa
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>}
        </div>
    )
}
