"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  ShoppingBag,
  AlertCircle,
  User,
  Star,
  X,
  Copy,
  MessageCircle,
  CreditCard,
  Banknote,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Order } from "@/types/or.type"

// Enhanced mock data with product information
// const ordersData = [
//   {
//     id: "4f1eaa2f-f097-4c0f-9676-e79487b38a51",
//     updatedAt: "2025-05-27T21:03:19.101Z",
//     createdAt: "2025-05-27T20:36:56.028Z",
//     total_price: 600,
//     status: "CONFIRMED",
//     shippedAt: null,
//     deliveredAt: null,
//     receivedAt: null,
//     paymentMethod: "CARD",
//     priority: "HIGH",
//     cartId: "a28fb2b6-fb86-45a2-8ae6-8014ea2a232f",
//     userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     vendorId: "e9220c06-8692-4fbc-b106-2ac4ec4fb2ac",
//     addressId: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//     Adress: {
//       id: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//       updatedAt: "2025-05-27T18:49:33.966Z",
//       createdAt: "2025-05-27T18:49:33.966Z",
//       street: "123 Main Street",
//       city: "Addis Ababa",
//       sub_city: "Bole",
//       zip_code: "1000",
//       country: "Ethiopia",
//       latitude: 9.0054,
//       longitude: 38.7636,
//       is_default: false,
//       vendorId: null,
//       userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     },
//     OrderItems: [
//       {
//         id: "09ff70bd-61ec-427c-a0e8-3578eb172738",
//         updatedAt: "2025-05-27T20:36:56.028Z",
//         createdAt: "2025-05-27T20:36:56.028Z",
//         price: 100,
//         quantity: 6,
//         sub_total: 600,
//         reviewed: false,
//         orderId: "4f1eaa2f-f097-4c0f-9676-e79487b38a51",
//         productId: "ab73e8e2-ff5d-450a-9200-ea6841f075ef",
//         product: {
//           id: "ab73e8e2-ff5d-450a-9200-ea6841f075ef",
//           name: "Premium Coffee Beans - Ethiopian Blend",
//           category: "Beverages",
//           image: "/placeholder.svg?height=80&width=80",
//           rating: 4.8,
//           description: "Premium quality Ethiopian coffee beans with rich aroma and smooth taste.",
//         },
//       },
//     ],
//     User: {
//       id: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//       updatedAt: "2025-05-27T19:19:46.928Z",
//       createdAt: "2025-05-27T18:47:25.293Z",
//       first_name: "Abebe",
//       last_name: "Kebede",
//       email: "abebe.kebede@email.com",
//       phone_number: "+251948006129",
//       profile_picture: "/placeholder.svg?height=64&width=64",
//       role: "CUSTOMER",
//       status: "ACTIVE",
//       verify_status: "VERIFIED",
//       memberSince: "2024-01-15",
//       totalOrders: 12,
//       rating: 4.5,
//     },
//   },
//   {
//     id: "49172026-0832-487a-b4c0-8dcef5a97f6e",
//     updatedAt: "2025-05-27T20:20:21.968Z",
//     createdAt: "2025-05-27T19:22:39.475Z",
//     total_price: 800,
//     status: "SHIPPED",
//     shippedAt: "2025-05-27T20:20:21.968Z",
//     deliveredAt: null,
//     receivedAt: null,
//     paymentMethod: "MOBILE_MONEY",
//     priority: "MEDIUM",
//     trackingNumber: "ET123456789",
//     cartId: "782456b2-b51b-48d3-a184-5160e2dc2ef9",
//     userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     vendorId: "e9220c06-8692-4fbc-b106-2ac4ec4fb2ac",
//     addressId: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//     Adress: {
//       id: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//       updatedAt: "2025-05-27T18:49:33.966Z",
//       createdAt: "2025-05-27T18:49:33.966Z",
//       street: "456 Bole Road",
//       city: "Addis Ababa",
//       sub_city: "Bole",
//       zip_code: "1000",
//       country: "Ethiopia",
//       latitude: 9.0054,
//       longitude: 38.7636,
//       is_default: false,
//       vendorId: null,
//       userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     },
//     OrderItems: [
//       {
//         id: "07775571-2f4b-457c-a624-de26161c188f",
//         updatedAt: "2025-05-27T19:22:39.475Z",
//         createdAt: "2025-05-27T19:22:39.475Z",
//         price: 200,
//         quantity: 4,
//         sub_total: 800,
//         reviewed: false,
//         orderId: "49172026-0832-487a-b4c0-8dcef5a97f6e",
//         productId: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//         product: {
//           id: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//           name: "Organic Honey - Wild Forest",
//           category: "Food & Groceries",
//           image: "/placeholder.svg?height=80&width=80",
//           rating: 4.6,
//           description: "Pure organic honey sourced from wild forest beehives.",
//         },
//       },
//     ],
//     User: {
//       id: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//       updatedAt: "2025-05-27T19:19:46.928Z",
//       createdAt: "2025-05-27T18:47:25.293Z",
//       first_name: "Meron",
//       last_name: "Tadesse",
//       email: "meron.tadesse@email.com",
//       phone_number: "+251911234567",
//       profile_picture: "/placeholder.svg?height=64&width=64",
//       role: "CUSTOMER",
//       status: "ACTIVE",
//       verify_status: "VERIFIED",
//       memberSince: "2023-08-20",
//       totalOrders: 8,
//       rating: 4.8,
//     },
//   },
//   {
//     id: "4a493fd5-73aa-4577-9e16-5ace6d1835b3",
//     updatedAt: "2025-05-27T18:56:44.017Z",
//     createdAt: "2025-05-27T18:51:11.510Z",
//     total_price: 600,
//     status: "DELIVERED",
//     shippedAt: "2025-05-27T18:52:00.000Z",
//     deliveredAt: "2025-05-27T18:56:44.017Z",
//     receivedAt: "2025-05-27T19:00:00.000Z",
//     paymentMethod: "CASH_ON_DELIVERY",
//     priority: "LOW",
//     cartId: "c71fa6fc-295e-402e-a653-03173651e31f",
//     userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     vendorId: "e9220c06-8692-4fbc-b106-2ac4ec4fb2ac",
//     addressId: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//     Adress: {
//       id: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//       updatedAt: "2025-05-27T18:49:33.966Z",
//       createdAt: "2025-05-27T18:49:33.966Z",
//       street: "789 Piassa Street",
//       city: "Addis Ababa",
//       sub_city: "Addis Ketema",
//       zip_code: "1000",
//       country: "Ethiopia",
//       latitude: 9.0054,
//       longitude: 38.7636,
//       is_default: false,
//       vendorId: null,
//       userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     },
//     OrderItems: [
//       {
//         id: "c5af63c9-b0f3-4d54-b59d-77bedfa1fe6a",
//         updatedAt: "2025-05-27T18:51:11.510Z",
//         createdAt: "2025-05-27T18:51:11.510Z",
//         price: 200,
//         quantity: 3,
//         sub_total: 600,
//         reviewed: true,
//         orderId: "4a493fd5-73aa-4577-9e16-5ace6d1835b3",
//         productId: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//         product: {
//           id: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//           name: "Traditional Spice Mix - Berbere",
//           category: "Spices & Seasonings",
//           image: "/placeholder.svg?height=80&width=80",
//           rating: 4.9,
//           description: "Authentic Ethiopian berbere spice blend made with traditional recipe.",
//         },
//       },
//     ],
//     User: {
//       id: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//       updatedAt: "2025-05-27T19:19:46.928Z",
//       createdAt: "2025-05-27T18:47:25.293Z",
//       first_name: "Solomon",
//       last_name: "Gebre",
//       email: "solomon.gebre@email.com",
//       phone_number: "+251922345678",
//       profile_picture: "/placeholder.svg?height=64&width=64",
//       role: "CUSTOMER",
//       status: "ACTIVE",
//       verify_status: "VERIFIED",
//       memberSince: "2023-12-05",
//       totalOrders: 25,
//       rating: 4.7,
//     },
//   },
//   {
//     id: "62608049-21d0-4b3c-8246-72c7be2bdd9f",
//     updatedAt: "2025-05-27T20:09:18.578Z",
//     createdAt: "2025-05-27T19:15:53.645Z",
//     total_price: 1400,
//     status: "PENDING",
//     shippedAt: null,
//     deliveredAt: null,
//     receivedAt: null,
//     paymentMethod: "CARD",
//     priority: "HIGH",
//     cartId: "a4cf733a-a00c-4b5d-a213-a983bfb1274a",
//     userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     vendorId: "e9220c06-8692-4fbc-b106-2ac4ec4fb2ac",
//     addressId: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//     Adress: {
//       id: "09bd4d2d-6db5-4fb4-aa78-88e7f707f8bc",
//       updatedAt: "2025-05-27T18:49:33.966Z",
//       createdAt: "2025-05-27T18:49:33.966Z",
//       street: "321 Mercato Square",
//       city: "Addis Ababa",
//       sub_city: "Addis Ketema",
//       zip_code: "1000",
//       country: "Ethiopia",
//       latitude: 9.0054,
//       longitude: 38.7636,
//       is_default: false,
//       vendorId: null,
//       userId: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//     },
//     OrderItems: [
//       {
//         id: "30438a66-5257-4154-bc8d-954072e3e486",
//         updatedAt: "2025-05-27T19:15:53.645Z",
//         createdAt: "2025-05-27T19:15:53.645Z",
//         price: 200,
//         quantity: 7,
//         sub_total: 1400,
//         reviewed: false,
//         orderId: "62608049-21d0-4b3c-8246-72c7be2bdd9f",
//         productId: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//         product: {
//           id: "6ea8d8a1-605d-48f4-985e-ba405cfa2d44",
//           name: "Handwoven Cotton Scarf",
//           category: "Fashion & Accessories",
//           image: "/placeholder.svg?height=80&width=80",
//           rating: 4.4,
//           description: "Beautiful handwoven cotton scarf with traditional Ethiopian patterns.",
//         },
//       },
//     ],
//     User: {
//       id: "8ebe4517-90b9-4f75-9b54-63f9f05a434b",
//       updatedAt: "2025-05-27T19:19:46.928Z",
//       createdAt: "2025-05-27T18:47:25.293Z",
//       first_name: "Hanna",
//       last_name: "Worku",
//       email: "hanna.worku@email.com",
//       phone_number: "+251933456789",
//       profile_picture: "/placeholder.svg?height=64&width=64",
//       role: "CUSTOMER",
//       status: "ACTIVE",
//       verify_status: "PENDING",
//       memberSince: "2024-11-10",
//       totalOrders: 3,
//       rating: 4.2,
//     },
//   },
// ]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return <CheckCircle className="h-4 w-4" />
    case "SHIPPED":
      return <Truck className="h-4 w-4" />
    case "DELIVERED":
      return <Package className="h-4 w-4" />
    case "PENDING":
      return <Clock className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-accent/10 text-accent border-accent/20 hover:bg-accent/15"
    case "SHIPPED":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
    case "DELIVERED":
      return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700 border-red-200"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "LOW":
      return "bg-green-100 text-green-700 border-green-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getPaymentIcon = (method: string) => {
  switch (method) {
    case "CARD":
      return <CreditCard className="h-4 w-4" />
    case "MOBILE_MONEY":
      return <Phone className="h-4 w-4" />
    case "CASH_ON_DELIVERY":
      return <Banknote className="h-4 w-4" />
    default:
      return <CreditCard className="h-4 w-4" />
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
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 0,
  }).format(amount)
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

// User Popover Component
const UserPopover = ({ user }: { user: any }) => (
  <PopoverContent className="w-80 p-0">
    <div className="p-4">
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="h-12 w-12 border-2 border-accent/20">
          <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={`${user.first_name} ${user.last_name}`} />
          <AvatarFallback className="bg-accent/10 text-accent font-semibold">
            {user.first_name[0]}
            {user.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="font-semibold text-lg">
            {user.first_name} {user.last_name}
          </h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {user.rating} rating
          </div>
          <Badge
            variant="outline"
            className={
              user.verify_status === "VERIFIED"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
          >
            {user.verify_status}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono">{user.email}</span>
          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(user.email)} className="h-6 w-6 p-0">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono">{user.phone_number}</span>
          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(user.phone_number)} className="h-6 w-6 p-0">
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <span>{user.totalOrders} total orders</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <User className="h-4 w-4 mr-2" />
          View Profile
        </Button>
      </div>
    </div>
  </PopoverContent>
)

// Product Popover Component
const ProductPopover = ({ product, item }: { product: any; item: any }) => product && (
  <PopoverContent className="w-80 p-0">
    <div className="p-4">
      <div className="flex items-start gap-3 mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg border"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg leading-tight">{product.name}</h4>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center gap-1 text-sm mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span className="text-muted-foreground">rating</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Price:</span>
          <div className="font-semibold">{formatCurrency(item.price)}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Quantity:</span>
          <div className="font-semibold">{item.quantity}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Subtotal:</span>
          <div className="font-semibold">{formatCurrency(item.sub_total)}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Status:</span>
          <Badge
            variant="outline"
            className={item.reviewed ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-600"}
          >
            {item.reviewed ? "Reviewed" : "Not Reviewed"}
          </Badge>
        </div>
      </div>

      <Button size="sm" className="w-full mt-4 bg-accent hover:bg-accent/90">
        <Package className="h-4 w-4 mr-2" />
        View Product
      </Button>
    </div>
  </PopoverContent>
)

// Order Details Drawer Component
const OrderDetailsDrawer = ({ order }: { order: any }) => (
  <DrawerContent className="max-h-[95vh]">
    <DrawerHeader className="border-b">
      <DrawerTitle className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
            #{order.id.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold">Order #{order.id.slice(0, 8)}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <DrawerClose asChild>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </DrawerClose>
      </DrawerTitle>
    </DrawerHeader>

    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Status</div>
          <Badge className={`${getStatusColor(order.status)} mt-1`}>
            {getStatusIcon(order.status)}
            <span className="ml-1">{order.status}</span>
          </Badge>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Amount</div>
          <div className="text-xl font-bold text-accent">{formatCurrency(order.total_price)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Payment Method</div>
          <div className="flex items-center gap-2 mt-1">
            {getPaymentIcon(order.paymentMethod)}
            <span className="font-medium">{order.paymentMethod?.replace("_", " ")}</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Priority</div>
          <Badge className={`${getPriorityColor('LOW')} mt-1`}>{order.priority}</Badge>
        </Card>
      </div>

      {/* Order Timeline */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Order Timeline</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium">Order Placed</div>
              <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
            </div>
          </div>
          {order.status !== "PENDING" && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium">Order Confirmed</div>
                <div className="text-sm text-muted-foreground">{formatDate(order.updatedAt)}</div>
              </div>
            </div>
          )}
          {order.shippedAt && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Truck className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium">Order Shipped</div>
                <div className="text-sm text-muted-foreground">{formatDate(order.shippedAt)}</div>
                {order.trackingNumber && <div className="text-sm text-accent">Tracking: {order.trackingNumber}</div>}
              </div>
            </div>
          )}
          {order.deliveredAt && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium">Order Delivered</div>
                <div className="text-sm text-muted-foreground">{formatDate(order.deliveredAt)}</div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Customer & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Customer Information</h4>
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border-2 border-accent/20">
              <AvatarImage src={order.User.profile_picture || "/placeholder.svg"} />
              <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                {order.User.first_name[0]}
                {order.User.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h5 className="font-medium">
                {order.User.first_name} {order.User.last_name}
              </h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  {order.User.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {order.User.phone_number}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold mb-4">Shipping Address</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <div>{order.Adress.street}</div>
                <div>
                  {order.Adress.sub_city}, {order.Adress.city}
                </div>
                <div>
                  {order.Adress.country} {order.Adress.zip_code}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Order Items */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Order Items ({order.OrderItems.length})</h4>
        <div className="space-y-4">
          {order.OrderItems.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={item.product?.image || "/placeholder.svg"}
                alt={item.product?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="font-medium">{item.product?.name}</h5>
                <p className="text-sm text-muted-foreground">{item.product?.category}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.product?.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(item.sub_total)}</div>
                <div className="text-sm text-muted-foreground">
                  {item.quantity} × {formatCurrency(item.price)}
                </div>
                <Badge
                  variant="outline"
                  className={item.reviewed ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-600"}
                >
                  {item.reviewed ? "Reviewed" : "Not Reviewed"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
        <Button className="flex-1 bg-accent hover:bg-accent/90">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Customer
        </Button>
        {order.status === "PENDING" && (
          <Button variant="outline" className="flex-1">
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm Order
          </Button>
        )}
        {order.status === "CONFIRMED" && (
          <Button variant="outline" className="flex-1">
            <Truck className="h-4 w-4 mr-2" />
            Mark as Shipped
          </Button>
        )}
        {order.status === "SHIPPED" && (
          <Button variant="outline" className="flex-1">
            <Package className="h-4 w-4 mr-2" />
            Mark as Delivered
          </Button>
        )}
      </div> */}
    </div>
  </DrawerContent>
)


interface Props{
  orders: Order[]
}
export default function VendorOrdersList({orders}:Props) {


  const [coppiedContent, setCoppiedContent] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (coppiedContent) {
      const timer = setTimeout(() => setCoppiedContent(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [coppiedContent])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.User.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.User.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.User.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === "PENDING").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">Vendor Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold">Orders Management</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track, manage, and fulfill all your customer orders in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-accent/20 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-accent">Total Orders</p>
                  <p className="text-3xl font-bold text-accent">{totalOrders}</p>
                </div>
                <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="h-12 w-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-600">Pending Orders</p>
                  <p className="text-3xl font-bold text-amber-900">{pendingOrders}</p>
                </div>
                <div className="h-12 w-12 bg-amber-200 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold">Filter Orders</h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus:border-accent focus:ring-accent"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 focus:border-accent focus:ring-accent">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-accent/10 hover:border-accent/20"
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold">
                        #{order.id.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">Order #{order.id.slice(0, 8)}</h3>
                          <Badge className={getPriorityColor('SMALL')} variant="outline">
                            {order.priority  ? order.priority : 'No Priority'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-2 px-3 py-1.5`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">{formatCurrency(order.total_price)}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.OrderItems.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Compact Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Customer</h4>
                      <div className="flex items-center gap-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                              <Avatar className="h-10 w-10 border-2 border-accent/20">
                                <AvatarImage src={order.User.profile_picture || "/placeholder.svg"} />
                                <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                                  {order.User.first_name[0]}
                                  {order.User.last_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                <div className="font-medium">
                                  {order.User.first_name} {order.User.last_name}
                                </div>
                                <div className="text-sm text-muted-foreground">{order.User.email}</div>
                              </div>
                            </button>
                          </PopoverTrigger>
                          <UserPopover user={order.User} />
                        </Popover>
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Shipping</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="text-sm">
                            <div>{order.Adress.street}</div>
                            <div className="text-muted-foreground">
                              {order.Adress.city}, {order.Adress.country}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getPaymentIcon('MOBILE_MONEY')}
                          <span className="text-sm">Transfer</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Items ({order.OrderItems.length})
                      </h4>
                      <div className="space-y-2">
                        {order.OrderItems.slice(0, 2).map((item: any) => (
                          <Popover key={item.id}>
                            <PopoverTrigger asChild>
                              <button className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors w-full text-left">
                                <img
                                  src={ "/placeholder.png"}
                                  alt={item.product?.name}
                                  className="w-8 h-8 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm truncate">{item.product?.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {item.quantity} × {formatCurrency(item.price)}
                                  </div>
                                </div>
                              </button>
                            </PopoverTrigger>
                            <ProductPopover product={item.product} item={item} />
                          </Popover>
                        ))}
                        {order.OrderItems.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{order.OrderItems.length - 2} more items</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button className="flex-1 bg-accent hover:bg-accent/90">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DrawerTrigger>
                      <OrderDetailsDrawer order={order} />
                    </Drawer>

                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <MoreHorizontal className="h-4 w-4 mr-2" />
                          Quick Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {order.status === "PENDING" && (
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm Order
                          </DropdownMenuItem>
                        )}
                        {order.status === "CONFIRMED" && (
                          <DropdownMenuItem>
                            <Truck className="h-4 w-4 mr-2" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status === "SHIPPED" && (
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria to find the orders you're looking for."
                  : "You haven't received any orders yet. Orders will appear here once customers start placing them."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
