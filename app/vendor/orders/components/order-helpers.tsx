import type { Order, OrderItem, OrderStatistics, Product } from "@/types/order.type"
import { IUser } from "@/types/user.type"

// Currency formatting
export const formatCurrency = (amount: number, currency = "ETB"): string => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Date formatting
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return new Date(dateString).toLocaleDateString("en-US", { ...defaultOptions, ...options })
}

export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, {
    month: "short",
    day: "numeric",
  })
}

export const formatDateLong = (dateString: string): string => {
  return formatDate(dateString, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Order calculations
export const calculateOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + item.sub_total, 0)
}

export const calculateTotalItems = (items: OrderItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export const calculateAverageOrderValue = (orders: Order[]): number => {
  if (orders.length === 0) return 0
  const total = orders.reduce((sum, order) => sum + order.total_price, 0)
  return total / orders.length
}

// Order filtering and sorting
export const filterOrdersByStatus = (orders: Order[], status: string): Order[] => {
  if (status === "all") return orders
  return orders.filter((order) => order.status === status)
}

export const filterOrdersByDateRange = (orders: Order[], startDate: string, endDate: string): Order[] => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt)
    return orderDate >= start && orderDate <= end
  })
}

export const filterOrdersByAmount = (orders: Order[], minAmount?: number, maxAmount?: number): Order[] => {
  return orders.filter((order) => {
    if (minAmount && order.total_price < minAmount) return false
    if (maxAmount && order.total_price > maxAmount) return false
    return true
  })
}

export const searchOrders = (orders: Order[], searchTerm: string): Order[] => {
  if (!searchTerm.trim()) return orders

  const term = searchTerm.toLowerCase()

  return orders.filter(
    (order) =>
      order.id.toLowerCase().includes(term) ||
      order.User.first_name?.toLowerCase().includes(term) ||
      order.User.last_name?.toLowerCase().includes(term) ||
      order.User.email.toLowerCase().includes(term) ||
      order.OrderItems.some(
        (item) => item.product.name.toLowerCase().includes(term) || item.product.category.toLowerCase().includes(term),
      ),
  )
}

export const sortOrders = (orders: Order[], sortBy: string, sortOrder: "asc" | "desc" = "desc"): Order[] => {
  const sorted = [...orders].sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (sortBy) {
      case "date":
        aValue = new Date(a.createdAt).getTime()
        bValue = new Date(b.createdAt).getTime()
        break
      case "amount":
        aValue = a.total_price
        bValue = b.total_price
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      case "customer":
        aValue = `${a.User.first_name} ${a.User.last_name}`
        bValue = `${b.User.first_name} ${b.User.last_name}`
        break
      case "priority":
        const priorityOrder = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
        aValue = priorityOrder[a.priority]
        bValue = priorityOrder[b.priority]
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  return sorted
}

// Statistics calculations
export const calculateOrderStatistics = (orders: Order[]): OrderStatistics => {
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)

  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate top products
  const productStats = orders
    .flatMap((order) => order.OrderItems)
    .reduce(
      (acc, item) => {
        const productId = item.productId
        if (!acc[productId]) {
          acc[productId] = {
            product: item.product,
            totalSold: 0,
            revenue: 0,
          }
        }
        acc[productId].totalSold += item.quantity
        acc[productId].revenue += item.sub_total
        return acc
      },
      {} as Record<string, { product: Product; totalSold: number; revenue: number }>,
    )

  const topProducts = Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Calculate top customers
  const customerStats = orders.reduce(
    (acc, order) => {
      const userId = order.userId
      if (!acc[userId]) {
        acc[userId] = {
          user: order.User,
          totalOrders: 0,
          totalSpent: 0,
        }
      }
      acc[userId].totalOrders += 1
      acc[userId].totalSpent += order.total_price
      return acc
    },
    {} as Record<string, { user: IUser; totalOrders: number; totalSpent: number }>,
  )

  const topCustomers = Object.values(customerStats)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)

  // Calculate revenue by month
  const revenueByMonth = orders.reduce(
    (acc, order) => {
      const month = new Date(order.createdAt).toISOString().slice(0, 7) // YYYY-MM
      if (!acc[month]) {
        acc[month] = { month, revenue: 0, orders: 0 }
      }
      acc[month].revenue += order.total_price
      acc[month].orders += 1
      return acc
    },
    {} as Record<string, { month: string; revenue: number; orders: number }>,
  )

  // Calculate orders by status with percentages
  const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
    status: status as Order["status"],
    count,
    percentage: Math.round((count / totalOrders) * 100),
  }))

  return {
    totalOrders,
    totalRevenue,
    pendingOrders: statusCounts.PENDING || 0,
    confirmedOrders: statusCounts.CONFIRMED || 0,
    shippedOrders: statusCounts.SHIPPED || 0,
    deliveredOrders: statusCounts.DELIVERED || 0,
    cancelledOrders: statusCounts.CANCELLED || 0,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    topProducts,
    topCustomers,
    revenueByMonth: Object.values(revenueByMonth).sort((a, b) => a.month.localeCompare(b.month)),
    ordersByStatus,
  }
}

// Validation helpers
export const validateOrder = (order: Partial<Order>): string[] => {
  const errors: string[] = []

  if (!order.userId) errors.push("User ID is required")
  if (!order.addressId) errors.push("Address ID is required")
  if (!order.OrderItems || order.OrderItems.length === 0) errors.push("At least one order item is required")
  if (!order.paymentMethod) errors.push("Payment method is required")
  if (order.total_price && order.total_price <= 0) errors.push("Total price must be greater than 0")

  return errors
}

export const validateOrderItem = (item: Partial<OrderItem>): string[] => {
  const errors: string[] = []

  if (!item.productId) errors.push("Product ID is required")
  if (!item.quantity || item.quantity <= 0) errors.push("Quantity must be greater than 0")
  if (!item.price || item.price <= 0) errors.push("Price must be greater than 0")

  return errors
}

// Export helpers
export const exportOrdersToCSV = (orders: Order[]): string => {
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Customer Email",
    "Status",
    "Priority",
    "Payment Method",
    "Total Amount",
    "Items Count",
    "Shipping Address",
  ]

  const rows = orders.map((order) => [
    order.id,
    formatDate(order.createdAt),
    `${order.User.first_name} ${order.User.last_name}`,
    order.User.email,
    order.status,
    order.priority,
    order.paymentMethod,
    order.total_price.toString(),
    calculateTotalItems(order.OrderItems).toString(),
    `${order.Adress.street}, ${order.Adress.city}, ${order.Adress.country}`,
  ])

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n")

  return csvContent
}

// Notification helpers
const formatOrderIdLocal = (id: string): string => {
  return `#${id}`
}

export const getOrderNotificationMessage = (order: Order, previousStatus?: string): string => {
  const customerName = `${order.User.first_name} ${order.User.last_name}`
  const orderId = formatOrderIdLocal(order.id)

  switch (order.status) {
    case "CONFIRMED":
      return `Order ${orderId} from ${customerName} has been confirmed`
    case "SHIPPED":
      return `Order ${orderId} has been shipped to ${customerName}`
    case "DELIVERED":
      return `Order ${orderId} has been delivered to ${customerName}`
    case "CANCELLED":
      return `Order ${orderId} from ${customerName} has been cancelled`
    default:
      return `Order ${orderId} status updated to ${order.status}`
  }
}

// Time-based helpers
export const isOrderOverdue = (order: Order): boolean => {
  if (order.status === "DELIVERED" || order.status === "CANCELLED") return false

  const daysSinceOrder = Math.floor(
    (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60 * 24),
  )

  // Consider orders overdue after 7 days for pending, 3 days for confirmed
  switch (order.status) {
    case "PENDING":
      return daysSinceOrder > 7
    case "CONFIRMED":
      return daysSinceOrder > 3
    case "SHIPPED":
      return daysSinceOrder > 14
    default:
      return false
  }
}

export const getEstimatedDeliveryDate = (order: Order): Date | null => {
  if (!order.shippedAt) return null

  // Estimate 3-5 business days for delivery
  const shippedDate = new Date(order.shippedAt)
  const estimatedDays = order.priority === "URGENT" ? 1 : order.priority === "HIGH" ? 2 : 3

  const estimatedDate = new Date(shippedDate)
  estimatedDate.setDate(estimatedDate.getDate() + estimatedDays)

  return estimatedDate
}

export const getOrderStatusColor = (status: Order["status"]): string => {
  const colors: Record<Order["status"], string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
  }
  return colors[status] || colors.PENDING
}

export const getPriorityColor = (priority: Order["priority"]): string => {
  const colors: Record<Order["priority"], string> = {
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
