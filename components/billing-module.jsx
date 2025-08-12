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
import { CreditCard, Plus, Search, Download, Eye, Printer, Calendar, User, FileText, Receipt } from "lucide-react"
import { motion } from "framer-motion"

export function BillingModule() {
  const [activeTab, setActiveTab] = useState("invoices")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const invoices = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      customer: { name: "Priya Perera", email: "priya@example.com" },
      amount: 15450.0,
      status: "paid",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      paymentDate: "2024-01-22",
      items: [
        { name: "Ceylon Black Tea - Premium", quantity: 10, unitPrice: 850.0, total: 8500.0 },
        { name: "Cinnamon Sticks - Organic", quantity: 5, unitPrice: 1200.0, total: 6000.0 },
      ],
      notes: "Standard sale",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      customer: { name: "Nimal Fernando", email: "nimal@example.com" },
      amount: 14300.0,
      status: "pending",
      issueDate: "2024-01-21",
      dueDate: "2024-02-21",
      items: [{ name: "Coconut Oil - Virgin", quantity: 20, unitPrice: 650.0, total: 13000.0 }],
      notes: "Due on delivery",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      customer: { name: "Sanduni Wickramasinghe", email: "sanduni@example.com" },
      amount: 9260.0,
      status: "overdue",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      items: [
        { name: "Cashew Nuts - Premium", quantity: 2, unitPrice: 2500.0, total: 5000.0 },
        { name: "Turmeric Powder - Organic", quantity: 8, unitPrice: 450.0, total: 3600.0 },
      ],
      notes: "Follow up required",
    },
  ]

  const payments = [
    {
      id: "P-2024-001",
      invoiceNumber: "INV-2024-001",
      customer: "Priya Perera",
      amount: 15450.0,
      date: "2024-01-22",
      method: "Card",
    },
    {
      id: "P-2024-002",
      invoiceNumber: "INV-2024-003",
      customer: "Sanduni Wickramasinghe",
      amount: 5000.0,
      date: "2024-02-15",
      method: "Cash",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 text-white">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>
      case "overdue":
        return <Badge className="bg-red-500 text-white">Overdue</Badge>
      case "cancelled":
        return <Badge className="bg-slate-500 text-white">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesDate = dateFilter === "all" // Implement date filtering logic if needed

    return matchesSearch && matchesStatus && matchesDate
  })

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = dateFilter === "all" // Implement date filtering logic if needed

    return matchesSearch && matchesDate
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const exportData = (type) => {
    console.log(`Exporting ${type} data...`)
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Billing & Payments</span>
              </CardTitle>
              <CardDescription>Manage invoices, track payments, and view billing history</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => exportData(activeTab)}>
                <Download className="h-4 w-4 mr-2" />
                Export {activeTab === "invoices" ? "Invoices" : "Payments"}
              </Button>
              {activeTab === "invoices" && (
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Invoice
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Invoice</DialogTitle>
                      <DialogDescription>Generate a new invoice for a customer</DialogDescription>
                    </DialogHeader>
                    <InvoiceForm onClose={() => setIsCreateDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={`Search ${activeTab}...`}
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
                {activeTab === "invoices" && (
                  <>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </>
                )}
                {activeTab === "payments" && (
                  <>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </>
                )}
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="invoices" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invoice.customer.name}</div>
                            <div className="text-sm text-slate-500">{invoice.customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>{invoice.issueDate}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedInvoice(invoice)}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredInvoices.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No invoices found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment, index) => (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.invoiceNumber}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No payments found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Invoice Details - {selectedInvoice.invoiceNumber}</DialogTitle>
              <DialogDescription>Complete information about this invoice</DialogDescription>
            </DialogHeader>
            <InvoiceDetailsView invoice={selectedInvoice} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Invoice Form Component
function InvoiceForm({ onClose }) {
  const [formData, setFormData] = useState({
    customer: {
      name: "",
      email: "",
      address: "",
    },
    items: [{ name: "", quantity: 1, unitPrice: 0 }],
    notes: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating invoice:", formData)
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
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
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
          <CardTitle className="text-lg">Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Item Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...formData.items]
                      newItems[index].name = e.target.value
                      setFormData({ ...formData, items: newItems })
                    }}
                    placeholder="Enter item name"
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
                <div>
                  <Label>Total</Label>
                  <Input value={(item.quantity * item.unitPrice).toFixed(2)} readOnly className="bg-slate-100" />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  ...formData,
                  items: [...formData.items, { name: "", quantity: 1, unitPrice: 0 }],
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
        <Button type="submit">Generate Invoice</Button>
      </div>
    </form>
  )
}

// Invoice Details View Component
function InvoiceDetailsView({ invoice }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateTax = (subtotal) => {
    return subtotal * 0.1 // Assuming 10% tax
  }

  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax
  }

  const subtotal = calculateSubtotal()
  const tax = calculateTax(subtotal)
  const total = calculateTotal(subtotal, tax)

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
              <p className="text-sm text-slate-600">{invoice.customer.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Email</Label>
              <p className="text-sm text-slate-600">{invoice.customer.email}</p>
            </div>
            {invoice.customer.address && (
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-slate-600">{invoice.customer.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Invoice Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Invoice Number</Label>
              <p className="text-sm text-slate-600">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Issue Date</Label>
              <p className="text-sm text-slate-600">{invoice.issueDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Due Date</Label>
              <p className="text-sm text-slate-600">{invoice.dueDate}</p>
            </div>
            {invoice.paymentDate && (
              <div>
                <Label className="text-sm font-medium">Payment Date</Label>
                <p className="text-sm text-slate-600">{invoice.paymentDate}</p>
              </div>
            )}
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <p className="text-sm text-slate-600">{invoice.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-2 max-w-sm ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {invoice.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{invoice.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
