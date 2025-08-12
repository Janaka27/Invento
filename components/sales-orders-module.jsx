"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ShoppingCart,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"

export function SalesOrdersModule() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const salesOrders = [
    {
      id: "1",
      orderNumber: "SO-2024-001",
      customer: {
        name: "Priya Perera",
        email: "priya@example.com",
        phone: "+94 77 123 4567",
        address: "123 Galle Road, Colombo 03",
      },
      items: [
        {
          id: "1",
          name: "Ceylon Black Tea - Premium",
          sku: "TEA-CBT-001",
          quantity: 10,
          unitPrice: 850.0,
          total: 8500.0,
        },
        {
          id: "2",
          name: "Cinnamon Sticks - Organic",
          sku: "SPC-CIN-002",
          quantity: 5,
          unitPrice: 1200.0,
          total: 6000.0,
        },
      ],
      subtotal: 14500.0,
      tax: 1450.0,
      discount: 500.0,
      total: 15450.0,
      status: "approved",
      paymentStatus: "paid",
      orderDate: "2024-01-20",
      deliveryDate: "2024-01-25",
      notes: "Priority delivery requested",
      createdBy: "Sunil Silva",
      warehouse: "Colombo Main Hub",
    },
    {
      id: "2",
      orderNumber: "SO-2024-002",
      customer: {
        name: "Nimal Fernando",
        email: "nimal@example.com",
        phone: "+94 71 987 6543",
        address: "456 Kandy Road, Peradeniya",
      },
      items: [
        {
          id: "3",
          name: "Coconut Oil - Virgin",
          sku: "OIL-COC-003",
          quantity: 20,
          unitPrice: 650.0,
          total: 13000.0,
        },
      ],
      subtotal: 13000.0,
      tax: 1300.0,
      discount: 0,
      total: 14300.0,
      status: "pending",
      paymentStatus: "pending",
      orderDate: "2024-01-21",
      notes: "Customer prefers morning delivery",
      createdBy: "Kamala Jayasinghe",
      warehouse: "Kandy Branch",
    },
    {
      id: "3",
      orderNumber: "SO-2024-003",
      customer: {
        name: "Sanduni Wickramasinghe",
        email: "sanduni@example.com",
        phone: "+94 76 555 1234",
        address: "789 Matara Road, Galle",
      },
      items: [
        {
          id: "4",
          name: "Cashew Nuts - Premium",
          sku: "NUT-CAS-004",
          quantity: 2,
          unitPrice: 2500.0,
          total: 5000.0,
        },
        {
          id: "5",
          name: "Turmeric Powder - Organic",
          sku: "SPC-TUR-005",
          quantity: 8,
          unitPrice: 450.0,
          total: 3600.0,
        },
      ],
      subtotal: 8600.0,
      tax: 860.0,
      discount: 200.0,
      total: 9260.0,
      status: "shipped",
      paymentStatus: "paid",
      orderDate: "2024-01-19",
      deliveryDate: "2024-01-22",
      createdBy: "Ravi Mendis",
      warehouse: "Galle Distribution",
    },
    {
      id: "4",
      orderNumber: "SO-2024-004",
      customer: {
        name: "Chamara Rathnayake",
        email: "chamara@example.com",
        phone: "+94 78 999 8888",
        address: "321 Negombo Road, Wattala",
      },
      items: [
        {
          id: "6",
          name: "Ceylon Black Tea - Premium",
          sku: "TEA-CBT-001",
          quantity: 50,
          unitPrice: 850.0,
          total: 42500.0,
        },
      ],
      subtotal: 42500.0,
      tax: 4250.0,
      discount: 2000.0,
      total: 44750.0,
      status: "refunded",
      paymentStatus: "refunded",
      orderDate: "2024-01-18",
      notes: "Customer requested refund due to quality issues",
      createdBy: "Malini Perera",
      warehouse: "Colombo Main Hub",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", icon: Clock, text: "Pending" },
      approved: { color: "bg-blue-500", icon: CheckCircle, text: "Approved" },
      processing: { color: "bg-purple-500", icon: RefreshCw, text: "Processing" },
      shipped: { color: "bg-indigo-500", icon: CheckCircle, text: "Shipped" },
      delivered: { color: "bg-green-500", icon: CheckCircle, text: "Delivered" },
      cancelled: { color: "bg-red-500", icon: XCircle, text: "Cancelled" },
      refunded: { color: "bg-orange-500", icon: RefreshCw, text: "Refunded" },
    }

    const config = statusConfig[status]
    if (!config) return <Badge variant="outline">{status}</Badge>

    const Icon = config.icon

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", text: "Pending" },
      paid: { color: "bg-green-500", text: "Paid" },
      partial: { color: "bg-blue-500", text: "Partial" },
      refunded: { color: "bg-orange-500", text: "Refunded" },
    }

    const config = statusConfig[status]
    if (!config) return <Badge variant="outline">{status}</Badge>

    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>
  }

  const filteredOrders = salesOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesTab = activeTab === "all" || order.status === activeTab

    return matchesSearch && matchesStatus && matchesTab
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const exportOrders = () => {
    // Simulate export functionality
    console.log("Exporting orders...")
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Sales Orders</span>
              </CardTitle>
              <CardDescription>Manage and track all sales orders</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={exportOrders}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Sales Order</DialogTitle>
                    <DialogDescription>Enter the details for the new sales order</DialogDescription>
                  </DialogHeader>
                  <SalesOrderForm onClose={() => setIsCreateDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Details</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.orderNumber}</div>
                            <div className="text-sm text-slate-500">{order.warehouse}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-slate-500">{order.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">{order.items.length}</div>
                            <div className="text-sm text-slate-500">items</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{order.orderDate}</div>
                            {order.deliveryDate && (
                              <div className="text-xs text-slate-500">Delivery: {order.deliveryDate}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No sales orders found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
              <DialogDescription>Complete information about this sales order</DialogDescription>
            </DialogHeader>
            <OrderDetailsView order={selectedOrder} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Sales Order Form Component
function SalesOrderForm({ onClose }) {
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [{ name: "", sku: "", quantity: 1, unitPrice: 0 }],
    notes: "",
    warehouse: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating order:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={formData.customer.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: { ...formData.customer, name: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customer.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: { ...formData.customer, email: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                value={formData.customer.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: { ...formData.customer, phone: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="customerAddress">Address</Label>
              <Textarea
                id="customerAddress"
                value={formData.customer.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: { ...formData.customer, address: e.target.value },
                  })
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="warehouse">Warehouse</Label>
              <Select
                value={formData.warehouse}
                onValueChange={(value) => setFormData({ ...formData, warehouse: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="colombo">Colombo Main Hub</SelectItem>
                  <SelectItem value="kandy">Kandy Branch</SelectItem>
                  <SelectItem value="galle">Galle Distribution</SelectItem>
                  <SelectItem value="matara">Matara Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special instructions..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...formData.items]
                      newItems[index].name = e.target.value
                      setFormData({ ...formData, items: newItems })
                    }}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input
                    value={item.sku}
                    onChange={(e) => {
                      const newItems = [...formData.items]
                      newItems[index].sku = e.target.value
                      setFormData({ ...formData, items: newItems })
                    }}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...formData.items]
                      newItems[index].quantity = Number.parseInt(e.target.value) || 0
                      setFormData({ ...formData, items: newItems })
                    }}
                    min="1"
                  />
                </div>
                <div>
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => {
                      const newItems = [...formData.items]
                      newItems[index].unitPrice = Number.parseFloat(e.target.value) || 0
                      setFormData({ ...formData, items: newItems })
                    }}
                    min="0"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  ...formData,
                  items: [...formData.items, { name: "", sku: "", quantity: 1, unitPrice: 0 }],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Order</Button>
      </div>
    </form>
  )
}

// Order Details View Component
function OrderDetailsView({ order }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Name</Label>
              <p className="text-sm text-slate-600">{order.customer.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-slate-600">{order.customer.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <p className="text-sm text-slate-600">{order.customer.phone}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Address</Label>
              <p className="text-sm text-slate-600">{order.customer.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Order Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Order Number</Label>
              <p className="text-sm text-slate-600">{order.orderNumber}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Order Date</Label>
              <p className="text-sm text-slate-600">{order.orderDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Delivery Date</Label>
              <p className="text-sm text-slate-600">{order.deliveryDate || "Not scheduled"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Warehouse</Label>
              <p className="text-sm text-slate-600">{order.warehouse}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Created By</Label>
              <p className="text-sm text-slate-600">{order.createdBy}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-{formatCurrency(order.discount)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{order.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
