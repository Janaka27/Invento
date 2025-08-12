"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, FileText, TrendingUp, Package, DollarSign, Users } from "lucide-react"
import { motion } from "framer-motion"

export function ReportsModule({ qualityMode }) {
  const [activeTab, setActiveTab] = useState("inventory")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [reportType, setReportType] = useState("summary")

  const reportTemplates = [
    {
      id: "inventory-summary",
      name: "Inventory Summary",
      description: "Current stock levels across all warehouses",
      icon: Package,
      category: "inventory",
    },
    {
      id: "low-stock",
      name: "Low Stock Report",
      description: "Products below minimum stock levels",
      icon: Package,
      category: "inventory",
    },
    {
      id: "sales-summary",
      name: "Sales Summary",
      description: "Sales performance and revenue analysis",
      icon: DollarSign,
      category: "sales",
    },
    {
      id: "customer-analysis",
      name: "Customer Analysis",
      description: "Customer purchase patterns and behavior",
      icon: Users,
      category: "sales",
    },
    {
      id: "transfer-history",
      name: "Transfer History",
      description: "Stock transfer records and status",
      icon: TrendingUp,
      category: "operations",
    },
    {
      id: "warehouse-performance",
      name: "Warehouse Performance",
      description: "Warehouse efficiency and utilization",
      icon: BarChart3,
      category: "operations",
    },
  ]

  const generateReport = (templateId) => {
    // Simulate report generation
    console.log(`Generating report: ${templateId} for ${dateRange}`)
  }

  const filteredTemplates = reportTemplates.filter((template) => activeTab === "all" || template.category === activeTab)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Reports & Analytics</span>
          </CardTitle>
          <CardDescription>Generate comprehensive reports and analyze business data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {/* Report Filters */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Report Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-range">Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="last-7-days">Last 7 days</SelectItem>
                          <SelectItem value="last-30-days">Last 30 days</SelectItem>
                          <SelectItem value="last-90-days">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="comparative">Comparative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warehouse">Warehouse</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All warehouses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Warehouses</SelectItem>
                          <SelectItem value="main">Main Warehouse</SelectItem>
                          <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                          <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Templates */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <template.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription className="text-sm">{template.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex space-x-2">
                          <Button className="flex-1" onClick={() => generateReport(template.id)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No reports available for this category</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports and downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Inventory Summary - January 2024", date: "2024-01-15", size: "2.3 MB", format: "PDF" },
              { name: "Sales Report - Q4 2023", date: "2024-01-10", size: "1.8 MB", format: "Excel" },
              { name: "Low Stock Alert Report", date: "2024-01-08", size: "456 KB", format: "PDF" },
              { name: "Transfer History - December", date: "2024-01-05", size: "1.2 MB", format: "CSV" },
            ].map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-slate-500">
                      Generated on {report.date} • {report.size} • {report.format}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
