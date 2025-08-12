"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, Search, CreditCard, Receipt, TrendingUp, DollarSign, Users } from "lucide-react"
import { motion } from "framer-motion"

export function SalesModule({ qualityMode }) {
  const [activeTab, setActiveTab] = useState("pos")
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    { id: 1, name: "Gaming Laptop Pro", price: 1299.99, stock: 45, sku: "LAP-001" },
    { id: 2, name: "Office Chair Deluxe", price: 299.99, stock: 8, sku: "CHR-002" },
    { id: 3, name: "Wireless Mouse", price: 49.99, stock: 0, sku: "MOU-003" },
    { id: 4, name: '4K Monitor 27"', price: 399.99, stock: 23, sku: "MON-004" },
    { id: 5, name: "Standing Desk", price: 599.99, stock: 12, sku: "DSK-005" },
  ]

  const salesData = [
    {
      id: "INV-001",
      customer: "John Doe",
      items: 3,
      total: 1649.97,
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "card",
    },
    {
      id: "INV-002",
      customer: "Jane Smith",
      items: 1,
      total: 299.99,
      date: "2024-01-15",
      status: "completed",
      paymentMethod: "cash",
    },
    {
      id: "INV-003",
      customer: "Mike Johnson",
      items: 2,
      total: 449.98,
      date: "2024-01-14",
      status: "pending",
      paymentMethod: "card",
    },
  ]

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
      setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Sales & POS</span>
          </CardTitle>
          <CardDescription>Point of sale system and sales management</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pos">Point of Sale</TabsTrigger>
              <TabsTrigger value="orders">Sales Orders</TabsTrigger>
              <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="pos" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Selection */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">SKU: {product.sku}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">${product.price}</span>
                          <Button size="sm" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Shopping Cart */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Shopping Cart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                          <ShoppingCart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600">Cart is empty</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-slate-600">${item.price} each</p>
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
                              </div>
                            </div>
                          ))}

                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="font-bold">Total:</span>
                              <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Process Payment
                              </Button>
                              <Button variant="outline" className="w-full bg-transparent">
                                <Receipt className="h-4 w-4 mr-2" />
                                Print Receipt
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
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
                    {salesData.map((sale, index) => (
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
                        <TableCell>${sale.total}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{sale.paymentMethod === "card" ? "Card" : "Cash"}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={sale.status === "completed" ? "secondary" : "outline"}>{sale.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Today's Sales</p>
                        <p className="text-2xl font-bold text-green-600">$2,349.96</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Orders Today</p>
                        <p className="text-2xl font-bold text-blue-600">18</p>
                      </div>
                      <Receipt className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Customers</p>
                        <p className="text-2xl font-bold text-purple-600">156</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Trends</CardTitle>
                  <CardDescription>Sales performance over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600">Sales chart would be displayed here</p>
                      <p className="text-sm text-slate-500">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
