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
  ShoppingBag,
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

export function PurchaseOrdersModule() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const purchaseOrders = [
    {
      id: "1",
      orderNumber: "PO-2024-001",
      supplier: {
        name: "Ceylon Tea Estates Ltd",
        email: "info@ceylontea.lk",
        phone: "+94 11 111 2222",
        address: "Tea Factory Road, Nuwara Eliya",
      },
      items: [
        {
          id: "1",
          name: "Ceylon Black Tea - Premium Grade",
          sku: "TEA-CBT-001",
          quantity: 500,
          unitPrice: 750.0,
          total: 375000.0,
        },
        {
          id: "2",
          name: "Green Tea - Organic",
          sku: "TEA-GRN-002",
          quantity: 200,
          unitPrice: 900.0,
          total: 180000.0,
        },
      ],
      subtotal: 555000.0,
      tax: 55500.0,
      discount: 0,
      total: 610500.0,
      status: "pending",
      paymentStatus: "unpaid",
      orderDate: "2024-01-18",
      expectedDelivery: "2024-01-25",
      notes: "Urgent restock for peak season",
      createdBy: "Priya Perera",
      warehouse: "Colombo Main Hub",
    },
    {
      id: "2",
      orderNumber: "PO-2024-002",
      supplier: {
        name: "Spice Garden Exports",
        email: "sales@spicegarden.lk",
        phone: "+94 77 333 4444",
        address: "Spice Route, Matale",
      },
      items: [
        {
          id: "3",
          name: "Cinnamon Sticks - Organic",
          sku: "SPC-CIN-002",
          quantity: 150,
          unitPrice: 1100.0,
          total: 165000.0,
        },
      ],
      subtotal: 165000.0,
      tax: 16500.0,
      discount: 0,
      total: 181500.0,
      status: "approved",
      paymentStatus: "paid",
      orderDate: "2024-01-19",
      expectedDelivery: "2024-01-26",
      notes: "Standard order",
      createdBy: "Nimal Fernando",
      warehouse: "Galle Distribution",
    },
    {
      id: "3",
      orderNumber: "PO-2024-003",
      supplier: {
        name: "Tropical Oils Lanka",
        email: "contact@tropicaloils.lk",
        phone: "+94 71 555 6666",
        address: "Coconut Triangle, Kurunegala",
      },
      items: [
        {
          id: "4",
          name: "Coconut Oil - Virgin",
          sku: "OIL-COC-003",
          quantity: 100,
          unitPrice: 600.0,
          total: 60000.0,
        },
      ],
      subtotal: 60000.0,
      tax: 6000.0,
      discount: 0,
      total: 66000.0,
      status: "received",
      paymentStatus: "paid",
      orderDate: "2024-01-17",
      receivedDate: "2024-01-22",
      createdBy: "Kamala Jayasinghe",
      warehouse: "Kandy Branch",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-500", icon: Clock, text: "Pending" },
      approved: { color: "bg-blue-500", icon: CheckCircle, text: "Approved" },
      processing: { color: "bg-purple-500", icon: RefreshCw, text: "Processing" },
      shipped: { color: "bg-indigo-500", icon: CheckCircle, text: "Shipped" },
      received: { color: "bg-green-500", icon: CheckCircle, text: "Received" },
      cancelled: { color: "bg-red-500", icon: XCircle, text: "Cancelled" },
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
      unpaid: { color: "bg-red-500", text: "Unpaid" },
      paid: { color: "bg-green-500", text: "Paid" },
      partial: { color: "bg-blue-500", text: "Partial" },
    }

    const config = statusConfig[status]
    if (!config) return <Badge variant="outline">{status}</Badge>

    return <Badge className={`${config.color} text-white`}>{config.text}</Badge>
  }

  const filteredOrders = purchaseOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.email.toLowerCase().includes(searchTerm.toLowerCase())

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
    console.log("Exporting purchase orders...")
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Purchase Orders</span>
              </CardTitle>
              <CardDescription>Manage and track all purchase orders from suppliers</CardDescription>
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
                    <DialogTitle>Create New Purchase Order</DialogTitle>
                    <DialogDescription>Enter the details for the new purchase order</DialogDescription>
                  </DialogHeader>
                  <PurchaseOrderForm onClose={() => setIsCreateDialogOpen(false)} />
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
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order Details</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Dates</TableHead>
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
                            <div className="font-medium">{order.supplier.name}</div>
                            <div className="text-sm text-slate-500">{order.supplier.email}</div>
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
                            <div className="text-sm">Order: {order.orderDate}</div>
                            {order.expectedDelivery && (
                              <div className="text-xs text-slate-500">Expected: {order.expectedDelivery}</div>
                            )}
                            {order.receivedDate && (
                              <div className="text-xs text-slate-500">Received: {order.receivedDate}</div>
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
                  <ShoppingBag className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No purchase orders found</p>
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
              <DialogTitle>Purchase Order Details - {selectedOrder.orderNumber}</DialogTitle>
              <DialogDescription>Complete information about this purchase order</DialogDescription>
            </DialogHeader>
            <PurchaseOrderDetailsView order={selectedOrder} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Purchase Order Form Component
function PurchaseOrderForm({ onClose }) {
  const [formData, setFormData] = useState({
    supplier: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    items: [{ name: "", sku: "", quantity: 1, unitPrice: 0 }],
    notes: "",
    warehouse: "",
    expectedDelivery: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating purchase order:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Supplier Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input
                id="supplierName"
                value={formData.supplier.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, name: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="supplierEmail">Email</Label>
              <Input
                id="supplierEmail"
                type="email"
                value={formData.supplier.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, email: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="supplierPhone">Phone</Label>
              <Input
                id="supplierPhone"
                value={formData.supplier.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, phone: e.target.value },
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="supplierAddress">Address</Label>
              <Textarea
                id="supplierAddress"
                value={formData.supplier.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, address: e.target.value },
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
              <Label htmlFor="warehouse">Receiving Warehouse</Label>
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
              <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
              <Input
                id="expectedDelivery"
                type="date"
                value={formData.expectedDelivery}
                onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
              />
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
        <Button type="submit">Create Purchase Order</Button>
      </div>
    </form>
  )
}

// Purchase Order Details View Component
function PurchaseOrderDetailsView({ order }) {
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
              <span>Supplier Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Name</Label>
              <p className="text-sm text-slate-600">{order.supplier.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-slate-600">{order.supplier.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <p className="text-sm text-slate-600">{order.supplier.phone}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Address</Label>
              <p className="text-sm text-slate-600">{order.supplier.address}</p>
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
              <Label className="text-sm font-medium">Expected Delivery</Label>
              <p className="text-sm text-slate-600">{order.expectedDelivery || "Not specified"}</p>
            </div>
            {order.receivedDate && (
              <div>
                <Label className="text-sm font-medium">Received Date</Label>
                <p className="text-sm text-slate-600">{order.receivedDate}</p>
              </div>
            )}
            <div>
              <Label className="text-sm font-medium">Receiving Warehouse</Label>
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
