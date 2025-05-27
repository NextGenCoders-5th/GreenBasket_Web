"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Area } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Package,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Filter,
  Eye,
  Users,
  Tag,
  Package2,
  Percent,
} from "lucide-react"
import { useAppSelector } from "@/redux/store"
import { IUser } from "@/types/user.type"

const data = [
  { month: "Jan", orders: 60, sales: 20, revenue: 1200 },
  { month: "Feb", orders: 20, sales: 60, revenue: 1800 },
  { month: "Mar", orders: 40, sales: 80, revenue: 2400 },
  { month: "Apr", orders: 50, sales: 40, revenue: 2000 },
  { month: "May", orders: 70, sales: 60, revenue: 2800 },
  { month: "Jun", orders: 90, sales: 30, revenue: 3200 },
  { month: "Jul", orders: 50, sales: 30, revenue: 2200 },
  { month: "Aug", orders: 120, sales: 160, revenue: 4800 },
  { month: "Sep", orders: 100, sales: 80, revenue: 3600 },
  { month: "Oct", orders: 160, sales: 60, revenue: 4200 },
  { month: "Nov", orders: 110, sales: 70, revenue: 3800 },
  { month: "Dec", orders: 115, sales: 75, revenue: 4000 },
]

// Updated product data structure
const featuredProducts = [
  {
    id: "c11ab695-b864-4435-8c1a-be48ef77c5f9",
    updatedAt: "2025-05-26T21:10:19.762Z",
    createdAt: "2025-05-26T21:10:19.762Z",
    name: "Fresh Organic Cabbage",
    description: "Fresh cabbage, perfect for salads and stir-fries.",
    price: 49.49,
    discount_price: 13.36,
    unit: "kg",
    stock: 599,
    image_url:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D",
    status: "ACTIVE",
    is_featured: true,
    vendorId: "45dd5772-d967-4a80-a6a7-e611a0d83687",
    Vendor: {
      id: "45dd5772-d967-4a80-a6a7-e611a0d83687",
      business_name: "Pacocha, Goldner and O'Hara",
      business_email: "muriel.rath@gmail.com",
      logo_url: "https://loremflickr.com/320/240/business?lock=2840795584957717",
    },
    categories: [
      {
        id: "3905e621-1075-47be-97ea-63639be6b908",
        name: "Vegetables",
      },
    ],
    sales_count: 1250,
    revenue: 62475,
    trend: "+15.3%",
  },
  {
    id: "d22bc696-c975-5546-9d2b-cf59fg88d6g0",
    updatedAt: "2025-05-26T20:15:30.123Z",
    createdAt: "2025-05-26T20:15:30.123Z",
    name: "Premium Tomatoes",
    description: "Fresh, juicy tomatoes perfect for cooking and salads.",
    price: 35.99,
    discount_price: 28.99,
    unit: "kg",
    stock: 423,
    image_url: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500&auto=format&fit=crop&q=60",
    status: "ACTIVE",
    is_featured: false,
    vendorId: "56ee8883-e078-58b1-a8c3-df70hg99e7h1",
    Vendor: {
      id: "56ee8883-e078-58b1-a8c3-df70hg99e7h1",
      business_name: "Fresh Farm Co.",
      business_email: "contact@freshfarm.com",
      logo_url: "https://loremflickr.com/320/240/farm?lock=1234567890",
    },
    categories: [
      {
        id: "4016f732-2186-58cf-a8fb-74750cf7c919",
        name: "Vegetables",
      },
    ],
    sales_count: 980,
    revenue: 35301,
    trend: "+8.7%",
  },
  {
    id: "e33cd707-d086-6657-ae3c-eg81ih00f8i2",
    updatedAt: "2025-05-26T19:45:15.456Z",
    createdAt: "2025-05-26T19:45:15.456Z",
    name: "Organic Carrots",
    description: "Sweet, crunchy organic carrots grown locally.",
    price: 28.5,
    discount_price: 22.8,
    unit: "kg",
    stock: 756,
    image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60",
    status: "ACTIVE",
    is_featured: true,
    vendorId: "67ff9994-f189-69c2-b9d4-fh92ji11g9j3",
    Vendor: {
      id: "67ff9994-f189-69c2-b9d4-fh92ji11g9j3",
      business_name: "Organic Valley",
      business_email: "info@organicvalley.com",
      logo_url: "https://loremflickr.com/320/240/organic?lock=9876543210",
    },
    categories: [
      {
        id: "5127g843-3297-69dg-b9gc-85861dg8d020",
        name: "Organic",
      },
    ],
    sales_count: 1456,
    revenue: 41568,
    trend: "+22.1%",
  },
  {
    id: "f44de818-e197-7768-bf4d-gi03kj22h0k4",
    updatedAt: "2025-05-26T18:30:45.789Z",
    createdAt: "2025-05-26T18:30:45.789Z",
    name: "Fresh Spinach",
    description: "Nutrient-rich fresh spinach leaves.",
    price: 42.0,
    discount_price: 35.7,
    unit: "kg",
    stock: 234,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60",
    status: "ACTIVE",
    is_featured: false,
    vendorId: "78gg0005-g200-70d3-c0e5-gi03kl33i1l5",
    Vendor: {
      id: "78gg0005-g200-70d3-c0e5-gi03kl33i1l5",
      business_name: "Green Leaf Farms",
      business_email: "sales@greenleaf.com",
      logo_url: "https://loremflickr.com/320/240/green?lock=5432109876",
    },
    categories: [
      {
        id: "6238h954-4308-70eh-c0hd-96972eh9e131",
        name: "Leafy Greens",
      },
    ],
    sales_count: 789,
    revenue: 33138,
    trend: "-3.2%",
  },
  {
    id: "g55ef929-f208-8879-cg5e-hj14lm44j2m6",
    updatedAt: "2025-05-26T17:20:30.012Z",
    createdAt: "2025-05-26T17:20:30.012Z",
    name: "Bell Peppers Mix",
    description: "Colorful mix of red, yellow, and green bell peppers.",
    price: 65.99,
    discount_price: 52.79,
    unit: "kg",
    stock: 345,
    image_url: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=60",
    status: "ACTIVE",
    is_featured: true,
    vendorId: "89hh1116-h311-81e4-d1f6-hj14mn44j2n7",
    Vendor: {
      id: "89hh1116-h311-81e4-d1f6-hj14mn44j2n7",
      business_name: "Rainbow Produce",
      business_email: "orders@rainbowproduce.com",
      logo_url: "https://loremflickr.com/320/240/rainbow?lock=1357924680",
    },
    categories: [
      {
        id: "7349i065-5419-81fi-d1ie-07083fi0f242",
        name: "Peppers",
      },
    ],
    sales_count: 567,
    revenue: 37461,
    trend: "+11.8%",
  },
]

const statsCards = [
  {
    title: "Total Orders",
    value: "684",
    change: "+12.5%",
    icon: ShoppingCart,
    trend: "up",
    description: "vs last month",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
  },
  {
    title: "Total Revenue",
    value: "12,345 Birr",
    change: "+8.2%",
    icon: DollarSign,
    trend: "up",
    description: "vs last month",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
  },
  {
    title: "Payments Received",
    value: "3,456 Birr",
    change: "-2.1%",
    icon: CreditCard,
    trend: "down",
    description: "vs last month",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
  },
  {
    title: "Active Customers",
    value: "2,847",
    change: "+18.3%",
    icon: Users,
    trend: "up",
    description: "vs last month",
    color: "from-orange-500 to-orange-600",
    bgColor: "from-orange-50 to-orange-100",
  },
]

export default function VendorDashboard() {
  const user = useAppSelector(state => state.auth.user) as IUser | null;
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 border border-accent-200 rounded-xl shadow-2xl">
          <p className="font-semibold text-slate-800 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <p className="text-sm text-slate-600">
                {`${entry.dataKey}: `}
                <span className="font-semibold text-slate-800">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const calculateDiscount = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
  }

  return (
    <div className="h-[90vh] overflow-auto scrollbar-custom bg-gradient-to-br from-slate-50 via-white to-accent-50/30 p-4 md:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-600 via-accent-700 to-accent-800 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-3xl font-bold mb-2"
              >
                Welcome, {user?.first_name || user?.email}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent-100 text-lg"
              >
                Monitor your business performance in real-time
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_1fr_1.4fr] gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="relative p-0 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`}></div>
                    <CardContent className="relative p-4">
                    <p className="text-sm font-medium mb-2 text-slate-600">{stat.title}</p>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Chart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        Performance Analytics
                      </CardTitle>
                      <p className="text-slate-600 mt-1">Monthly orders, sales, and revenue trends</p>
                    </div>

                    <Tabs defaultValue="yearly" className="w-auto">
                      <TabsList className="bg-slate-100 border-0 shadow-sm">
                        <TabsTrigger
                          value="today"
                          className="data-[state=active]:bg-accent-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                          Today
                        </TabsTrigger>
                        <TabsTrigger
                          value="weekly"
                          className="data-[state=active]:bg-accent-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                          Weekly
                        </TabsTrigger>
                        <TabsTrigger
                          value="yearly"
                          className="data-[state=active]:bg-accent-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                        >
                          Yearly
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10b981"
                          fill="url(#revenueGradient)"
                          strokeWidth={2}
                        />
                        <Bar dataKey="orders" barSize={28} fill="url(#orderGradient)" radius={[8, 8, 0, 0]} />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enhanced Sidebar - Updated Top Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-1 space-y-6"
          >
            {/* Top Products Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    Top Products
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-slate-600 text-sm">Best performing products this month</p>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-6 space-y-4">
                    {featuredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-transparent hover:from-accent-50 hover:to-accent-25 transition-all duration-300 border border-transparent hover:border-accent-200 hover:shadow-lg">
                          {/* Rank Badge */}
                          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                            {index + 1}
                          </div>

                          {/* Featured Badge */}
                          {product.is_featured && (
                            <div className="absolute -top-2 -right-2">
                              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 shadow-lg">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                                <AvatarImage
                                  src={product.image_url || "/placeholder.svg"}
                                  alt={product.name}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-br from-accent-100 to-accent-200">
                                  {product.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              {/* Stock Status Indicator */}
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                  product.stock > 100
                                    ? "bg-green-500"
                                    : product.stock > 50
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              ></div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">
                                  {product.name}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className={`ml-2 text-xs font-bold ${
                                    product.trend.startsWith("+")
                                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                      : "bg-red-100 text-red-700 border-red-200"
                                  }`}
                                >
                                  {product.trend}
                                </Badge>
                              </div>

                              {/* Categories */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {product.categories.map((category) => (
                                  <Badge
                                    key={category.id}
                                    variant="outline"
                                    className="text-xs bg-slate-100 text-slate-600 border-slate-200"
                                  >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {category.name}
                                  </Badge>
                                ))}
                              </div>

                              <div className="space-y-2">
                                {/* Pricing */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Price</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-accent-600">
                                      {formatPrice(product.discount_price)}
                                    </span>
                                    <span className="text-xs text-slate-400 line-through">
                                      {formatPrice(product.price)}
                                    </span>
                                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                                      <Percent className="w-3 h-3 mr-1" />
                                      {calculateDiscount(product.price, product.discount_price)}%
                                    </Badge>
                                  </div>
                                </div>

                                {/* Sales & Revenue */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Sales</span>
                                  <span className="font-semibold text-slate-700">
                                    {product.sales_count.toLocaleString()}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Revenue</span>
                                  <span className="font-bold text-emerald-600">{formatPrice(product.revenue)}</span>
                                </div>

                                {/* Stock & Vendor */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Stock</span>
                                  <div className="flex items-center gap-1">
                                    <Package2 className="w-3 h-3 text-slate-400" />
                                    <span className="text-xs font-medium text-slate-700">
                                      {product.stock} {product.unit}
                                    </span>
                                  </div>
                                </div>

                                {/* Vendor Info */}
                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-5 h-5">
                                      <AvatarImage
                                        src={product.Vendor.logo_url || "/placeholder.svg"}
                                        alt={product.Vendor.business_name}
                                      />
                                      <AvatarFallback className="text-xs bg-accent-100">
                                        {product.Vendor.business_name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-slate-600 truncate max-w-[100px]">
                                      {product.Vendor.business_name}
                                    </span>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </div>

                                {/* Last Updated */}
                                <div className="text-xs text-slate-400 text-center pt-1">
                                  Updated {formatDate(product.updatedAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < featuredProducts.length - 1 && (
                          <Separator className="mt-4 bg-gradient-to-r from-transparent via-accent-200 to-transparent" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
