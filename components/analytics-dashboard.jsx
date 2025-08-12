"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Package, DollarSign, Users, ShoppingCart, RefreshCw, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)

  const [dashboardData] = useState({
    summary: {
      totalSales: 1250000,
      totalOrders: 580,
      activeCustomers: 320,
      totalProducts: 1500,
      lowStockItems: 45,
      outOfStockItems: 12,
    },
    salesTrend: [
      { date: "Jan 1", sales: 12000, orders: 15 },
      { date: "Jan 2", sales: 15000, orders: 18 },
      { date: "Jan 3", sales: 11000, orders: 12 },
      { date: "Jan 4", sales: 18000, orders: 22 },
      { date: "Jan 5", sales: 13000, orders: 16 },
      { date: "Jan 6", sales: 16000, orders: 20 },
      { date: "Jan 7", sales: 14000, orders: 17 },
    ],
    topProducts: [
      { name: "Ceylon Black Tea", sales: 250000, quantity: 3000 },
      { name: "Cinnamon Sticks", sales: 180000, quantity: 1500 },
      { name: "Cashew Nuts", sales: 120000, quantity: 500 },
      { name: "Coconut Oil", sales: 90000, quantity: 1000 },
      { name: "Turmeric Powder", sales: 75000, quantity: 800 },
    ],
    categorySales: [
      { name: "Tea", value: 350000 },
      { name: "Spices", value: 250000 },
      { name: "Nuts", value: 180000 },
      { name: "Oils", value: 120000 },
      { name: "Grains", value: 90000 },
    ],
    warehouseStock: [
      { name: "Colombo Main Hub", stockValue: 850000, items: 800 },
      { name: "Kandy Branch", stockValue: 420000, items: 450 },
      { name: "Galle Distribution", stockValue: 310000, items: 300 },
      { name: "Matara Warehouse", stockValue: 180000, items: 200 },
    ],
  })

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const PIE_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Analytics Dashboard</CardTitle>
              <CardDescription>Overview of key inventory and sales metrics</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={refreshData} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Sales</p>
                <p className="text-3xl font-bold">{formatCurrency(dashboardData.summary.totalSales)}</p>
              </div>
              <DollarSign className="h-10 w-10 opacity-70" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Total Orders</p>
                <p className="text-3xl font-bold">{dashboardData.summary.totalOrders}</p>
              </div>
              <ShoppingCart className="h-10 w-10 opacity-70" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Low Stock Items</p>
                <p className="text-3xl font-bold">{dashboardData.summary.lowStockItems}</p>
              </div>
              <AlertTriangle className="h-10 w-10 opacity-70" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Active Customers</p>
                <p className="text-3xl font-bold">{dashboardData.summary.activeCustomers}</p>
              </div>
              <Users className="h-10 w-10 opacity-70" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales & Order Trend</CardTitle>
            <CardDescription>Daily sales and order count over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  name="Sales (LKR)"
                />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Products by Sales</CardTitle>
            <CardDescription>Best-selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3B82F6" name="Sales (LKR)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.categorySales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Warehouse Stock Value */}
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Stock Value</CardTitle>
            <CardDescription>Total value of inventory held in each warehouse</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.warehouseStock}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis formatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="stockValue" fill="#10B981" name="Stock Value (LKR)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity & Alerts</CardTitle>
          <CardDescription>Important updates and notifications from your system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Low Stock Alert: Ceylon Black Tea (SKU: TEA-CBT-001)</p>
                <p className="text-sm text-yellow-700">Current stock: 450, Minimum: 500. Reorder soon!</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">New Sales Order: SO-2024-005</p>
                <p className="text-sm text-blue-700">Order from 'ABC Traders' for LKR 25,000.00</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Stock Received: Cashew Nuts (SKU: NUT-CAS-004)</p>
                <p className="text-sm text-green-700">1200 units received at Colombo Main Hub</p>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
