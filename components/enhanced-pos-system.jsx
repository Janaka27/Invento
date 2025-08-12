"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ShoppingCart,
  Plus,
  Search,
  CreditCard,
  Receipt,
  Printer,
  Wallet,
  X,
  ArrowRight,
  Eye,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"

const PRODUCTS = [
  { id: "p1", name: "Ceylon Black Tea - 500g", price: 850.0, stock: 450, sku: "TEA-CBT-001", category: "Tea" },
  { id: "p2", name: "Cinnamon Sticks - 100g", price: 1200.0, stock: 75, sku: "SPC-CIN-002", category: "Spices" },
  { id: "p3", name: "Coconut Oil - 1L", price: 650.0, stock: 0, sku: "OIL-COC-003", category: "Oils" },
  { id: "p4", name: "Cashew Nuts - 250g", price: 2500.0, stock: 1200, sku: "NUT-CAS-004", category: "Nuts" },
  { id: "p5", name: "Turmeric Powder - 200g", price: 450.0, stock: 180, sku: "SPC-TUR-005", category: "Spices" },
  { id: "p6", name: "Jaggery - 500g", price: 300.0, stock: 250, sku: "SWE-JAG-006", category: "Sweeteners" },
  { id: "p7", name: "Red Rice - 5kg", price: 950.0, stock: 300, sku: "GRN-RDR-007", category: "Grains" },
  { id: "p8", name: "Curry Powder - 100g", price: 220.0, stock: 500, sku: "SPC-CUR-008", category: "Spices" },
]

const CUSTOMERS = [
  { id: "c1", name: "Walk-in Customer", email: "", phone: "" },
  { id: "c2", name: "Priya Perera", email: "priya@example.com", phone: "+94771234567" },
  { id: "c3", name: "Nimal Fernando", email: "nimal@example.com", phone: "+94719876543" },
]

export function EnhancedPOSSystem() {
  const [activeTab, setActiveTab] = useState("pos")
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0])
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [discountType, setDiscountType] = useState("none") // 'none', 'percentage', 'fixed'
  const [discountValue, setDiscountValue] = useState(0)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)

  const salesHistory = [
    {
      id: "INV-001",
      customer: "Priya Perera",
      items: 3,
      total: 15450.0,
      date: "2024-01-20",
      status: "completed",
      paymentMethod: "card",
    },
    {
      id: "INV-002",
      customer: "Walk-in Customer",
      items: 1,
      total: 14300.0,
      date: "2024-01-21",
      status: "completed",
      paymentMethod: "cash",
    },
    {
      id: "INV-003",
      customer: "Nimal Fernando",
      items: 2,
      total: 9260.0,
      date: "2024-01-19",
      status: "completed",
      paymentMethod: "card",
    },
  ]

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity: quantity } : item)))
    }
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDiscountAmount = () => {
    const subtotal = getSubtotal()
    if (discountType === "percentage") {
      return (subtotal * discountValue) / 100
    } else if (discountType === "fixed") {
      return discountValue
    }
    return 0
  }

  const getTaxAmount = () => {
    const subtotalAfterDiscount = getSubtotal() - getDiscountAmount()
    return subtotalAfterDiscount * 0.1 // Assuming 10% tax
  }

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + getTaxAmount()
  }

  const handleProcessPayment = () => {
    if (cartItems.length === 0) return
    setIsPaymentDialogOpen(true)
  }

  const confirmPayment = () => {
    // Simulate payment processing
    console.log("Processing payment...")
    const newTransaction = {
      id: `INV-${Date.now().toString().slice(-5)}`,
      customer: selectedCustomer.name,
      items: cartItems.length,
      total: getTotal(),
      date: new Date().toISOString().split("T")[0],
      status: "completed",
      paymentMethod: paymentMethod,
    }
    salesHistory.unshift(newTransaction) // Add to beginning of history
    setLastTransaction(newTransaction)
    setPaymentSuccess(true)
    setCartItems([])
    setSearchTerm("")
    setSelectedCustomer(CUSTOMERS[0])
    setDiscountType("none")
    setDiscountValue(0)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Enhanced POS System</span>
          </CardTitle>
          <CardDescription>Streamlined point of sale with advanced features</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pos">Point of Sale</TabsTrigger>
              <TabsTrigger value="history">Sales History</TabsTrigger>
            </TabsList>

            <TabsContent value="pos" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Selection */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search products by name, SKU, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">SKU: {product.sku}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
                          <Button size="sm" disabled={product.stock === 0}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Shopping Cart & Payment */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Sale</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                          <ShoppingCart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600">Cart is empty. Add products to start a sale.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Cart Items */}
                          <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
                            {cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-xs text-slate-600">{formatCurrency(item.price)} each</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                                    <X className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Customer Selection */}
                          <div className="border-t pt-4 space-y-2">
                            <Label htmlFor="customer-select">Customer</Label>
                            <Select
                              value={selectedCustomer.id}
                              onValueChange={(value) => setSelectedCustomer(CUSTOMERS.find((c) => c.id === value))}
                            >
                              <SelectTrigger id="customer-select">
                                <SelectValue placeholder="Select customer" />
                              </SelectTrigger>
                              <SelectContent>
                                {CUSTOMERS.map((customer) => (
                                  <SelectItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Discount */}
                          <div className="space-y-2">
                            <Label htmlFor="discount-type">Discount</Label>
                            <div className="flex space-x-2">
                              <Select value={discountType} onValueChange={setDiscountType}>
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  <SelectItem value="percentage">Percentage</SelectItem>
                                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                                </SelectContent>
                              </Select>
                              {discountType !== "none" && (
                                <Input
                                  type="number"
                                  value={discountValue}
                                  onChange={(e) => setDiscountValue(Number.parseFloat(e.target.value) || 0)}
                                  placeholder={discountType === "percentage" ? "e.g., 10" : "e.g., 500"}
                                  className="flex-1"
                                  min="0"
                                  max={discountType === "percentage" ? 100 : undefined}
                                />
                              )}
                            </div>
                          </div>

                          {/* Totals */}
                          <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>{formatCurrency(getSubtotal())}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Discount:</span>
                              <span className="text-red-500">-{formatCurrency(getDiscountAmount())}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax (10%):</span>
                              <span>{formatCurrency(getTaxAmount())}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-xl border-t pt-2">
                              <span>Total:</span>
                              <span>{formatCurrency(getTotal())}</span>
                            </div>
                          </div>

                          {/* Payment Buttons */}
                          <div className="space-y-2">
                            <Button className="w-full" onClick={handleProcessPayment} disabled={cartItems.length === 0}>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Process Payment
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              onClick={() => setCartItems([])}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Clear Sale
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesHistory.map((sale, index) => (
                      <motion.tr
                        key={sale.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.items}</TableCell>
                        <TableCell>{formatCurrency(sale.total)}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{sale.paymentMethod === "card" ? "Card" : "Cash"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={sale.status === "completed" ? "secondary" : "outline"}>{sale.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{paymentSuccess ? "Payment Successful!" : "Process Payment"}</DialogTitle>
            <DialogDescription>
              {paymentSuccess ? `Transaction ${lastTransaction?.id} completed.` : "Select payment method and confirm."}
            </DialogDescription>
          </DialogHeader>
          {paymentSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">Thank You!</h3>
              <p className="text-slate-600">
                Your payment of {formatCurrency(lastTransaction?.total || 0)} was successful.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setIsPaymentDialogOpen(false)}>
                  <Receipt className="h-4 w-4 mr-2" />
                  New Sale
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4" />
                        <span>Cash</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="card">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                <span>Amount Due:</span>
                <span>{formatCurrency(getTotal())}</span>
              </div>

              <Button className="w-full" onClick={confirmPayment}>
                Confirm Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
