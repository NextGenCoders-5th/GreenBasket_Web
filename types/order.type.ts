import { Role } from "@/enums/role.enum"
import { IUser } from "./user.type"


// Address Interface
export interface Address {
  id: string
  updatedAt: string
  createdAt: string
  street: string
  city: string
  sub_city: string
  zip_code: string
  country: string
  latitude: number
  longitude: number
  is_default: boolean
  vendorId?: string | null
  userId: string
}

// Product Interface
export interface Product {
  id: string
  name: string
  category: string
  image: string
  rating: number
  description: string
  price?: number
  stock_quantity?: number
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  tags?: string[]
  brand?: string
  is_active?: boolean
}

// Order Item Interface
export interface OrderItem {
  id: string
  updatedAt: string
  createdAt: string
  price: number
  quantity: number
  sub_total: number
  reviewed: boolean
  orderId: string
  productId: string
  product: Product
  discount_amount?: number
  tax_amount?: number
  notes?: string
}

// Order Interface
export interface Order {
  id: string
  updatedAt: string
  createdAt: string
  total_price: number
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  shippedAt?: string | null
  deliveredAt?: string | null
  receivedAt?: string | null
  cancelledAt?: string | null
  refundedAt?: string | null
  paymentMethod: "CARD" | "MOBILE_MONEY" | "CASH_ON_DELIVERY" | "BANK_TRANSFER"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  cartId: string
  userId: string
  vendorId: string
  addressId: string
  trackingNumber?: string
  estimatedDeliveryDate?: string
  specialInstructions?: string
  discount_amount?: number
  tax_amount?: number
  shipping_cost?: number

  // Related entities
  Adress: Address // Note: keeping original typo for consistency
  OrderItems: OrderItem[]
  User: IUser

  // Additional computed fields
  totalItems?: number
  orderAge?: string
  isUrgent?: boolean
}

// Order Status History Interface
export interface OrderStatusHistory {
  id: string
  orderId: string
  status: Order["status"]
  changedAt: string
  changedBy: string
  notes?: string
  location?: string
}

// Payment Interface
export interface Payment {
  id: string
  orderId: string
  amount: number
  method: Order["paymentMethod"]
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  transactionId?: string
  processedAt?: string
  failureReason?: string
  refundAmount?: number
  refundedAt?: string
}

// Shipping Interface
export interface Shipping {
  id: string
  orderId: string
  carrier: string
  trackingNumber: string
  shippedAt: string
  estimatedDeliveryDate: string
  actualDeliveryDate?: string
  shippingCost: number
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  status: "PREPARING" | "SHIPPED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "FAILED"
}

// Review Interface
export interface Review {
  id: string
  orderId: string
  orderItemId: string
  userId: string
  productId: string
  rating: number
  comment?: string
  images?: string[]
  createdAt: string
  updatedAt: string
  isVerified: boolean
  helpfulCount: number
}

// Vendor Interface
export interface Vendor {
  id: string
  business_name: string
  description?: string
  email: string
  phone_number: string
  address: Address
  logo?: string
  banner?: string
  rating: number
  totalOrders: number
  totalRevenue: number
  isVerified: boolean
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  createdAt: string
  updatedAt: string
}

// Order Filters Interface
export interface OrderFilters {
  status?: Order["status"] | "all"
  priority?: Order["priority"] | "all"
  paymentMethod?: Order["paymentMethod"] | "all"
  dateRange?: {
    from: string
    to: string
  }
  minAmount?: number
  maxAmount?: number
  searchTerm?: string
  customerId?: string
  productId?: string
}

// Order Statistics Interface
export interface OrderStatistics {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  confirmedOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  averageOrderValue: number
  topProducts: Array<{
    product: Product
    totalSold: number
    revenue: number
  }>
  topCustomers: Array<{
    user: IUser
    totalOrders: number
    totalSpent: number
  }>
  revenueByMonth: Array<{
    month: string
    revenue: number
    orders: number
  }>
  ordersByStatus: Array<{
    status: Order["status"]
    count: number
    percentage: number
  }>
}

// API Response Interfaces
export interface OrdersResponse {
  orders: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: OrderFilters
}

export interface OrderResponse {
  order: Order
  statusHistory: OrderStatusHistory[]
  payments: Payment[]
  shipping?: Shipping
  reviews: Review[]
}

// Form Interfaces
export interface UpdateOrderStatusForm {
  status: Order["status"]
  notes?: string
  trackingNumber?: string
  estimatedDeliveryDate?: string
}

export interface CreateOrderForm {
  userId: string
  addressId: string
  items: Array<{
    productId: string
    quantity: number
    price: number
  }>
  paymentMethod: Order["paymentMethod"]
  specialInstructions?: string
  priority?: Order["priority"]
}

export interface OrderItemForm {
  productId: string
  quantity: number
  price: number
  discount_amount?: number
  notes?: string
}

// Utility Types
export type OrderStatus = Order["status"]
export type PaymentMethod = Order["paymentMethod"]
export type Priority = Order["priority"]
export type UserRole = IUser["role"]
export type VerificationStatus = IUser["verify_status"]

// Constants
export const ORDER_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]

export const PAYMENT_METHODS: PaymentMethod[] = ["CARD", "MOBILE_MONEY", "CASH_ON_DELIVERY", "BANK_TRANSFER"]

export const PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"]

export const USER_ROLES: UserRole[] = [...Object.values(Role)]

// Type Guards
export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return ORDER_STATUSES.includes(status as OrderStatus)
}

export const isValidPaymentMethod = (method: string): method is PaymentMethod => {
  return PAYMENT_METHODS.includes(method as PaymentMethod)
}

export const isValidPriority = (priority: string): priority is Priority => {
  return PRIORITIES.includes(priority as Priority)
}

// Helper Functions
export const getOrderStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
  }
  return colors[status] || colors.PENDING
}

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    LOW: "bg-green-50 text-green-700 border-green-200",
    MEDIUM: "bg-yellow-50 text-yellow-700 border-yellow-200",
    HIGH: "bg-orange-50 text-orange-700 border-orange-200",
    URGENT: "bg-red-50 text-red-700 border-red-200",
  }
  return colors[priority] || colors.MEDIUM
}

export const formatOrderId = (id: string): string => {
  return `#${id.slice(0, 8).toUpperCase()}`
}

export const calculateOrderAge = (createdAt: string): string => {
  const now = new Date()
  const orderDate = new Date(createdAt)
  const diffInHours = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  return `${diffInMonths}mo ago`
}

export const isOrderUrgent = (order: Order): boolean => {
  return order.priority === "URGENT" || order.priority === "HIGH"
}

export const getNextOrderStatus = (currentStatus: OrderStatus): OrderStatus | null => {
  const statusFlow: Record<OrderStatus, OrderStatus | null> = {
    PENDING: "CONFIRMED",
    CONFIRMED: "SHIPPED",
    SHIPPED: "DELIVERED",
    DELIVERED: null,
    CANCELLED: null,
    REFUNDED: null,
  }
  return statusFlow[currentStatus]
}

export const canUpdateOrderStatus = (currentStatus: OrderStatus, newStatus: OrderStatus): boolean => {
  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED", "CANCELLED"],
    DELIVERED: ["REFUNDED"],
    CANCELLED: [],
    REFUNDED: [],
  }
  return allowedTransitions[currentStatus]?.includes(newStatus) || false
}

interface CheckoutOrderRequest{
  cartId: string;
  addressId: string;
}

export type { CheckoutOrderRequest };

export interface IOrder extends Order {}
