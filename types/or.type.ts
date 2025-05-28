import { IProduct } from "./product.type"

// Base timestamp interface for entities with creation/update tracking
export interface BaseEntity {
    id: string
    updatedAt: string
    createdAt: string
  }
  
  // Address Interface (keeping original "Adress" spelling for API compatibility)
  export interface Address extends BaseEntity {
    street: string
    city: string
    sub_city: string
    zip_code: string
    country: string
    latitude: number | null
    longitude: number | null
    is_default: boolean
    vendorId: string | null
    userId: string
  }
  
  // User Interface
  export interface User extends BaseEntity {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    password: string
    date_of_birth: string | null
    gender: string | null
    profile_picture: string | null
    role: UserRole
    status: UserStatus
    authProvider: AuthProvider
    is_onboarding: boolean
    need_reset_password: boolean
    idPhoto_front: string | null
    idPhoto_back: string | null
    verify_status: VerifyStatus
    reset_password_token: string | null
    reset_password_token_expires_at: string | null
  }
  
  // Order Item Interface
  export interface OrderItem extends BaseEntity {
    price: number
    quantity: number
    sub_total: number
    reviewed: boolean
    orderId: string
    productId: string
    Product: IProduct
  }
  
  // Main Order Interface
  export interface Order extends BaseEntity {
    priority: React.ReactNode
    total_price: number
    status: OrderStatus
    shippedAt: string | null
    deliveredAt: string | null
    receivedAt: string | null
    cartId: string
    userId: string
    vendorId: string
    addressId: string
    
    // Related entities (as they appear in the API response)
    Adress: Address // Note: keeping original spelling for API compatibility
    OrderItems: OrderItem[]
    User: User
  }
  
  // Enums and Union Types
  export type OrderStatus = 
    | "PENDING" 
    | "CONFIRMED" 
    | "SHIPPED" 
    | "DELIVERED" 
    | "CANCELLED" 
    | "REFUNDED"
  
  export type UserRole = 
    | "CUSTOMER" 
    | "VENDOR" 
    | "ADMIN"
  
  export type UserStatus = 
    | "ACTIVE" 
    | "INACTIVE" 
    | "SUSPENDED" 
    | "BANNED"
  
  export type AuthProvider = 
    | "EMAIL" 
    | "GOOGLE" 
    | "FACEBOOK" 
    | "APPLE"
  
  export type VerifyStatus = 
    | "PENDING" 
    | "VERIFIED" 
    | "REJECTED" 
    | "REQUESTED"
  
  // Extended interfaces with computed properties for UI
  export interface OrderWithComputedFields extends Order {
    totalItems: number
    orderAge: string
    isOverdue: boolean
    canBeCancelled: boolean
    estimatedDeliveryDate: string | null
  }
  
  export interface UserWithComputedFields extends User {
    fullName: string
    memberSince: string
    hasCompleteProfile: boolean
    isVerified: boolean
    profileCompletionPercentage: number
  }
  
  // API Response Types
  export interface OrdersApiResponse {
    orders: Order[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
    }
    filters: OrderFilters
  }
  
  export interface OrderApiResponse {
    order: Order
    statusHistory?: OrderStatusHistory[]
    relatedOrders?: Order[]
  }
  
  // Filter and Search Types
  export interface OrderFilters {
    status?: OrderStatus | "all"
    userId?: string
    vendorId?: string
    dateRange?: {
      from: string
      to: string
    }
    minAmount?: number
    maxAmount?: number
    searchTerm?: string
    city?: string
    country?: string
  }
  
  export interface OrderSearchParams {
    query?: string
    status?: OrderStatus
    page?: number
    limit?: number
    sortBy?: OrderSortField
    sortOrder?: "asc" | "desc"
  }
  
  export type OrderSortField = 
    | "createdAt" 
    | "updatedAt" 
    | "total_price" 
    | "status"
    | "customer_name"
  
  // Order Status History for tracking changes
  export interface OrderStatusHistory extends BaseEntity {
    orderId: string
    previousStatus: OrderStatus | null
    newStatus: OrderStatus
    changedBy: string
    reason?: string
    notes?: string
  }
  
  // Statistics and Analytics Types
  export interface OrderStatistics {
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    ordersByStatus: Record<OrderStatus, number>
    revenueByMonth: Array<{
      month: string
      revenue: number
      orderCount: number
    }>
    topCustomers: Array<{
      user: User
      totalOrders: number
      totalSpent: number
    }>
    geographicDistribution: Array<{
      city: string
      country: string
      orderCount: number
      revenue: number
    }>
  }
  
  // Form Types for Creating/Updating Orders
  export interface CreateOrderRequest {
    userId: string
    vendorId: string
    addressId: string
    items: Array<{
      productId: string
      quantity: number
      price: number
    }>
    notes?: string
  }
  
  export interface UpdateOrderRequest {
    status?: OrderStatus
    shippedAt?: string
    deliveredAt?: string
    receivedAt?: string
    notes?: string
  }
  
  export interface UpdateOrderItemRequest {
    quantity?: number
    price?: number
    reviewed?: boolean
  }
  
  // Validation Types
  export interface OrderValidationResult {
    isValid: boolean
    errors: string[]
    warnings: string[]
  }
  
  export interface UserValidationResult {
    isValid: boolean
    errors: string[]
    missingFields: string[]
    profileCompleteness: number
  }
  
  // Utility Types
  export type OrderWithoutRelations = Omit<Order, "Adress" | "OrderItems" | "User">
  export type OrderItemWithoutRelations = Omit<OrderItem, "Order" | "Product">
  export type UserWithoutSensitiveData = Omit<User, "password" | "reset_password_token">
  
  // Constants
  export const ORDER_STATUSES: OrderStatus[] = [
    "PENDING",
    "CONFIRMED", 
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED"
  ]
  
  export const USER_ROLES: UserRole[] = [
    "CUSTOMER",
    "VENDOR", 
    "ADMIN"
  ]
  
  export const VERIFY_STATUSES: VerifyStatus[] = [
    "PENDING",
    "VERIFIED",
    "REJECTED", 
    "REQUESTED"
  ]
  
  export const AUTH_PROVIDERS: AuthProvider[] = [
    "EMAIL",
    "GOOGLE",
    "FACEBOOK",
    "APPLE"
  ]
  
  // Type Guards
  export const isValidOrderStatus = (status: string): status is OrderStatus => {
    return ORDER_STATUSES.includes(status as OrderStatus)
  }
  
  export const isValidUserRole = (role: string): role is UserRole => {
    return USER_ROLES.includes(role as UserRole)
  }
  
  export const isValidVerifyStatus = (status: string): status is VerifyStatus => {
    return VERIFY_STATUSES.includes(status as VerifyStatus)
  }
  
  export const isOrderPending = (order: Order): boolean => {
    return order.status === "PENDING"
  }
  
  export const isOrderCompleted = (order: Order): boolean => {
    return order.status === "DELIVERED"
  }
  
  export const isOrderCancellable = (order: Order): boolean => {
    return ["PENDING", "CONFIRMED"].includes(order.status)
  }
  
  export const isUserVerified = (user: User): boolean => {
    return user.verify_status === "VERIFIED"
  }
  
  // Helper Functions
  export const getOrderStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
      PENDING: "bg-amber-50 text-amber-700 border-amber-200",
      CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200", 
      SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
      DELIVERED: "bg-green-50 text-green-700 border-green-200",
      CANCELLED: "bg-red-50 text-red-700 border-red-200",
      REFUNDED: "bg-gray-50 text-gray-700 border-gray-200"
    }
    return colors[status] || colors.PENDING
  }
  
  export const getVerifyStatusColor = (status: VerifyStatus): string => {
    const colors: Record<VerifyStatus, string> = {
      PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
      VERIFIED: "bg-green-50 text-green-700 border-green-200",
      REJECTED: "bg-red-50 text-red-700 border-red-200", 
      REQUESTED: "bg-blue-50 text-blue-700 border-blue-200"
    }
    return colors[status] || colors.PENDING
  }
  
  export const formatOrderId = (id: string): string => {
    return `#${id.slice(0, 8).toUpperCase()}`
  }
  
  export const formatUserName = (user: User): string => {
    return `${user.first_name.trim()} ${user.last_name.trim()}`
  }
  
  export const formatAddress = (address: Address): string => {
    return `${address.street}, ${address.sub_city}, ${address.city}, ${address.country}`
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
  
  export const calculateTotalItems = (orderItems: OrderItem[]): number => {
    return orderItems.reduce((total, item) => total + item.quantity, 0)
  }
  
  export const isOrderOverdue = (order: Order): boolean => {
    if (order.status === "DELIVERED" || order.status === "CANCELLED") return false
    
    const daysSinceOrder = Math.floor(
      (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    )
    
    // Business rules for overdue orders
    switch (order.status) {
      case "PENDING":
        return daysSinceOrder > 2 // 2 days to confirm
      case "CONFIRMED": 
        return daysSinceOrder > 5 // 5 days to ship
      case "SHIPPED":
        return daysSinceOrder > 10 // 10 days to deliver
      default:
        return false
    }
  }
  
  export const getNextOrderStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      PENDING: "CONFIRMED",
      CONFIRMED: "SHIPPED", 
      SHIPPED: "DELIVERED",
      DELIVERED: null,
      CANCELLED: null,
      REFUNDED: null
    }
    return statusFlow[currentStatus]
  }
  
  export const canUpdateOrderStatus = (
    currentStatus: OrderStatus, 
    newStatus: OrderStatus
  ): boolean => {
    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ["CONFIRMED", "CANCELLED"],
      CONFIRMED: ["SHIPPED", "CANCELLED"],
      SHIPPED: ["DELIVERED", "CANCELLED"], 
      DELIVERED: ["REFUNDED"],
      CANCELLED: [],
      REFUNDED: []
    }
    return allowedTransitions[currentStatus]?.includes(newStatus) || false
  }
  
  // Data transformation utilities
  export const transformOrderForDisplay = (order: Order): OrderWithComputedFields => {
    return {
      ...order,
      totalItems: calculateTotalItems(order.OrderItems),
      orderAge: calculateOrderAge(order.createdAt),
      isOverdue: isOrderOverdue(order),
      canBeCancelled: isOrderCancellable(order),
      estimatedDeliveryDate: order.shippedAt 
        ? new Date(new Date(order.shippedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : null
    }
  }
  
  export const transformUserForDisplay = (user: User): UserWithComputedFields => {
    const requiredFields = ['first_name', 'last_name', 'email', 'phone_number']
    const optionalFields = ['date_of_birth', 'gender', 'profile_picture']
    
    const completedRequired = requiredFields.filter(field => 
      user[field as keyof User] && String(user[field as keyof User]).trim()
    ).length
    
    const completedOptional = optionalFields.filter(field => 
      user[field as keyof User] && String(user[field as keyof User]).trim()
    ).length
    
    const profileCompletionPercentage = Math.round(
      ((completedRequired + completedOptional) / (requiredFields.length + optionalFields.length)) * 100
    )
  
    return {
      ...user,
      fullName: formatUserName(user),
      memberSince: calculateOrderAge(user.createdAt),
      hasCompleteProfile: completedRequired === requiredFields.length,
      isVerified: isUserVerified(user),
      profileCompletionPercentage
    }
  }
  
  // Export sample data type for testing
  export type SampleOrderData = Order[]
  