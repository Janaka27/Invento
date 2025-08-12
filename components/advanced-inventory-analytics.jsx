"use client"

import { useState } from "react"
import { GradientCard } from "@/components/ui/gradient-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"
import { motion } from "framer-motion"

export function AdvancedInventoryAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  const [analyticsData] = useState({
    turnoverRates: [
      { product: "Gaming Laptop Pro", category: "Electronics", turnoverRate: 12.5, daysToSell: 29, status: "fast" },
      { product: "Wireless Mouse", category: "Electronics", turnoverRate: 8.2, daysToSell: 44, status: "medium" },
      { product: "Office Chair", category: "Furniture", turnoverRate: 4.1, daysToSell: 89, status: "slow" },
      { product: "Standing Desk", category: "Furniture", turnoverRate: 6.8, daysToSell: 54, status: "medium" },
      { product: 'Monitor 24"', category: "Electronics", turnoverRate: 15.2, daysToSell: 24, status: "fast" },
    ],
    abcAnalysis: [
      { product: "Gaming Laptop Pro", category: "A", revenue: 58499.55, percentage: 35.2, quantity: 45 },
      { product: 'Monitor 24"', category: "A", revenue: 34599.66, percentage: 20.8, quantity: 87 },
      { product: "Standing Desk", category: "A", revenue: 21799.82, percentage: 13.1, quantity: 36 },
      { product: "Office Chair", category: "B", revenue: 15899.77, percentage: 9.6, quantity: 53 },
      { product: "Wireless Mouse", category: "B", revenue: 12798.44, percentage: 7.7, quantity: 256 },
      { product: "Keyboard Pro", category: "B", revenue: 8999.33, percentage: 5.4, quantity: 128 },
      { product: "Desk Lamp", category: "C", revenue: 4599.22, percentage: 2.8, quantity: 89 },
      { product: "Mouse Pad", category: "C", revenue: 2899.11, percentage: 1.7, quantity: 345 },
      { product: "Cable Organizer", category: "C", revenue: 1999.88, percentage: 1.2, quantity: 234 },
    ],
    stockMovement: [
      { date: "2024-01-01", inbound: 150, outbound: 120, net: 30 },
      { date: "2024-01-02", inbound: 200, outbound: 180, net: 20 },
      { date: "2024-01-03", inbound: 100, outbound: 220, net: -120 },
      { date: "2024-01-04", inbound: 300, outbound: 150, net: 150 },
      { date: "2024-01-05", inbound: 180, outbound: 200, net: -20 },
      { date: "2024-01-06", inbound: 250, outbound: 190, net: 60 },
      { date: "2024-01-07", inbound: 120, outbound: 240, net: -120 },
    ],
    categoryPerformance: [
      { category: "Electronics", revenue: 125000, quantity: 450, margin: 25.5, growth: 12.3 },
      { category: "Furniture", revenue: 89000, quantity: 120, margin: 35.2, growth: 8.7 },
      { category: "Stationery", revenue: 34000, quantity: 890, margin: 45.1, growth: -2.1 },
      { category: "Books", revenue: 18000, quantity: 234, margin: 40.8, growth: 15.6 },
    ],
    seasonalTrends: [
      { month: "Jan", sales: 45000, inventory: 125000, demand: 85 },
      { month: "Feb", sales: 52000, inventory: 118000, demand: 92 },
      { month: "Mar", sales: 48000, inventory: 122000, demand: 88 },
      { month: "Apr", sales: 61000, inventory: 115000, demand: 95 },
      { month: "May", sales: 58000, inventory: 119000, demand: 91 },
      { month: "Jun", sales: 67000, inventory: 112000, demand: 98 },
    ],
    stockoutRisk: [
      { product: "Gaming Laptop Pro", currentStock: 12, averageDemand: 3.2, daysUntilStockout: 4, riskLevel: "high" },
      { product: "Wireless Mouse", currentStock: 45, averageDemand: 8.1, daysUntilStockout: 6, riskLevel: "high" },
      { product: "Office Chair", currentStock: 28, averageDemand: 2.1, daysUntilStockout: 13, riskLevel: "medium" },
      { product: 'Monitor 24"', currentStock: 67, averageDemand: 4.5, daysUntilStockout: 15, riskLevel: "medium" },
      { product: "Standing Desk", currentStock: 89, averageDemand: 1.8, daysUntilStockout: 49, riskLevel: "low" },
    ],
  })

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const COLORS = {
    A: "#3B82F6",
    B: "#10B981",
    C: "#F59E0B",
    fast: "#10B981",
    medium: "#F59E0B",
    slow: "#EF4444",
    high: "#EF4444",
    low: "#10B981",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GradientCard
        title="Advanced Inventory Analytics"
        description="Deep insights into inventory performance, turnover rates, and forecasting"
        icon={<BarChart3 className="h-6 w-6" />}
        headerGradient
        variant="primary"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>

            <GradientButton
              variant="neutral"
              size="sm"
              icon={<RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />}
              onClick={refreshData}
              loading={isLoading}
            >
              Refresh
            </GradientButton>
          </div>

          <GradientButton variant="success" size="sm" icon={<Download className="h-4 w-4" />}>
            Export Analytics
          </GradientButton>
        </div>
      </GradientCard>

      <Tabs defaultValue="turnover" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="turnover">Turnover Analysis</TabsTrigger>
          <TabsTrigger value="abc">ABC Analysis</TabsTrigger>
          <TabsTrigger value="movement">Stock Movement</TabsTrigger>
          <TabsTrigger value="performance">Category Performance</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="turnover" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Turnover Rate Chart */}
            <GradientCard
              title="Inventory Turnover Rates"
              icon={<Activity className="h-5 w-5" />}
              headerGradient
              variant="primary"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.turnoverRates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="turnoverRate" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </GradientCard>

            {/* Days to Sell */}
            <GradientCard
              title="Days to Sell Analysis"
              icon={<Calendar className="h-5 w-5" />}
              headerGradient
              variant="warning"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.turnoverRates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="daysToSell" fill={(entry) => COLORS[entry.status] || "#F59E0B"} />
                </BarChart>
              </ResponsiveContainer>
            </GradientCard>
          </div>

          {/* Turnover Status List */}
          <GradientCard
            title="Turnover Status Overview"
            icon={<Target className="h-5 w-5" />}
            headerGradient
            variant="success"
          >
            <div className="space-y-4">
              {analyticsData.turnoverRates.map((item, index) => (
                <motion.div
                  key={item.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                        item.status === "fast"
                          ? "from-green-400 to-green-600"
                          : item.status === "medium"
                            ? "from-yellow-400 to-orange-500"
                            : "from-red-400 to-red-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.product}</h3>
                      <p className="text-sm text-slate-600">{item.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{item.turnoverRate}x</p>
                    <p className="text-sm text-slate-600">{item.daysToSell} days to sell</p>
                    <Badge
                      className={`mt-1 ${
                        item.status === "fast"
                          ? "bg-green-100 text-green-800"
                          : item.status === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </GradientCard>
        </TabsContent>

        <TabsContent value="abc" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ABC Distribution Chart */}
            <GradientCard
              title="ABC Analysis Distribution"
              icon={<PieChartIcon className="h-5 w-5" />}
              headerGradient
              variant="primary"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Category A",
                        value: analyticsData.abcAnalysis.filter((item) => item.category === "A").length,
                        fill: COLORS.A,
                      },
                      {
                        name: "Category B",
                        value: analyticsData.abcAnalysis.filter((item) => item.category === "B").length,
                        fill: COLORS.B,
                      },
                      {
                        name: "Category C",
                        value: analyticsData.abcAnalysis.filter((item) => item.category === "C").length,
                        fill: COLORS.C,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {analyticsData.abcAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </GradientCard>

            {/* Revenue by Category */}
            <GradientCard
              title="Revenue Distribution"
              icon={<BarChart3 className="h-5 w-5" />}
              headerGradient
              variant="success"
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.abcAnalysis.slice(0, 6)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="product" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill={(entry) => COLORS[entry.category] || "#3B82F6"} />
                </BarChart>
              </ResponsiveContainer>
            </GradientCard>
          </div>

          {/* ABC Analysis Table */}
          <GradientCard
            title="Detailed ABC Analysis"
            icon={<Package className="h-5 w-5" />}
            headerGradient
            variant="warning"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold">Product</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-right py-3 px-4 font-semibold">Revenue</th>
                    <th className="text-right py-3 px-4 font-semibold">% of Total</th>
                    <th className="text-right py-3 px-4 font-semibold">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.abcAnalysis.map((item, index) => (
                    <tr key={item.product} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">{item.product}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${
                            item.category === "A"
                              ? "bg-blue-100 text-blue-800"
                              : item.category === "B"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          Category {item.category}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">${item.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.percentage}%</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GradientCard>
        </TabsContent>

        <TabsContent value="movement" className="space-y-6">
          <GradientCard
            title="Stock Movement Trends"
            icon={<TrendingUp className="h-5 w-5" />}
            headerGradient
            variant="primary"
          >
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={analyticsData.stockMovement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="inbound" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stackId="2"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.6}
                />
                <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </GradientCard>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.categoryPerformance.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GradientCard variant="primary" intensity="light" hover>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">{category.category}</h3>
                      <div className="flex items-center">
                        {category.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ml-1 ${
                            category.growth > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {category.growth > 0 ? "+" : ""}
                          {category.growth}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Revenue</span>
                        <span className="font-medium">${category.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Quantity</span>
                        <span className="font-medium">{category.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Margin</span>
                        <span className="font-medium text-green-600">{category.margin}%</span>
                      </div>
                    </div>
                  </div>
                </GradientCard>
              </motion.div>
            ))}
          </div>

          <GradientCard
            title="Category Performance Comparison"
            icon={<BarChart3 className="h-5 w-5" />}
            headerGradient
            variant="success"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="margin" fill="#10B981" name="Margin %" />
              </BarChart>
            </ResponsiveContainer>
          </GradientCard>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seasonal Trends */}
            <GradientCard
              title="Seasonal Demand Trends"
              icon={<Calendar className="h-5 w-5" />}
              headerGradient
              variant="primary"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.seasonalTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Sales" />
                  <Line type="monotone" dataKey="demand" stroke="#10B981" strokeWidth={2} name="Demand Index" />
                </LineChart>
              </ResponsiveContainer>
            </GradientCard>

            {/* Stockout Risk */}
            <GradientCard
              title="Stockout Risk Analysis"
              icon={<AlertTriangle className="h-5 w-5" />}
              headerGradient
              variant="error"
            >
              <div className="space-y-4">
                {analyticsData.stockoutRisk.map((item, index) => (
                  <motion.div
                    key={item.product}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${
                      item.riskLevel === "high"
                        ? "bg-red-50 border-red-500"
                        : item.riskLevel === "medium"
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-green-50 border-green-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{item.product}</h3>
                        <p className="text-sm text-slate-600">
                          Current Stock: {item.currentStock} | Avg Demand: {item.averageDemand}/day
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{item.daysUntilStockout} days</p>
                        <Badge
                          className={`${
                            item.riskLevel === "high"
                              ? "bg-red-100 text-red-800"
                              : item.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GradientCard>
          </div>

          {/* Forecasting Recommendations */}
          <GradientCard
            title="AI-Powered Recommendations"
            icon={<Target className="h-5 w-5" />}
            headerGradient
            variant="success"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Reorder Recommendations</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <p className="font-medium text-blue-900">Gaming Laptop Pro</p>
                    <p className="text-sm text-blue-700">Reorder 25 units within 2 days</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <p className="font-medium text-orange-900">Wireless Mouse</p>
                    <p className="text-sm text-orange-700">Reorder 50 units within 3 days</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Optimization Opportunities</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <p className="font-medium text-green-900">Reduce Office Chair inventory</p>
                    <p className="text-sm text-green-700">Slow turnover - consider promotion</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <p className="font-medium text-purple-900">Increase Monitor 24" stock</p>
                    <p className="text-sm text-purple-700">High demand trend detected</p>
                  </div>
                </div>
              </div>
            </div>
          </GradientCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
