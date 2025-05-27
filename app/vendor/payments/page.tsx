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
} from "lucide-react"

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

const topProducts = [
  {
    name: "Premium Leaves Collection",
    price: "$49.99",
    category: "Home Decor",
    sales: "15,064",
    image: "/images/leafy.png",
    trend: "+12.5%",
    rating: 4.8,
    revenue: "$753,196",
  },
  {
    name: "Seasonal Fashion Line",
    price: "$799.00",
    category: "Fashion",
    sales: "14,862",
    image: "/images/seasonal.png",
    trend: "+8.3%",
    rating: 4.6,
    revenue: "$11,875,338",
  },
  {
    name: "Fresh Vegetables",
    price: "$99.50",
    category: "Essentials",
    sales: "20,124",
    image: "/images/vegitables.png",
    trend: "+15.7%",
    rating: 4.9,
    revenue: "$2,002,338",
  },
  {
    name: "Organic Fruits",
    price: "$320.00",
    category: "Organic",
    sales: "18,673",
    image: "/images/fruits.png",
    trend: "-3.2%",
    rating: 4.7,
    revenue: "$5,975,360",
  },
  {
    name: "Premium Fruit Selection",
    price: "$1,299.00",
    category: "Premium",
    sales: "15,233",
    image: "/images/fruits1.png",
    trend: "+22.1%",
    rating: 4.5,
    revenue: "$19,787,467",
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
    value: "$12,345",
    change: "+8.2%",
    icon: DollarSign,
    trend: "up",
    description: "vs last month",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "from-emerald-50 to-emerald-100",
  },
  {
    title: "Payments Received",
    value: "$3,456",
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

export default function PaymentsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-accent-50/30 p-4 md:p-6 lg:p-8">
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
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                Revenue Dashboard
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

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
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
                  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`}></div>
                    <CardContent className="relative p-6">
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
                        <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
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

          {/* Enhanced Sidebar */}
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
                    {topProducts.map((product, index) => (
                      <motion.div
                        key={index}
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

                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                                <AvatarImage
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-br from-accent-100 to-accent-200">
                                  {product.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-slate-900 text-sm leading-tight">{product.name}</h4>
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

                              <p className="text-xs text-slate-600 mb-3 bg-slate-100 px-2 py-1 rounded-full inline-block">
                                {product.category}
                              </p>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Price</span>
                                  <span className="font-bold text-accent-600">{product.price}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Sales</span>
                                  <span className="font-semibold text-slate-700">{product.sales}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Revenue</span>
                                  <span className="font-bold text-emerald-600">{product.revenue}</span>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < topProducts.length - 1 && (
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
